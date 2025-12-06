// level-up-gamer-react/src/services/authService.js

import axios from 'axios';
import BASE_URL from '../config/api';

const AUTH_URL = `${BASE_URL}/auth`; 

// Función de Registro
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`, userData);
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error de red o servidor');
    }
};

// Función de Login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, credentials);
        
        // El login en el backend devuelve el objeto 'user' (con id, name, email)
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user)); 
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Email o contraseña incorrectos. Intenta de nuevo.');
    }
};

//Función para obtener el perfil del backend (GET)
export const getProfile = async (email) => {
    try {
        // Llama a GET /api/auth/profile/:email
        const response = await axios.get(`${AUTH_URL}/profile/${email}`);
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

// unción para actualizar el perfil del backend (PATCH)
export const updateProfile = async (email, data) => {
    try {
        // Llama a PATCH /api/auth/profile/:email
        const response = await axios.patch(`${AUTH_URL}/profile/${email}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};