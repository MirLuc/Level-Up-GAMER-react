// src/components/registro/RegistroScreen.js

import React, { useState } from 'react';
import '../../styles/Styles.css';
import BASE_URL from '../../config/api'; // Asegúrate de que esta ruta sea correcta

// Función auxiliar para validar un email básico
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// verificar si la persona tiene 18 años
const isOver18 = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
};

const RegistroScreen = ({ onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(''); 
    const [errors, setErrors] = useState({});
    const [discountMessage, setDiscountMessage] = useState('');

    // FUNCIÓN DE VALIDACIÓN EN EL CLIENTE
    const validate = () => {
        let tempErrors = {};
        let isValid = true;
        const duocDomain = '@duocuc.cl';

        //  Validación de Nombre 
        if (!name.trim()) {
            tempErrors.name = 'El nombre de usuario es obligatorio.';
            isValid = false;
        }

        //  Validación de Email 
        if (!email) {
            tempErrors.email = 'El email es obligatorio.';
            isValid = false;
        } else if (!validateEmail(email)) {
            tempErrors.email = 'Formato de email incorrecto.';
            isValid = false;
        }
        // NOTA: Se eliminó la verificación de email duplicado con localStorage. 
        // Esta validación la maneja ahora el backend con la BD (Paso 3, código 409).

        // Validación de Contraseña 
        if (!password) {
            tempErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (password.length < 6) { 
            tempErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        //  Validación de fecha de de nacimiento +18
        if (!birthDate) {
            tempErrors.birthDate = 'La fecha de nacimiento es obligatoria.';
            isValid = false;
        } else if (!isOver18(birthDate)) {
            tempErrors.birthDate = 'Debes ser mayor de 18 años para registrarte.';
            isValid = false;
        }

        setErrors(tempErrors); 
        
        // Logica de descuento por ser parte de duoc
        if (email && email.toLowerCase().endsWith(duocDomain) && validateEmail(email)) {
            setDiscountMessage('¡Felicidades! Tienes un 20% de descuento por ser parte de DuocUC.');
        } else {
            setDiscountMessage('');
        }
        
        return isValid; 
    };

    // Lógica principal de REGISTRO (AHORA CONECTADA AL BACKEND)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validate()) {
            const newUser = {
                name: name.trim(),
                email: email.toLowerCase(),
                password: password, 
                birthDate: birthDate,
            };
            
            try {
                const response = await fetch(`${BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser), 
                });

                const data = await response.json();

                if (response.ok) {
                    // CÓDIGO 201: Registro exitoso
                    alert(data.message + ' Ya puedes iniciar sesión.');
                    onBack(); 
                } else if (response.status === 400 || response.status === 409) {
                    // CÓDIGOS 400/409: Errores de validación o conflicto (ej: email duplicado, menor de 18)
                    alert('Error en el registro: ' + data.message);
                    console.error('Error en el backend:', data.message);
                } else {
                    // CÓDIGO 500 o no manejado
                    alert('Error: ' + (data.message || 'Error desconocido al intentar el registro.'));
                }
                
            } catch (error) {
                console.error('Error de red al registrar:', error);
                alert('Error de red o conexión fallida con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:5000');
            }
        } else {
            console.log('Error de Validación en el Cliente');
        }
    };

    return (
        <div className="registro-body">
            {/* Header */}
            <div className="registro-header">
                <div className="registro-logo">
                    <span role="img" aria-label="Game Controller"> 🎮 </span>
                    LEVEL_UP_GAMER
                </div>
                <a onClick={onBack} className="primary-button nav-btn">
                    ← Volver
                </a>
            </div>
            
            {/* Tarjeta de Registro */}
            <div className="main-card" style={{maxWidth: '450px'}}> 
                <h2 className="mb-4 text-center" style={{color: '#fff'}}>Registro de Nuevo Usuario</h2>
                
                {/* Mensaje de Descuento */}
                {discountMessage && (
                    <div className="alert-duoc-discount">
                        {discountMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    
                    {/* Campo 1: Nombre */}
                    <div className="mb-4">
                        <label className="input-label">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            className={`dark-input ${errors.name ? 'input-error' : ''}`}
                            placeholder="Ej: JuanitoGamer2024"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>

                    {/* Campo 2: Email */}
                    <div className="mb-4">
                        <label className="input-label">Email</label>
                        <input 
                            type="email" 
                            className={`dark-input ${errors.email ? 'input-error' : ''}`} 
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validate} // Lanza validación al salir del campo
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    
                    {/* Campo 3: Fecha Nacimiento */}
                    <div className="mb-4">
                        <label className="input-label">Fecha Nacimiento</label>
                        <input 
                            type="date" 
                            className={`dark-input ${errors.birthDate ? 'input-error' : ''}`}
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                        {errors.birthDate && <p className="error-text">{errors.birthDate}</p>}
                    </div>


                    {/* Campo 4: Contraseña */}
                    <div className="mb-4">
                        <label className="input-label">Contraseña</label>
                        <input 
                            type="password" 
                            className={`dark-input ${errors.password ? 'input-error' : ''}`}
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                    
                    <div className="text-center mt-4">
                        <button type="submit" className="primary-button">
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistroScreen;