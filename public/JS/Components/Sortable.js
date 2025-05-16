// Визначаємо, чи це мобільний пристрій
// function isMobile() {
//     return window.innerWidth < 992; // <992px — планшети і телефони (Bootstrap breakpoint)
// }

// const cardContainer = document.getElementById('cardsContainer');
// if (cardContainer && !isMobile() && typeof Sortable !== 'undefined') {
//     // Ініціалізуємо Sortable тільки на десктопах
//     new Sortable(cardContainer, {
//         animation: 150, // анімація під час переміщення
//         ghostClass: 'sortable-ghost', // клас для прозорого елементу
//         handle: '.card', // дозволяємо тягнути картку
//         onEnd: (event) => {
//             console.log(`Moved card from index ${event.oldIndex} to $${event.newIndex}`);
//         },
//     });
// }