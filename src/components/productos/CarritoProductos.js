import React from 'react';
import '../../styles/Styles.css';

// Este componente es la tarjeta individual de un producto
const CarritoProductos = ({ product, navigateToCarrito }) => (
    <div className="product-card"> 
        <div className="product-image">
             <span role="img" aria-label="product-icon"> {product.emoji} </span>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <button
                onClick={navigateToCarrito}
                className="primary-button nav-btn"
            >
                Añadir 🛒
            </button>
        </div>
    </div>
);

export default CarritoProductos;