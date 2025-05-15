const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = 3001;
const SECRET = 'supersecretkey';

app.use(cors());
app.use(bodyParser.json());

// Додаємо роздачу статичних файлів
app.use(express.static('public'));

const USERS_FILE = './users.json';
const CARDS_FILE = './cards.json';

// Завантаження або ініціалізація файлів
function loadData(file) {
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
    return JSON.parse(fs.readFileSync(file));
}
function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Реєстрація/логін
app.post('/api/v2/cards/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !email.includes('@') || !password) {
        return res.status(400).send('Invalid email or password');
    }
    let users = loadData(USERS_FILE);
    let user = users.find(u => u.email === email);

    if (!user) {
        // Реєстрація нового користувача
        user = { email, password };
        users.push(user);
        saveData(USERS_FILE, users);
    } else if (user.password !== password) {
        return res.status(401).send('Incorrect password');
    }
    // Генеруємо токен
    const token = jwt.sign({ email }, SECRET, { expiresIn: '7d' });
    res.send(token);
});

// Middleware для перевірки токена
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).send('No token');
    const token = auth.replace('Bearer ', '');
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch {
        res.status(401).send('Invalid token');
    }
}

// CRUD для карток
app.get('/api/v2/cards', authMiddleware, (req, res) => {
    const cards = loadData(CARDS_FILE).filter(card => card.email === req.user.email);
    res.json(cards);
});

app.post('/api/v2/cards', authMiddleware, (req, res) => {
    let cards = loadData(CARDS_FILE);
    const newCard = { ...req.body, id: Date.now(), email: req.user.email };
    cards.push(newCard);
    saveData(CARDS_FILE, cards);
    res.json(newCard);
});

app.put('/api/v2/cards/:id', authMiddleware, (req, res) => {
    let cards = loadData(CARDS_FILE);
    const idx = cards.findIndex(card => card.id == req.params.id && card.email === req.user.email);
    if (idx === -1) return res.status(404).send('Card not found');
    cards[idx] = { ...cards[idx], ...req.body };
    saveData(CARDS_FILE, cards);
    res.json(cards[idx]);
});

app.delete('/api/v2/cards/:id', authMiddleware, (req, res) => {
    let cards = loadData(CARDS_FILE);
    const idx = cards.findIndex(card => card.id == req.params.id && card.email === req.user.email);
    if (idx === -1) return res.status(404).send('Card not found');
    cards.splice(idx, 1);
    saveData(CARDS_FILE, cards);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});