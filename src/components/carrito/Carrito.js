import React, { useState } from 'react';
import '../../styles/Styles.css';

const Carrito = ({ onBack }) => {
    // Datos de ejemplo para renderizar el carrito 
    const items = [
        { id: 1, name: 'Control PlayStation 5 DualSense', price: 69.99, qty: 1, total: 69.99 },
        { id: 2, name: 'Auriculares Gaming RGB', price: 89.99, qty: 2, total: 179.98 },
        { id: 3, name: 'Teclado Mecánico Gaming', price: 129.99, qty: 1, total: 129.99 },
    ];
    
    // Cálculos de ejemplo
    const subtotal = 379.96;
    const envio = 9.99;
    const impuestos = 38.00;
    const total = 427.95;

    return (
        <div className="carrito-body">
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

            {/* Tarjeta Principal del Carrito */}
            <div className="main-card" style={{maxWidth: '800px', margin: '50px auto'}}> 
                <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Tu Carrito de Compras</h2>
                
                {/* Tabla de Productos */}
                <table className="carrito-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th style={{width: '100px'}}>Precio</th>
                            <th style={{width: '100px'}}>Cantidad</th>
                            <th style={{width: '100px'}}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.qty}</td>
                                <td>${item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Resumen de Totales */}
                <div className="carrito-footer">
                    <div className="carrito-footer-row">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="carrito-footer-row">
                        <span>Envío:</span>
                        <span>${envio.toFixed(2)}</span>
                    </div>
                    <div className="carrito-footer-row">
                        <span>Impuestos (10%):</span>
                        <span>${impuestos.toFixed(2)}</span>
                    </div>
                    <div className="carrito-footer-row carrito-total">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="checkout-buttons">
                    <a onClick={onBack} className="primary-button">
                        Seguir Comprando
                    </a>
                    <button type="button" className="primary-button">
                        Pagar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carrito;