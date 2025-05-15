


// Ініціалізація Sortable на контейнері карток щоб можна було переміщувати картки
const cardContainer = document.querySelector('.animation-cards');

Sortable.create(cardContainer, {
    animation: 150, // анімація під час переміщення
    ghostClass: 'sortable-ghost', // клас для прозорого елементу
    handle: '.card', // дозволяємо тягнути картку
    onEnd: (event) => {
        console.log(`Moved card from index ${event.oldIndex} to $${event.newIndex}`);
    },
});