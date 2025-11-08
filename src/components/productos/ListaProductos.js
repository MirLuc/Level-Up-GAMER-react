import React from 'react';
import CarritoProductos from './CarritoProductos'; 
import '../../styles/Styles.css';

// funcion para agregar carrito
const ListaProductos = ({ products, addToCart }) => { 
    return (
        <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <h2 style={{ color: '#00c6ff', marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                Productos Disponibles ({products.length})
            </h2>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '30px' 
            }}>
                {products.map(product => (
                    <CarritoProductos 
                        key={product.id} 
                        product={product} 
                        addToCart={addToCart} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ListaProductos;