"use strict";


import { fetchCards } from './Services/apiService.js';
import { VisitModal } from './Classes/VisitModal.js';

import { addCardToBoard } from './Components/FnAddCards.js';

// import './Components/Sortable.js';
import './Components/BoardState.js'
import './Components/ShowCards.js'
import './Components/Buttons/Submit.js'



document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Отримуємо введені дані
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    // Відправка запиту на отримання токена
    fetch("https://famdoc-server-1.onrender.com/api/v2/cards/login", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Incorrect login or password!");
        }
        return response.text();
    })
    .then(token => {
        // Збереження токена у localStorage
        localStorage.setItem('authToken', token);

        // Закриття модального вікна
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();

        // Зміна кнопки після авторизації
        const loginButton = document.getElementById('loginButton');
        loginButton.textContent = "+ Create Visit +";
        loginButton.classList.remove('btn-danger');
        loginButton.classList.add('btn-success');

        // Додавання на екран блоку фільтрації
        document.getElementById('visitFilterContainer').style.display = 'block';

        // Додавання події на нову кнопку
        loginButton.removeAttribute('data-bs-toggle');
        loginButton.removeAttribute('data-bs-target');
        loginButton.addEventListener('click', function () {
            const createVisitModal = new VisitModal();
            createVisitModal.show();

        });

        console.log('Authorization successful. Token saved:', token);

        fetchCards(token)
            .then((cards) => {
                cards.forEach((cardData) => addCardToBoard(cardData));
            })
            .catch((error) => console.error('Failed to fetch cards:', error));

    })
    .catch(error => {
        alert(error.message);
    });

});

// Додаємо автозавантаження карток при наявності токена
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        fetchCards(token)
            .then(cards => {
                cards.forEach(cardData => addCardToBoard(cardData));
            })
            .catch(error => {
                console.error('Не вдалося завантажити картки:', error);
            });
    }
});



