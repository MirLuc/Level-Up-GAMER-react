import React, { useState } from 'react';
import '../../styles/Styles.css'; // <-- RUTA CORREGIDA

// Aceptamos la prop 'onBack'
const GestionDePerfiles = ({ onBack }) => {

  return (
    <div className="perfiles-body">
      {/* Header */}
      <div className="login-header"> 
        <div className="login-logo">
          <span role="img" aria-label="Game Controller" style={{marginRight: '10px', fontSize: '2rem'}}> 🎮 </span>
          LEVEL_UP_GAMER
        </div>
        {/* Botón Volver */}
        <a onClick={onBack} className="back-button" style={{cursor: 'pointer'}}>
          ← Volver
        </a>
      </div>

      <div className="main-card" style={{maxWidth: '800px', margin: '50px auto'}}>
        <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Información Personal</h2>
        
        <form>
            {/* Información Personal */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div><label className="input-label">Nombre</label><input type="text" className="dark-input" placeholder="Ingresa tu nombre" /></div>
                <div><label className="input-label">Apellido</label><input type="text" className="dark-input" placeholder="Ingresa tu apellido" /></div>
                <div><label className="input-label">Email</label><input type="email" className="dark-input" placeholder="Ingresa tu email" /></div>
                <div><label className="input-label">Teléfono</label><input type="text" className="dark-input" placeholder="Ingresa tu teléfono" /></div>
                <div><label className="input-label">Fecha de Nacimiento</label><input type="date" className="dark-input" placeholder="dd/mm/aaaa" /></div>
                <div><label className="input-label">Género</label><select className="dark-input"><option>Selecciona género</option></select></div>
            </div>
            
            <div style={{marginBottom: '20px'}}><label className="input-label">Dirección</label><input type="text" className="dark-input" placeholder="Ingresa tu dirección completa" /></div>

            {/* Preferencias */}
            <h2 className="text-center" style={{color: '#00c6ff', marginTop: '40px', marginBottom: '30px'}}>Preferencias de Compra</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div><label className="input-label">Presupuesto Preferido</label><select className="dark-input"><option>Selecciona presupuesto</option></select></div>
                <div><label className="input-label">Método de Pago Preferido</label><select className="dark-input"><option>Selecciona método</option></select></div>
            </div>

            {/* Botones de acción */}
            <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px'}}>
                <button type="submit" className="primary-button">Guardar Cambios</button>
                <button type="button" onClick={onBack} className="secondary-button" style={{backgroundColor: '#444'}}>Volver</button>
            </div>
        </form>
      </div>
    </div>
  );
}
export default GestionDePerfiles;