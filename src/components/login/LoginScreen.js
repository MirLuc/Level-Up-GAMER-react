import React, { useState } from 'react';
import '../../styles/Styles.css'; 

//  validar un email básico
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const LoginScreen = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); 
    
    // validación de formato
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!email) {
            tempErrors.email = 'El email es obligatorio.';
            isValid = false;
        } else if (!validateEmail(email)) {
            tempErrors.email = 'Formato de email incorrecto.';
            isValid = false;
        }

        if (!password) {
            tempErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        }

        setErrors(tempErrors); 
        return isValid; 
    };

    // Lógica principal de INICIO DE SESIÓN
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Limpia errores 
        
        if (validate()) {
            // Carga la lista de usuarios desde localStorage
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Busca al usuario por email y contraseña
            const user = existingUsers.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );
            
            if (user) {
                // CLAVE PARA GESTIÓN DE PERFILES: Guardar el email del usuario activo
                localStorage.setItem('activeUserEmail', user.email); 
                
                // comprobar descuento
                if (user.email.toLowerCase().endsWith('@duocuc.cl')) {
                    alert(`¡Bienvenido ${user.name}! Tienes un 20% de descuento aplicado.`);
                } else {
                    alert(`¡Bienvenido ${user.name}!`);
                }

                // Redirige al Home/Productos
                onBack(); 
            } else {
                // FALLO: Credenciales incorrectas
                setErrors({ general: 'Email o contraseña incorrectos. Intenta de nuevo.' });
            }
        }
    };

    return (
        <div className="login-body">
            {/* Header */}
            <div className="login-header">
                            <div className="app-logo">
                                <img
                                    src="imagenes/leveluplogo.png"
                                    alt="Level-Up Gamer"
                                    className="logo-img"
                                />
                            </div>
                <a onClick={onBack} className="primary-button nav-btn">
                    ← Volver
                </a>
            </div>
            
            {/* Tarjeta de Login */}
            <div className="main-card" style={{maxWidth: '450px'}}> 
                <h2 className="mb-4 text-center" style={{color: '#fff'}}>Login</h2>
                
                {/* Error General de Credenciales */}
                {errors.general && <p className="error-text text-center" style={{marginBottom: '15px'}}>{errors.general}</p>}

                <form onSubmit={handleSubmit}>
                    
                    {/* Campo Email */}
                    <div className="mb-4">
                        <label className="input-label">Email</label>
                        <input 
                            type="email" 
                            // Uso de la clase condicional para el error visual
                            className={`dark-input ${errors.email ? 'input-error' : ''}`} 
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    {/* Campo Contraseña */}
                    <div className="mb-4">
                        <label className="input-label">Contraseña</label>
                        <input 
                            type="password" 
                            // Uso de la clase condicional para el error visual
                            className={`dark-input ${errors.password ? 'input-error' : ''}`}
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="text-center mt-4">
                        <button type="submit" className="primary-button">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;