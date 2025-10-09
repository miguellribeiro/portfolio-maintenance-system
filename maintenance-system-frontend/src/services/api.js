import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Autentica um usuário fazendo uma chamada POST para o backend.
 * @param {string} login - O e-mail ou nome de usuário.
 * @param {string} password - A senha.
 * @returns {Promise} A promessa da resposta da API.
 */
export const loginUser = (login, password) => {
    return apiClient.post('/api/auth/login', { login, password });
};

export const getClientes = () => apiClient.get('/clientes');