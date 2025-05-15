



const showAll = document.getElementById('show-all');

showAll.addEventListener('click', (event) => {
    event.preventDefault(); // Запобігає перезавантаженню сторінки

    // Отримуємо всі картки на сторінці
    const allCards = document.querySelectorAll('.col-md-4');

    // Показуємо всі картки
    allCards.forEach(card => {
        card.style.display = 'block';
    });
});