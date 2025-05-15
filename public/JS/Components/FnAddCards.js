import { createVisitCard } from '../DoctorsClasses/doctorSelection.js';
import { checkBoardState } from './BoardState.js';
import { cardsContainer } from './cardsContainer.js';

// Функція для додавання нових карток у DOM
export function addCardToBoard(cardData) {
    const visitCard = createVisitCard(cardData);
    const cardElement = visitCard.createCardElement(checkBoardState);
    cardsContainer.appendChild(cardElement);
    checkBoardState();
}
