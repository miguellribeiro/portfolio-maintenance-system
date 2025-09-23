import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loginUser = async (login, password) => {
    console.log("Tentando login com:", login, password);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login === "admin@pms.com") {
        return {
            data: {
                token: "fake-jwt-token-admin",
                user: { id: 1, nome: "Admin Master", email: "admin@pms.com", role: "ADMIN" }
            }
        };
    } else if (login === "cliente@pms.com") {
        return {
            data: {
                token: "fake-jwt-token-cliente",
                user: { id: 2, nome: "Cliente Exemplo", email: "cliente@pms.com", role: "CLIENTE" }
            }
        };
    } else if (login === "tecnico@pms.com") {
        return {
            data: {
                token: "fake-jwt-token-tecnico",
                user: { id: 3, nome: "Técnica Ana", email: "tecnico@pms.com", role: "TECNICO" }
            }
        };
    } else {
        throw new Error("Credenciais inválidas");
    }
};

export const getClientes = () => apiClient.get('/clientes');

