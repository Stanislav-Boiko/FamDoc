import { VisitCard } from '../Classes/visitCard.js';

import { CardiologistVisitCard } from '../DoctorsClasses/Cardiologist.js';
import { DentistVisitCard } from '../DoctorsClasses/Dentist.js';
import { TherapistVisitCard } from '../DoctorsClasses/Therapist.js';



export function createVisitCard(cardData) {
    switch (cardData.doctor) {
        case 'Cardiologist':
            return new CardiologistVisitCard(cardData);
        case 'Dentist':
            return new DentistVisitCard(cardData);
        case 'Therapist':
            return new TherapistVisitCard(cardData);
        default:
            return new VisitCard(cardData);
    }
}