import React, { useState } from 'react';
import './LoginScreen.css';


const LoginScreen = () => {
   

    return (
       
        <div className="login-body">
           
            {/* Header */}
            <div className="login-header">
                <div className="login-logo">
                    <span role="img" aria-label="Game Controller" style={{marginRight: '10px', fontSize: '2rem'}}>🎮</span>
                    LEVEL_UP_GAMER
                </div>
                <a href="#" className="back-button">
                    ← Volver
                </a>
            </div>

            <div className="login-card">
               
                <h2 className="mb-4 text-center">Login</h2>
               
                <form onSubmit={/ ... /}>

                    {/* Campo 1 */}
                    <div className="mb-4">
                        {/* Agregamos login-input junto con form-control de Bootstrap */}
                        <input
                            type="text"
                            className="form-control login-input"
                            placeholder="name@duocuc.cl"
                            /* ... */
                        />
                    </div>

                    {/* Campo 2 */}
                    <div className="mb-5">
                        <input
                            type="password"
                            className="form-control login-input"
                            placeholder="Contraseña"
                            /* ... */
                        />
                    </div>

                    {/* Botón de Ingreso */}
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="btn login-button" // Usamos la clase personalizada
                        >
                            Ingresar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default LoginScreen;