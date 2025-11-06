import React from 'react';
import '../../styles/Styles.css';

// Función auxiliar para calcular el subtotal y el total
const calculateCartTotals = (items) => {
    let subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const envio = 9.99; // Costo fijo de envío
    const impuestos = subtotal * 0.10; // 10% de impuestos
    const total = subtotal + envio + impuestos;
    
    return { subtotal, envio, impuestos, total };
};

const Carrito = ({ onBack, cartItems, setCartItems }) => {
    
    // Función para manejar el cambio de cantidad (aumentar/disminuir)
    const handleQtyChange = (itemId, change) => {
        setCartItems(
            cartItems
                .map(item => 
                    item.id === itemId ? { ...item, qty: Math.max(0, item.qty + change) } : item
                )
                .filter(item => item.qty > 0) // Elimina si la cantidad baja a 0
        );
    };

    // Función para eliminar un producto
    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    // Lógica para simular el Checkout (vaciar el carrito)
    const handleCheckout = () => {
        alert('¡Compra finalizada con éxito! Gracias por tu pedido.');
        setCartItems([]); // Vacía el carrito
        onBack(); // Redirige a la pantalla de productos
    };

    // Si el carrito está vacío
    if (cartItems.length === 0) {
        return (
            <div className="carrito-body">
                <div className="login-header">
                    <div className="login-logo">
                        <span role="img" aria-label="Game Controller"> 🎮 </span>
                        LEVEL-UP-GAMER
                    </div>
                    <a onClick={onBack} className="primary-button nav-btn">
                        ← Volver a Productos
                    </a>
                </div>
                {/* Nota: Dejamos el maxWidth aquí por ser un estilo de layout específico del main-card en esta vista */}
                <div className="main-card" style={{maxWidth: '600px', margin: '50px auto'}}>
                    <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Tu Carrito de Compras</h2>
                    <div className="text-center" style={{padding: '50px 0'}}>
                        <span role="img" aria-label="Empty Cart" style={{fontSize: '3rem'}}> 🛒 </span>
                        <p style={{color: '#aaa', marginTop: '20px', fontSize: '1.2rem'}}>Tu carrito está vacío. ¡Añade algunos productos!</p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Cálculo de totales si hay productos
    const { subtotal, envio, impuestos, total } = calculateCartTotals(cartItems);


    return (
        <div className="carrito-body">
            {/* Header */}
            <div className="login-header">
                <div className="login-logo">
                    <span role="img" aria-label="Game Controller"> 🎮 </span>
                    LEVEL-UP-GAMER
                </div>
                <a onClick={onBack} className="primary-button nav-btn">
                    ← Volver a Productos
                </a>
            </div>
            
            {/* Contenido Principal */}
            {/* Nota: Dejamos el maxWidth aquí por ser un estilo de layout específico del main-card en esta vista */}
            <div className="main-card" style={{maxWidth: '1000px', margin: '50px auto'}}>
                <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Tu Carrito de Compras</h2>
                
                {/* Estructura principal con el CSS Grid: Lista vs Resumen */}
                <div className="cart-main-layout">
                    
                    {/* Columna 1: Lista de Productos */}
                    <div>
                        <div className="cart-header-grid">
                            <div className="cart-header-item">Producto</div>
                            <div className="cart-header-item cart-header-qty">Precio</div>
                            <div className="cart-header-item cart-header-qty">Cantidad</div>
                            <div className="cart-header-item cart-header-total">Total</div>
                            <div className="cart-header-item"></div>
                        </div>
                        
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-row">
                                
                                {/* Producto */}
                                <div className="cart-item-detail">
                                    <span className="cart-item-emoji">{item.emoji}</span>
                                    {item.name}
                                </div>
                                
                                {/* Precio Unitario */}
                                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                
                                {/* Cantidad */}
                                <div className="cart-item-price">
                                    <button onClick={() => handleQtyChange(item.id, -1)} className="qty-button">-</button>
                                    <span className="qty-display">{item.qty}</span>
                                    <button onClick={() => handleQtyChange(item.id, 1)} className="qty-button">+</button>
                                </div>
                                
                                {/* Total por Item */}
                                <div className="cart-item-total">${(item.price * item.qty).toFixed(2)}</div>
                                
                                {/* Botón Eliminar */}
                                <div className="cart-item-price">
                                    <button onClick={() => removeItem(item.id)} className="remove-button">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Columna 2: Resumen de Compra */}
                    <div className="cart-summary-card">
                        <h3 className="cart-summary-title">Resumen del Pedido</h3>
                        
                        <div className="cart-summary-row">
                            <span style={{color: '#aaa'}}>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span style={{color: '#aaa'}}>Envío:</span>
                            <span>${envio.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span style={{color: '#aaa'}}>Impuestos (10%):</span>
                            <span>${impuestos.toFixed(2)}</span>
                        </div>
                        
                        <div className="cart-summary-total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        
                        <button onClick={handleCheckout} className="primary-button checkout-button-full">
                            Pagar y Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carrito;