

import { VisitCard } from '../Classes/visitCard.js';



// Клас для стоматолога
export class DentistVisitCard extends VisitCard {
    renderSpecificFields() {
        return `<p><strong>Last visit:</strong> ${this.cardData.lastVisit}</p>`;
    }
}