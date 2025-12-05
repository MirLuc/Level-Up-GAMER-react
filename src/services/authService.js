// level-up-gamer-react/src/services/authService.js

import axios from 'axios';
import BASE_URL from '../config/api';

const AUTH_URL = `${BASE_URL}/auth`; // URL: http://localhost:3000/api/auth

// Función de Registro
export const registerUser = async (userData) => {
    try {
        // Petición POST a http://localhost:3000/api/auth/register
        const response = await axios.post(`${AUTH_URL}/register`, userData);
        
        // El backend debe devolver el usuario registrado o un token
        return response.data; 
    } catch (error) {
        // Manejo de errores (ej. email ya existe, validación fallida)
        throw error.response ? error.response.data : new Error('Error de red o servidor');
    }
};

// Función de Login
export const loginUser = async (credentials) => {
    try {
        // Petición POST a http://localhost:3000/api/auth/login
        const response = await axios.post(`${AUTH_URL}/login`, credentials);
        
        // Guarda el token (si el backend lo devuelve) en el almacenamiento local
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error de red o servidor');
    }
};

