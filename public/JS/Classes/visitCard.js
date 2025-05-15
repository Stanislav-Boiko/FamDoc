import { updateCard, deleteCard } from '../Services/apiService.js';
import { VisitModal } from './VisitModal.js';
import { checkBoardState } from '../Components/BoardState.js'; // Додати цей імпорт



export class VisitCard {
    constructor(cardData) {
        this.cardData = cardData;
        this.expanded = false;
    }


    createCardElement(onCardDelete) {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');
        col.setAttribute('data-id', this.cardData.id);

        const card = document.createElement('div');
        card.classList.add('card', 'shadow-sm', 'h-100');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'd-flex', 'justify-content-between', 'align-items-center');
        cardHeader.innerHTML = `
            <span><strong>${this.cardData.fullName}</strong></span>
            <button class="btn btn-sm btn-danger" title="Remove">
                <i class="bi bi-x-lg"></i>
            </button>
        `;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
            <p><strong>Doctor:</strong> ${this.cardData.doctor}</p>
            <button class="btn btn-outline-success toggle-more">
                Show more
            </button>
            <div class="more-info" style="display: none;">
                <p><strong>Purpose:</strong> ${this.cardData.purpose || 'Not specified'}</p>
                <p><strong>Description:</strong> ${this.cardData.description}</p>
                <p><strong>Urgency:</strong> ${this.cardData.urgency}</p>
                <p class="card-status"><strong>Status</strong>: <span class="status-text">${this.cardData.status || 'Open'}</span></p>
                ${this.renderSpecificFields()}
            </div>
        `;

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'd-flex', 'justify-content-between');
        //  Кнопки карток
        cardFooter.innerHTML = `

            <button class="btn  btn-outline-warning">Edit</button>

            <button class="btn btn-success mark-done">Mark as Done</button>
        `;
        
        
        

        cardHeader.querySelector('.btn-danger').addEventListener('click', () => {
            deleteCard(this.cardData.id, localStorage.getItem('authToken'))
                .then(() => {
                    col.remove();
                    onCardDelete(); // Оновлення інтерфейсу
                })
                .catch((error) => console.error('Error deleting card:', error));
        });


        cardBody.querySelector('.toggle-more').addEventListener('click', (e) => {
            const button = e.target;
            const moreInfo = cardBody.querySelector('.more-info');
        
            this.expanded = !this.expanded;
            moreInfo.style.display = this.expanded ? 'block' : 'none';
        
            button.innerHTML = this.expanded ? 'Hide' : 'Show more';

        });

        // Додаємо обробник для кнопки "Mark as done"
        const markDoneButton = cardFooter.querySelector('.mark-done');

        markDoneButton.textContent = this.cardData.status === 'Done' ? 'Mark as Open' : 'Mark as Done';

        markDoneButton.addEventListener('click', () => {
            const currentStatus = this.cardData.status;
            const newStatus = currentStatus === 'Done' ? 'Open' : 'Done';
        
            // Запит підтвердження дії
            const confirmation = confirm(
                `Are you sure you want to mark this task as "${newStatus}"?`
            );
        
            if (!confirmation) return;
        
            // Оновлення статусу
            const updatedData = { ...this.cardData, status: newStatus };
        
            // Відправка запиту на сервер
            updateCard(this.cardData.id, updatedData, localStorage.getItem('authToken'))
                .then((updatedCard) => {
                    // Оновлення тексту статусу у DOM
                    const statusText = cardBody.querySelector('.status-text');
                    statusText.textContent = updatedCard.status;
        
                    // Оновлюємо дані картки
                    this.cardData = updatedCard;
        
                    // Оновлення тексту кнопки
                    markDoneButton.textContent =
                        updatedCard.status === 'Done' ? 'Mark as Open' : 'Mark as Done';
        
                })
                .catch((error) => {
                    console.error('Failed to update card status:', error);
                    alert('Error updating task status.');
                });
        });
        
        // Додаємо обробник для кнопки "Edit"
        cardFooter.querySelector('.btn-outline-warning').addEventListener('click', () => {
            this.editCard(() => checkBoardState());
        });

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        col.appendChild(card);

        return col;
    }

    editCard(onSaveCallback) {
        const modal = new VisitModal(); // Викликаємо модальне вікно
        modal.showForEdit(this.cardData, (updatedData) => {
            // Оновлюємо локальні дані картки
            this.cardData = { ...this.cardData, ...updatedData };
    
            updateCard(this.cardData.id, updatedData, localStorage.getItem('authToken'))
                .then((updatedCard) => {
                    this.cardData = updatedCard;
                    const newCardElement = this.createCardElement(onSaveCallback);
                    const oldCardElement = document.querySelector(`[data-id="${this.cardData.id}"]`);
                    oldCardElement.replaceWith(newCardElement);
                })
            .catch((error) => console.error('Error updating card:', error));
        });
    }
    

    renderSpecificFields() {
        // дефолтна реалізація для базового класу
        return '';
    }

    
}