import { cardsContainer } from './cardsContainer.js';

export function checkBoardState() {
    const noItemsMessage = document.getElementById('noItemsMessage');
    if (cardsContainer.children.length === 0) { 
        noItemsMessage.style.display = 'block';
    } else {
        noItemsMessage.style.display = 'none';
    }
}

// Додаємо спостерігача за змінами у DOM
const observer = new MutationObserver(() => {
    checkBoardState();
});
observer.observe(cardsContainer, { childList: true });

// Початкова перевірка стану дошки
checkBoardState();