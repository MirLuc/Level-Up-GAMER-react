import React from 'react';
import CarritoProductos from './CarritoProductos'; 
import '../../styles/Styles.css';

const ListaProductos = ({ products, navigateToCarrito }) => {
    return (
        <div className="products-container">
            <h2 className="products-title">
                Productos Disponibles ({products.length})
            </h2>
            <div className="products-grid">
                {products.map(product => (
                    <CarritoProductos
                        key={product.id}
                        product={product}
                        navigateToCarrito={navigateToCarrito}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListaProductos;