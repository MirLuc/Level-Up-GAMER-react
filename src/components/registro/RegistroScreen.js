import React, { useState } from 'react';
import './RegistroScreen.css';


const RegisterScreen = () => {
    // Aquí puedes añadir los estados para cada campo (ej. const [texto1, setTexto1] = useState('');)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario de Registro enviado');
        // Lógica de registro aquí...
    };

    return (
        
        <div className="register-body">
            
            {/* Header - Reutiliza la estructura del login */}
            <div className="register-header">
                <div className="register-logo">
                    {/* Usamos los emojis como en la sugerencia anterior */}
                    <span role="img" aria-label="Game Controller" style={{marginRight: '10px', fontSize: '2rem', color: '#9370DB'}}>🎮🎮</span>
                    LEVEL_UP_GAMER
                </div>
                <a href="#" className="back-button">
                    ← Volver
                </a>
            </div>

            <div className="register-card">
                
                <h2 className="mb-4 text-center" style={{color: '#fff', marginBottom: '30px'}}>Registro Usuario</h2>
                
                <form onSubmit={handleSubmit}>

                    {/* Campo 1 */}
                    <div style={{marginBottom: '20px'}}>
                        <label className="register-label">Texto 1</label>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Ingresa texto 1"
                            // ... value y onChange
                        />
                    </div>

                    {/* Campo 2 */}
                    <div style={{marginBottom: '20px'}}>
                        <label className="register-label">Texto 2</label>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Ingresa texto 2"
                            // ... value y onChange
                        />
                    </div>

                    {/* Campo 3 */}
                    <div style={{marginBottom: '20px'}}>
                        <label className="register-label">Texto 3</label>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Ingresa texto 3"
                            // ... value y onChange
                        />
                    </div>

                    {/* Campo 4 */}
                    <div style={{marginBottom: '30px'}}>
                        <label className="register-label">Texto 4</label>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Ingresa texto 4"
                            // ... value y onChange
                        />
                    </div>

                    {/* Botón de Registro */}
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="register-button"
                        >
                            Registrar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default RegisterScreen;