import React from 'react';
import '../../styles/Styles.css'; 

const CarritoProductos = ({ product, addToCart }) => { 
    return (
        <div className="product-card"> 
            
            <div className="product-image-container">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image-style"
                />
            </div>
            
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            
            {/* 3. PRECIO Y BOTÓN */}
            <div className="product-footer">
                <p className="product-price">${product.price.toFixed(2)}</p>
                
                <button 
                    className="primary-button add-to-cart-btn" 
                    onClick={() => addToCart(product)}
                >
                    <span role="img" aria-label="Carrito" style={{marginRight: '5px'}}>🛒</span> Añadir
                </button>
            </div>
        </div>
    );
};

export default CarritoProductos;