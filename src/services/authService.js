// level-up-gamer-react/src/services/authService.js

import axios from 'axios';
import BASE_URL from '../config/api';

const AUTH_URL = `${BASE_URL}/auth`; 

// Función de Registro (POST /api/auth/register)
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`, userData);
        // El backend devuelve { message: 'Registro Exitoso.' }
        return response.data; 
    } catch (error) {
        // En el backend se devuelve { message: '...' } con distintos códigos
        if (error.response && error.response.data) {
            throw error.response.data; // { message: '...' }
        }
        throw new Error('Error de red o servidor');
    }
};

// Función de Login (POST /api/auth/login)
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, credentials);
        
        // El login en el backend devuelve:
        // { message: 'Bienvenida...', user: { id, name, email } }
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user)); 
            localStorage.setItem('activeUserEmail', response.data.user.email);
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data; // { message: 'Email o contraseña incorrectos...' }
        }
        throw new Error('Email o contraseña incorrectos. Intenta de nuevo.');
    }
};

// Función para obtener el perfil del backend (GET /api/auth/profile/:email)
export const getProfile = async (email) => {
    try {
        const response = await axios.get(`${AUTH_URL}/profile/${email}`);
        return response.data; 
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('Error al conectar con el servidor.');
    }
};

// Función para actualizar el perfil del backend (PATCH /api/auth/profile/:email)
export const updateProfile = async (email, data) => {
    try {
        const response = await axios.patch(`${AUTH_URL}/profile/${email}`, data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('Error al conectar con el servidor.');
    }
};