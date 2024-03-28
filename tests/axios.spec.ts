import axios from 'axios';
import { test, expect } from '@playwright/test';

async function makeGetRequest() {
    try {
        // Виконання GET-запиту за допомогою Axios
        const response = await axios.get('https://httpbin.org/get');

        // Отримання даних з відповіді та виведення їх у консоль
        console.log('Статус код відповіді:', response.status);
        console.log('Дані відповіді:', response.data);
    } catch (error) {
        // Обробка помилок
        if (axios.isAxiosError(error)) {
            // Помилка Axios
            console.error('Помилка Axios:', error.message);
        } else if (error.response) {
            // Помилка від сервера (з кодом статусу відповіді)
            console.error('Помилка сервера:', error.response.data);
        } else {
            // Інші помилки
            console.error('Інша помилка:', error.message);
        }
    }
}

// Виклик функції для виконання GET-запиту
test('has title', async ({ page }) => {
    await makeGetRequest();
});