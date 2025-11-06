import React, { useState } from 'react';
import '../../styles/Styles.css'; 
import LoginScreen from '../login/LoginScreen.js'; 
import RegistroScreen from '../registro/RegistroScreen.js';
import GestionDePerfiles from '../perfiles/GestionDePerfiles.js'; 
import Carrito from '../carrito/Carrito.js'; 
import ListaProductos from '../productos/ListaProductos.js'; 

const ProductsScreen = () => {
    // Estado para controlar la pantalla actual.
    const [currentScreen, setCurrentScreen] = useState('products');
    // Función para cambiar el estado y navegar a otra pantalla.
    const navigateTo = (screenName) => {
        setCurrentScreen(screenName);
    };
        
    // --- Datos de Productos de Ejemplo ---
    const products = [
        { id: 1, name: 'Consola Retro', price: 299.99, description: 'Una consola clásica con cientos de juegos.', emoji: ' 🕹️ ' },
        { id: 2, name: 'Silla Gamer RGB', price: 450.00, description: 'Máximo confort para largas sesiones de juego.', emoji: ' 💺 ' },
        { id: 3, name: 'Teclado Mecánico', price: 120.50, description: 'Teclas rápidas y sensibles para eSports.', emoji: ' ⌨️ ' },
        { id: 4, name: 'Ratón Inalámbrico', price: 75.00, description: 'Precisión y velocidad para tus partidas.', emoji: ' 🖱️ ' },
        { id: 5, name: 'Auriculares 7.1', price: 99.99, description: 'Sumérgete con audio posicional de alta calidad.', emoji: ' 🎧 ' },
        { id: 6, name: 'Monitor 144Hz', price: 350.00, description: 'La fluidez que necesitas para dominar el juego.', emoji: ' 🖥️ ' },
    ];
    
    // --- Renderizado Condicional ---
    const renderScreen = () => {
        switch (currentScreen) {
            case 'login':
                return <LoginScreen onBack={() => navigateTo('products')} />;
            case 'registro':
                return <RegistroScreen onBack={() => navigateTo('products')} />;
            case 'perfiles':
                return <GestionDePerfiles onBack={() => navigateTo('products')} />;
            case 'carrito':
                return <Carrito onBack={() => navigateTo('products')} />;
            case 'products':
            default:
                // --- Renderizado por defecto (Pantalla de Productos) ---
                return (
                    <div className="app-body">
                        {/* Header */}
                        <div className="app-header">
                            <div className="app-logo">
                                <span role="img" aria-label="Game Controller"> 🎮 </span>
                                LEVEL-UP GAMER
                            </div>
                            <div className="nav-buttons">
                                <a onClick={() => navigateTo('login')} className="primary-button nav-btn">Login</a>
                                <a onClick={() => navigateTo('registro')} className="primary-button nav-btn">Registro</a>
                                <a onClick={() => navigateTo('perfiles')} className="primary-button nav-btn">Gestión Perfiles</a>
                                <a onClick={() => navigateTo('carrito')} className="primary-button nav-btn">🛒</a>
                            </div>
                        </div>

                        {/* Tarjeta de Búsqueda/Filtros */}
                        <div className="main-card main-card-filters"> 
                            <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Buscar Productos</h2>
                            <div className="filter-group">
                                {/* Input de Búsqueda */}
                                <div className="filter-input-container">
                                    <label className="input-label">Buscar</label>
                                    <input type="text" className="dark-input" placeholder="Buscar productos" />
                                </div>
                                {/* Select de Categoría */}
                                <div className="filter-input-container-small">
                                    <label className="input-label">Categoría</label>
                                    <select className="dark-input">
                                        <option>Todas las categorías</option>
                                        <option>Accesorios</option>
                                        <option>Consolas</option>
                                        <option>Juegos</option>
                                        <option>Juegos de mesa</option>
                                        <option>Sillas Gamer</option>
                                        <option>Computadores</option>
                                    </select>
                                </div>
                            </div>
                            <div className="filter-buttons">
                                <button type="button" className="primary-button">Buscar</button>
                                <button type="button" className="primary-button">Limpiar filtros</button>
                            </div>
                        </div>

                        {/* --- Listado de Productos --- */}
                        <ListaProductos
                            products={products}
                            navigateToCarrito={() => navigateTo('carrito')}
                        />
                        {/* Mensaje de Bienvenida */}
                        <div className="welcome-message">
                            <h1 className="welcome-title">BIENVENIDOS A LEVELUPGAMER</h1>
                            <p className="welcome-text">Únete a nuestra comunidad hoy mismo.</p>
                        </div>
                    </div>
                );
        }
    };
    
    return renderScreen();
};

export default ProductsScreen;