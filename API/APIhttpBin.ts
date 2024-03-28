import axios, { AxiosInstance } from 'axios';

export class ApihttpBin {

    async httpBinGet(url) {
        try {
            const response = await axios.get(url);

            console.log('Статус код відповіді:', response.status);
            console.log('Дані відповіді:', response.data);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка Axios:', error.message);
            } else if (error.response) {
                console.error('Помилка сервера:', error.response.data);
            } else {
                console.error('Інша помилка:', error.message);
            }
        }
    }
}