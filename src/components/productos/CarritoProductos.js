import React from 'react';
import '../../styles/Styles.css';

// Ahora acepta la función `addToCart` como prop
const CarritoProductos = ({ product, addToCart }) => (
    <div className="product-card">
        <div className="product-image" style={{ textAlign: 'center', marginBottom: '10px' }}>
             <span role="img" aria-label="product-icon" style={{fontSize: '3rem', color: '#00c6ff'}}> {product.emoji} </span>
        </div>
        <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '10px 0' }}>{product.name}</h3>
        <p style={{ color: '#aaa', fontSize: '0.9rem', flexGrow: 1 }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
            <span style={{ color: '#00c6ff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${product.price.toFixed(2)}
            </span>
            {/* CLAVE: Cambiamos navigateToCarrito por addToCart y pasamos el producto */}
            <button 
                className="primary-button" 
                onClick={() => addToCart(product)} 
                style={{padding: '8px 15px', fontSize: '1rem'}}
            >
                🛒 Añadir
            </button>
        </div>
    </div>
);

export default CarritoProductos;