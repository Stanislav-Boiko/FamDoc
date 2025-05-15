

import { VisitCard } from '../Classes/VisitCard.js';



// Клас для кардіолога
export class CardiologistVisitCard extends VisitCard {
    renderSpecificFields() {
        return `
            <p><strong>Pressure:</strong> ${this.cardData.bp}</p>
            <p><strong>Body mass index:</strong> ${this.cardData.bmi}</p>
            <p><strong>Heart disease:</strong> ${this.cardData.heartDiseases}</p>
            <p><strong>Age:</strong> ${this.cardData.age}</p>
        `;
    }
}