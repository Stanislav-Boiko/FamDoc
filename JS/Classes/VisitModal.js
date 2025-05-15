
import { addCardToBoard } from '../Components/FnAddCards.js';
import { createCard } from '../Services/apiService.js';



//Модальне вікно створення візиту
export class VisitModal {
    constructor() {
        this.modalId = 'visitModal';
        this.modalHTML = `
            <div class="modal fade" id="${this.modalId}" tabindex="-1" aria-labelledby="${this.modalId}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${this.modalId}Label">Creating a visit</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="visitForm">
                                <div class="mb-3">
                                    <label for="doctorSelect" class="form-label">Choose a doctor</label>
                                    <select id="doctorSelect" class="form-select" required>
                                        <option value="" disabled selected>Choose...</option>
                                        <option value="Cardiologist">Cardiologist</option>
                                        <option value="Dentist">Dentist</option>
                                        <option value="Therapist">Therapist</option>
                                    </select>
                                </div>
                                <div id="additionalFields"></div>
                                <div class="mb-3">
                                    <label for="visitTitle" class="form-label">Visit title</label>
                                    <input type="text" class="form-control" id="visitTitle" required>
                                </div>
                                <div class="mb-3">
                                    <label for="visitDetails" class="form-label">Details</label>
                                    <textarea class="form-control" id="visitDetails" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="urgencySelect" class="form-label">Urgency</label>
                                    <select id="urgencySelect" class="form-select" required>
                                        <option value="" disabled selected>Choose...</option>
                                        <option value="Low">Low</option>
                                        <option value="Normal">Normal</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="patientName" class="form-label">Patient's full name</label>
                                    <input type="text" class="form-control" id="patientName" required>
                                </div>
                                <button type="submit" class="btn btn-success">+ Create +</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    

    show() {
        // Додаємо модальне вікно до DOM
        const container = document.getElementById('visitModalContainer');
        container.innerHTML = this.modalHTML;

        // Ініціалізуємо Bootstrap Modal
        const modalElement = document.getElementById(this.modalId);
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();

        // Обробка вибору лікаря
        document.getElementById('doctorSelect').addEventListener('change', this.handleDoctorSelection);

        // Обробка форми
        document.getElementById('visitForm').addEventListener('submit', (event) => {
            event.preventDefault();

            // Отримання даних з форми
            const doctor = document.getElementById('doctorSelect').value;
            const title = document.getElementById('visitTitle').value;
            const details = document.getElementById('visitDetails').value;
            const urgency = document.getElementById('urgencySelect').value;
            const patientName = document.getElementById('patientName').value;

            // Додаткові дані лікаря
            const additionalData = {};
            document.querySelectorAll('#additionalFields input').forEach(input => {
                additionalData[input.id] = input.value;
            });

            // Формуємо об'єкт для картки
            const visitData = {
                fullName: patientName,
                doctor,
                purpose: title,
                description: details,
                urgency,
                status: 'Open',// Додаємо статус за замовчуванням
                ...additionalData,
            };

            createCard(visitData, localStorage.getItem('authToken'))
            .then((newCard) => {
                addCardToBoard(newCard); // Додати картку у DOM
                modalInstance.hide(); // Закрити модальне вікно
            })
            .catch((error) => console.error('Failed to create card:', error));

                // Закриваємо модальне вікно
            modalInstance.hide();
        });
    }

    showForEdit(cardData, editCard) {
        // Додаємо модальне вікно в DOM
        const container = document.getElementById('visitModalContainer');
        container.innerHTML = this.modalHTML;
    
        // Ініціалізуємо Bootstrap Modal
        const modalElement = document.getElementById(this.modalId);
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    
        // Заповнюємо дані з переданого об'єкта cardData
        document.getElementById('doctorSelect').value = cardData.doctor;
        document.getElementById('visitTitle').value = cardData.purpose;
        document.getElementById('visitDetails').value = cardData.description;
        document.getElementById('urgencySelect').value = cardData.urgency;
        document.getElementById('patientName').value = cardData.fullName;
    
        // Відображаємо додаткові поля для вибраного лікаря
        this.handleDoctorSelection({ target: { value: cardData.doctor } });
        for (const key in cardData) {
            const input = document.getElementById(key);
            if (input) {
                input.value = cardData[key];
            }
        }
    
        // Змінюємо текст кнопки і її поведінку
        const submitButton = document.querySelector('#visitForm button[type="submit"]');
        submitButton.textContent = "Save";
    
        // Зберігаємо зміни при відправленні форми
        document.getElementById('visitForm').addEventListener('submit', (event) => {
            event.preventDefault();
    
            // Збираємо оновлені дані
            const doctor = document.getElementById('doctorSelect').value;
            const title = document.getElementById('visitTitle').value;
            const details = document.getElementById('visitDetails').value;
            const urgency = document.getElementById('urgencySelect').value;
            const patientName = document.getElementById('patientName').value;
    
            const updatedData = {
                fullName: patientName,
                doctor,
                purpose: title,
                description: details,
                urgency,
            };
    
            // Додаємо додаткові дані
            document.querySelectorAll('#additionalFields input').forEach(input => {
                let loc = updatedData[input.id] = input.value;
                
            });
    
            // Викликаємо колбек для оновлення даних
            editCard(updatedData);
    
            // Закриваємо модальне вікно
            modalInstance.hide();
        });
    }
    

    //  Перевірка вибранного лікаря
    handleDoctorSelection(event) {
        const doctor = event.target.value;
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = '';

        if (doctor === 'Cardiologist') {
            additionalFields.innerHTML = `
                <div class="mb-3">
                    <label for="bp" class="form-label">Blood pressure</label>
                    <input type="text" class="form-control" id="bp" required>
                </div>
                <div class="mb-3">
                    <label for="bmi" class="form-label">Body mass index</label>
                    <input type="number" class="form-control" id="bmi" required>
                </div>
                <div class="mb-3">
                    <label for="heartDiseases" class="form-label">Past cardiovascular diseases</label>
                    <input type="text" class="form-control" id="heartDiseases" required>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" required>
                </div>`;
        } else if (doctor === 'Dentist') {
            additionalFields.innerHTML = `
                <div class="mb-3">
                    <label for="lastVisit" class="form-label">Date of last visit</label>
                    <input type="date" class="form-control" id="lastVisit" required>
                </div>`;
        } else if (doctor === 'Therapist') {
            additionalFields.innerHTML = `
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" required>
                </div>`;
        }
    }
 
}