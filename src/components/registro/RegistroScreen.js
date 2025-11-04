import React, { useState } from 'react';
import '../../styles/Styles.css';

// Aceptamos la prop 'onBack'
const RegistroScreen = ({ onBack }) => {

  return (
    <div className="registro-body">

      {/* Header */}
      <div className="registro-header">
        <div className="registro-logo">
          <span role="img" aria-label="Game Controller" style={{marginRight: '10px', fontSize: '2rem'}}> 🎮 </span>
          LEVEL_UP_GAMER
        </div>
        {/* Botón Volver - Usa onClick para llamar a la función onBack */}
        <a 
          onClick={onBack} 
          className="back-button" 
          style={{cursor: 'pointer'}}
        >
          ← Volver
        </a>
      </div>
      
      {/* Tarjeta de Registro */}
      <div className="registro-card">
         <h2 className="mb-4 text-center">Registro de Usuario</h2>
         
         <form>
            <div className="mb-3">
                 <input type="text" className="form-control registro-input" placeholder="Nombre completo" />
            </div>
            <div className="mb-3">
                 <input type="email" className="form-control registro-input" placeholder="Correo electrónico" />
            </div>
             <div className="mb-3">
                 <input type="password" className="form-control registro-input" placeholder="Contraseña" />
            </div>
            
            {/* Botón de Registro */}
            <div className="text-center mt-4">
               <button type="submit" className="btn registro-button">
                 Registrarse
               </button>
            </div>
         </form>
      </div>
    </div>
  );
}
export default RegistroScreen;
