import React, { useState } from 'react';
import '../../styles/Styles.css'; 
import { loginUser } from '../../services/authService';

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

    // Lógica principal de INICIO DE SESIÓN (CONECTADA AL BACKEND)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); 
        
        if (validate()) {
            try {
                const data = await loginUser({
                    email: email.toLowerCase(),
                    password: password,
                });

                // El backend ya nos manda el mensaje con o sin descuento
                if (data.message) {
                    alert(data.message);
                } else {
                    alert('Inicio de sesión exitoso.');
                }

                // `loginUser` ya guarda user y activeUserEmail en localStorage
                onBack(); // Redirige al Home/Productos
            } catch (error) {
                // error puede ser { message: '...' } o un Error
                const message = error.message || error?.message || 'Email o contraseña incorrectos. Intenta de nuevo.';
                setErrors({ general: message });
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