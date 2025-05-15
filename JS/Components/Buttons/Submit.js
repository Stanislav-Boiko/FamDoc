



const submitButton = document.getElementById('submit-filter');

// Добавляєм обробник подіїя на кнопку
submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const searchInput = document.getElementById('disabledTextInput').value.toLowerCase().trim();
    const statusSelect = document.getElementById('status').value;
    const urgencySelect = document.getElementById('urgency').value;

    // Отримуємо всі картки на сторінці
    const allCards = document.querySelectorAll('.col-md-4');

    allCards.forEach(card => {
        let matchesFilter = true;

        // Отримання даних з картки
        const cardTitle = card.querySelector('.card-header span').textContent.toLowerCase();
        const cardDescription = card.querySelector('.card-body').textContent.toLowerCase();
        const cardStatus = card.querySelector('.status-text').textContent;
        const cardUrgency = card.querySelector('.card-body').textContent.match(/Urgency:\s*(\w+)/)?.[1];

        // Перевірка заголовка або контенту
        if (searchInput && !cardTitle.includes(searchInput) && !cardDescription.includes(searchInput)) {
            matchesFilter = false;
        }

        // Перевірка статусу
        if (statusSelect && cardStatus !== statusSelect) {
            matchesFilter = false;
        }

        // Перевірка терміновості
        if (urgencySelect && cardUrgency !== urgencySelect) {
            matchesFilter = false;
        }

        // Показуємо або приховуємо картку
        card.style.display = matchesFilter ? 'block' : 'none';
    });
   
});
