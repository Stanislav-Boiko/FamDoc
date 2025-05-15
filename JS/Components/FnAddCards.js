

import { createVisitCard } from '../DoctorsClasses/doctorSelection.js';



// Функція для додавання нових карток у DOM
export const cardsContainer = document.getElementById('cardsContainer');

export function addCardToBoard(cardData) {
    const visitCard = createVisitCard(cardData);
    const cardElement = visitCard.createCardElement();
    cardsContainer.appendChild(cardElement);
}
