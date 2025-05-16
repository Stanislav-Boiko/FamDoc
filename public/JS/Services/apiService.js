// const API_URL = 'https://ajax.test-danit.com/api/v2/cards';
const API_URL = 'https://famdoc-server-1.onrender.com/api/v2/cards';

export async function fetchCards(token) {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch cards');
    }
    return response.json();
}

export async function createCard(cardData, token) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cardData),
    });
    if (!response.ok) {
        throw new Error('Failed to create card');
    }
    return response.json();
}

export async function updateCard(cardId, updatedData, token) {
    const response = await fetch(`${API_URL}/${cardId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
        throw new Error('Failed to update card');
    }
    return response.json();
}

export async function deleteCard(cardId, token) {
    const response = await fetch(`${API_URL}/${cardId}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete card');
    }
}
