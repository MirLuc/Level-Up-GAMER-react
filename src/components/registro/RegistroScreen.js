import React, { useState } from 'react';
import '../../styles/Styles.css';

const RegistroScreen = ({ onBack }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Intentando Registrar Usuario...');
    };

    return (
        <div className="registro-body">
            {/* Header */}
            <div className="registro-header"> 
                <div className="registro-logo">
                    <span role="img" aria-label="Game Controller"> 🎮 </span>
                    LEVEL_UP_GAMER
                </div>
                {/* Botón Volver con estilo primario compacto */}
                <a 
                    onClick={onBack} 
                    className="primary-button nav-btn" 
                >
                    ← Volver
                </a>
            </div>
            
            {/* Tarjeta de Registro */}
            <div className="main-card">
                 <h2 className="mb-4 text-center" style={{color: '#fff'}}>Registro de Nuevo Usuario</h2>
                 <form onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div>
                            <label className="input-label">Nombre</label>
                            <input type="text" className="dark-input" placeholder="Tu nombre" required/>
                        </div>
                        <div>
                            <label className="input-label">Apellido</label>
                            <input type="text" className="dark-input" placeholder="Tu apellido" required/>
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div>
                            <label className="input-label">Email</label>
                            <input type="email" className="dark-input" placeholder="tucorreo@ejemplo.com" required/>
                        </div>
                        <div>
                            <label className="input-label">Contraseña</label>
                            <input type="password" className="dark-input" placeholder="Mínimo 8 caracteres" required/>
                        </div>
                    </div>
                    
                    <div className="form-group-row">
                        <div>
                            <label className="input-label">Fecha Nacimiento</label>
                            <input type="date" className="dark-input" placeholder="dd/mm/aaaa" />
                        </div>
                        <div>
                            <label className="input-label">Género</label>
                            <select className="dark-input">
                                <option>Selecciona género</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                                <option>Otro</option>
                            </select>
                        </div>
                    </div>

                    <div style={{marginBottom: '20px'}}>
                        <label className="input-label">Dirección</label>
                        <input type="text" className="dark-input" placeholder="Ingresa tu dirección completa" />
                    </div>

                    {/* Botón de Submit */}
                    <div className="text-center mt-4">
                        <button type="submit" className="primary-button">
                            Crear Cuenta
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    );
};

export default RegistroScreen;