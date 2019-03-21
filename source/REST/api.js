//Instruments
import { MAIN_URL, TOKEN } from './config';

export const api = {
    fetch () {
        return fetch(`${MAIN_URL}`, {
            method:  'GET',
            headers: {
                Authorization: TOKEN,
            },
        });
    },
    create (message) {
        return fetch(`${MAIN_URL}`, {
            method:  'POST',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
    },
    update (task) {
        return fetch(`${MAIN_URL}`, {
            method:  'PUT',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    },
    remove (taskId) {
        return fetch(`${MAIN_URL}/${taskId}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });
    },
};
