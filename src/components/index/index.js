import React, { useState } from 'react';
import '../../styles/Styles.css';
import LoginScreen from '../login/LoginScreen.js'; 
import RegistroScreen from '../registro/RegistroScreen.js';
import GestionDePerfiles from '../perfiles/GestionDePerfiles.js'; 
import Carrito from '../carrito/Carrito.js'; 
import ListaProductos from '../productos/ListaProductos.js'; 

// Función auxiliar para verificar si hay un usuario logueado
const getActiveUserEmail = () => {
    return localStorage.getItem('activeUserEmail');
};

const ProductsScreen = () => {
    // 1. ESTADOS PRINCIPALES
    const [currentScreen, setCurrentScreen] = useState('products');
    const [cartItems, setCartItems] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filterCategory, setFilterCategory] = useState('Todas'); 
    // Usamos el estado 'isLoggedIn' para forzar la re-renderización del header
    const [isLoggedIn, setIsLoggedIn] = useState(!!getActiveUserEmail());
    
    // Función para cambiar el estado y navegar
    const navigateTo = (screenName) => {
        setCurrentScreen(screenName);
    };
    
    // Función de LOGIN/LOGOUT que actualiza el estado de la sesión
    const handleLogin = (screenName) => {
        // Después de la navegación, actualiza el estado para reflejar la sesión
        setCurrentScreen(screenName);
        // Usamos un pequeño timeout para dar tiempo a la función de login en LoginScreen.js
        setTimeout(() => {
             setIsLoggedIn(!!getActiveUserEmail());
        }, 100);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('activeUserEmail');
        setIsLoggedIn(false);
        alert('Sesión cerrada correctamente.');
        navigateTo('products'); // Vuelve a la pantalla principal
    };
    
    // LÓGICA DE AÑADIR AL CARRITO
    const addToCart = (productToAdd) => {
        const exists = cartItems.find(item => item.id === productToAdd.id);

        if (exists) {
            setCartItems(
                cartItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...exists, qty: exists.qty + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...productToAdd, qty: 1 }]);
        }
        
        alert(`¡${productToAdd.name} añadido al carrito!`);
    };
    
    // --- Datos de Productos de Ejemplo ---
    const products = [
        { id: 1, name: 'Consola Retro', price: 299.99, description: 'Una consola clásica con cientos de juegos.', emoji: ' 🕹️ ', category: 'Consolas' },
        { id: 2, name: 'Silla Gamer RGB', price: 450.00, description: 'Máximo confort para largas sesiones de juego.', emoji: ' 💺 ', category: 'Accesorios' },
        { id: 3, name: 'Teclado Mecánico', price: 120.50, description: 'Teclas rápidas y sensibles para eSports.', emoji: ' ⌨️ ', category: 'Accesorios' },
        { id: 4, name: 'Mouse Inalámbrico', price: 55.99, description: 'Precisión y velocidad para el gamer competitivo.', emoji: ' 🖱️ ', category: 'Accesorios' },
        { id: 5, name: 'Monitor Curvo 4K', price: 799.00, description: 'Inmersión total con la mejor resolución.', emoji: ' 🖥️ ', category: 'Monitores' },
        { id: 6, name: 'Juego Nuevo AAA', price: 69.99, description: 'El lanzamiento más esperado del año.', emoji: ' 💿 ', category: 'Juegos' },
        { id: 7, name: 'Auriculares Noise Cancelling', price: 150.00, description: 'Aísla el ruido y céntrate en la partida.', emoji: ' 🎧 ', category: 'Accesorios' },
    ];
    
    // LÓGICA DE FILTRADO Y BÚSQUEDA
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = filterCategory === 'Todas' || product.category === filterCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

    // Lógica para renderizar la pantalla correcta
    const renderScreen = () => {
        switch (currentScreen) {
            // Usar handleLogin en lugar de navigateTo para estas pantallas
            case 'login':
                return <LoginScreen onBack={() => handleLogin('products')} />;
            case 'register':
                return <RegistroScreen onBack={() => handleLogin('products')} />;
                
            case 'profile':
                return <GestionDePerfiles onBack={() => navigateTo('products')} />;
            case 'cart':
                return <Carrito 
                            onBack={() => navigateTo('products')} 
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                        />;
            case 'products':
            default:
                // LAYOUT DE PRODUCTOS
                return (
                    <div>
                        {/* HEADER PRINCIPAL */}
                        <div className="app-header">
                            <div className="app-logo">
                                <span role="img" aria-label="Game Controller"> 🎮 </span>
                                LEVEL-UP-GAMER
                            </div>
                            
                            {/* BOTONES DE NAVEGACIÓN (RENDERIZADO CONDICIONAL) */}
                            <div className="nav-buttons">
                                
                                <a onClick={() => navigateTo('cart')} className="primary-button nav-btn">
                                    🛒 Carrito ({totalCartItems})
                                </a>

                                {/* Si el usuario NO está logueado, muestra Login y Registro */}
                                {!isLoggedIn && (
                                    <>
                                        <a onClick={() => navigateTo('login')} className="primary-button nav-btn">
                                            Login
                                        </a>
                                        <a onClick={() => navigateTo('register')} className="primary-button nav-btn">
                                            Registro
                                        </a>
                                    </>
                                )}
                                
                                {/* Si el usuario SÍ está logueado, muestra Perfiles y Logout */}
                                {isLoggedIn && (
                                    <>
                                        <a onClick={() => navigateTo('profile')} className="primary-button nav-btn">
                                            Mi Perfil
                                        </a>
                                        <a onClick={handleLogout} className="primary-button nav-btn" style={{background: '#dc3545'}}>
                                            Cerrar Sesión
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* FILTROS Y BUSCADOR */}
                        <div className={`main-card filters-container`}>
                            <div className="filter-row">
                                {/* Buscador */}
                                <div className="filter-input-search">
                                    <label className="filter-label">Buscar Producto</label>
                                    <input 
                                        type="text" 
                                        className="dark-input" 
                                        placeholder="Buscar por nombre o descripción..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                {/* Filtro por Categoría */}
                                <div className="filter-input-category">
                                    <label className="filter-label">Categoría</label>
                                    <select 
                                        className="dark-input"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                    >
                                        <option>Todas</option>
                                        <option>Accesorios</option>
                                        <option>Consolas</option>
                                        <option>Juegos</option>
                                        <option>Monitores</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        {/* LISTA DE PRODUCTOS */}
                        <ListaProductos 
                            products={filteredProducts} 
                            addToCart={addToCart} 
                        />
                    </div>
                );
        }
    };

    return <div className="app-body">{renderScreen()}</div>;
};

export default ProductsScreen;