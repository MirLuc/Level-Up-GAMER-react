import React from 'react';
import '../../styles/Styles.css';

// Este componente es la tarjeta individual de un producto
const CarritoProductos = ({ product, navigateToCarrito }) => (
    <div className="product-card" style={{ 
        backgroundColor: '#222', 
        borderRadius: '10px', 
        padding: '15px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div className="product-image" style={{ textAlign: 'center', marginBottom: '10px' }}>
             <span role="img" aria-label="product-icon" style={{fontSize: '3rem', color: '#00c6ff'}}> {product.emoji} </span>
        </div>
        <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '10px 0' }}>{product.name}</h3>
        <p style={{ color: '#aaa', fontSize: '0.9rem', flexGrow: 1 }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
            <span style={{ color: '#00c6ff', fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
            <button 
                onClick={navigateToCarrito} 
                className="primary-button" 
                style={{ padding: '8px 15px', fontSize: '0.9rem', cursor: 'pointer' }}
            >
                Añadir 🛒
            </button>
        </div>
    </div>
);

export default CarritoProductos;