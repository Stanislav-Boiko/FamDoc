

import { VisitCard } from '../Classes/visitCard.js';



// Клас для терапевта
export class TherapistVisitCard extends VisitCard {
    renderSpecificFields() {
        return `<p><strong>Age:</strong> ${this.cardData.age}</p>`;
    }
}