import React, { useState } from 'react';
import '../../styles/Styles.css';

const GestionDePerfiles = ({ onBack }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Perfil Guardado...');
    };

    return (
        <div className="perfiles-body">
            {/* Header */}
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
            {/* Tarjeta de Perfil */}
            <div className="main-card" style={{maxWidth: '800px', margin: '50px auto'}}> 
                <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Información Personal</h2>
                <form onSubmit={handleSubmit}>
                    {/* Sección 1: Datos Personales */}
                    <div className="form-group-row">
                        <div><label className="input-label">Nombre</label><input type="text" className="dark-input" placeholder="Tu nombre" /></div>
                        <div><label className="input-label">Apellido</label><input type="text" className="dark-input" placeholder="Tu apellido" /></div>
                    </div>
                    <div className="form-group-row">
                        <div><label className="input-label">Email</label><input type="email" className="dark-input" placeholder="tucorreo@ejemplo.com" /></div>
                        <div><label className="input-label">Teléfono</label><input type="tel" className="dark-input" placeholder="Tu teléfono de contacto" /></div>
                    </div>
                    <div className="form-group-row">
                        <div><label className="input-label">Fecha Nacimiento</label><input type="date" className="dark-input" placeholder="dd/mm/aaaa" /></div>
                        <div><label className="input-label">Género</label><select className="dark-input"><option>Selecciona género</option></select></div>
                    </div>
                    
                    <div style={{marginBottom: '20px'}}>
                        <label className="input-label">Dirección</label>
                        <input type="text" className="dark-input" placeholder="Ingresa tu dirección completa" />
                    </div>
                    
                    {/* Sección 2: Preferencias */}
                    <h2 className="text-center" style={{color: '#00c6ff', marginTop: '40px', marginBottom: '30px'}}>Preferencias de Compra</h2>
                    <div className="form-group-row">
                        <div><label className="input-label">Presupuesto Preferido</label><select className="dark-input"><option>Selecciona presupuesto</option></select></div>
                        <div><label className="input-label">Plataforma Principal</label><select className="dark-input"><option>Selecciona plataforma</option></select></div>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <label className="input-label">Juego Favorito</label>
                        <input type="text" className="dark-input" placeholder="Ej: Cyberpunk 2077, Zelda..." />
                    </div>

                    {/* Botones de acción */}
                    <div className="text-center mt-5" style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
                        <button type="submit" className="primary-button">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={onBack} className="primary-button">
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default GestionDePerfiles;