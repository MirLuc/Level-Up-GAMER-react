import React, { useState } from 'react';
import '../../styles/Styles.css'; // <-- RUTA CORREGIDA

// Aceptamos la prop 'onBack'
const Carrito = ({ onBack }) => {

  // Datos de ejemplo para renderizar el carrito 
  const items = [
    { name: 'Control PlayStation 5 DualSense', price: 69.99, qty: 1, total: 69.99 },
    { name: 'Auriculares Gaming RGB', price: 89.99, qty: 2, total: 179.98 },
    { name: 'Teclado Mecánico Gaming', price: 129.99, qty: 1, total: 129.99 },
  ];

  const subtotal = 379.96;
  const envio = 9.99;
  const impuestos = 38.00;
  const total = 427.95;

  return (
    <div className="carrito-body">
      {/* Header (similar a Login/Registro) */}
      <div className="login-header">
        <div className="login-logo">
          <span role="img" aria-label="Game Controller" style={{marginRight: '10px', fontSize: '2rem'}}> 🎮 </span>
          LEVEL_UP_GAMER
        </div>
      </div>

      <div className="main-card" style={{maxWidth: '800px', margin: '50px auto'}}>
        <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Carrito de Compras</h2>
        
        {/* Productos en tu Carrito */}
        {/* ... (código de listado de productos en carrito) ... */}
        {/* Resumen del Pedido */}
        {/* ... (código de resumen) ... */}
        {/* Método de Pago */}
        {/* ... (código de método de pago) ... */}

        {/* Botones de acción */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px'}}>
            <button type="button" className="primary-button">Proceder al Pago</button>
            <button type="button" onClick={onBack} className="secondary-button" style={{backgroundColor: '#444'}}>Seguir Comprando</button>
        </div>
      </div>
    </div>
  );
}
export default Carrito;