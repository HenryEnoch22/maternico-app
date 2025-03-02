import { getToken, setToken } from "./TokenService";
import axios from "../utils/axios";

export async function getCsrfToken() {
    const token = await axios.get('/sanctum/csrf-cookie'); // Obtiene el token CSRF
    console.log('Token CSRF obtenido:', token);
}

export async function login(credentials) {
    await getCsrfToken(); // Asegúrate de obtener el token CSRF antes de hacer el login

    try {
        const response = await axios.post('/login', credentials);
        console.log('Respuesta del servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud POST:', error.response?.data);
        throw error;
    }
}


export async function loadUser() {
    const { data } = await axios.get('/api/user');

    console.log("Usuario desde API:", data);
    return data;
}

export async function register(userData) {
    const {data} = await axios.post("/register", userData);
    await setToken(data.token);
    return data.user;
}

export async function logout() {
    await axios.post('/logout');
}