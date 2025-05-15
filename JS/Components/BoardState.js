

import { cardsContainer} from './FnAddCards.js';

document.addEventListener('DOMContentLoaded', () => {

    const noItemsMessage = document.getElementById('noItemsMessage');
    // Функція для перевірки стану дошки
    function checkBoardState() {
        if (cardsContainer.children.length === 0) { 
            noItemsMessage.style.display = 'block';
        } else {
            noItemsMessage.style.display = 'none';
        }
    }
     // 
     // Додаємо спостерігача за змінами у DOM
    const observer = new MutationObserver(() => {
        checkBoardState(); // Виклик функції при зміні дочірніх елементів
    });

    // Налаштування спостерігача
    observer.observe(cardsContainer, { childList: true });

    // Початкова перевірка стану дошки
    checkBoardState();

});