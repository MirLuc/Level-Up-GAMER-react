import React, { useState } from 'react';
import '../../styles/Styles.css'; 

const LoginScreen = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intento de Login con:', { email, password });
        alert('Intentando Iniciar Sesión...');
    };

    return (
        <div className="login-body">
            <div className="login-header">
                <div className="login-logo">
                    <span role="img" aria-label="Game Controller"> 🎮 </span>
                    LEVEL_UP_GAMER
                </div>
                {/* Botón Volver con estilo primario compacto */}
                <a onClick={onBack} className="primary-button nav-btn">
                    ← Volver
                </a>
            </div>
            
            <div className="main-card"> 
                <h2 className="mb-4 text-center" style={{color: '#fff'}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="input-label">Email</label>
                        <input 
                            type="email" 
                            className="dark-input" 
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="input-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="dark-input" 
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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