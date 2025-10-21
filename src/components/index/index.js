import React from 'react';
import '../../styles/Styles.css';
import LoginScreen from '../login/LoginScreen.js'; 
import RegistroScreen from '../registro/RegistroScreen.js';

const ProductsScreen = () => {
    
    return (
        
        <div className="app-body">
            
            {/* Header - Ahora más complejo con 3 botones de navegación */}
            <div className="app-header">
                <div className="app-logo">
                    <span role="img" aria-label="Game Controller">🎮</span>
                    LEVEL-UP GAMER
                </div>



                <div className="nav-buttons">
                    {/* Botón Login */}
                    <a href={<LoginScreen />} className="primary-button" style={{padding: '8px 15px', fontSize: '1rem'}}>
                        Login
                    </a>
                    {/* Botón Registro */}
                    <a href="../../registro/RegistroScreen" className="primary-button" style={{padding: '8px 15px', fontSize: '1rem'}}>
                        Registro
                    </a>
                    {/* Botón Gestión Perfiles (Volver usa el estilo secundario azul) */}
                    <a href="/perfiles" className="secondary-button back">
                        Gestión Perfiles
                    </a>
                </div>
            </div>

            {/* Tarjeta de Búsqueda/Filtros */}
            {/* Usamos 'main-card' pero con un ancho específico si fuera necesario, aunque ya está definido en el CSS */}
            <div className="main-card" style={{marginTop: '40px', maxWidth: '700px'}}>
                
                <h2 style={{color: '#fff', marginBottom: '30px', textAlign: 'center'}}>Productos</h2>
                
                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                    
                    {/* Input de Búsqueda */}
                    <div style={{flex: 2}}>
                        <label style={{display: 'block', color: '#fff', marginBottom: '8px'}}>Buscar</label>
                        <input
                            type="text"
                            className="dark-input"
                            placeholder="Buscar productos"
                        />
                    </div>

                    {/* Select de Categoría */}
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', color: '#fff', marginBottom: '8px'}}>Categoría</label>
                        <select className="dark-input">
                            <option>Todas las categorías</option>
                            <option>Accesorios</option>
                            <option>Consolas</option>
                            <option>Juegos</option>
                        </select>
                    </div>

                </div>

                <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px'}}>
                    
                    {/* Botón Buscar */}
                    <button
                        type="button"
                        className="primary-button"
                        style={{flex: 1}}
                    >
                        Buscar
                    </button>

                    {/* Botón Limpiar Filtros */}
                    <button
                        type="button"
                        className="secondary-button"
                        style={{flex: 1, backgroundColor: '#444'}} // Tono más oscuro para "Limpiar filtros"
                    >
                        Limpiar filtros
                    </button>
                    
                </div>
            </div>

            {/* Mensaje de Bienvenida */}
            <div style={{textAlign: 'center', marginTop: '80px'}}>
                <h1 style={{color: '#00c6ff', fontSize: '2.5rem', marginBottom: '10px'}}>
                    BIENVENIDOS A LEVELUPGAMER
                </h1>
                <p style={{color: '#aaa', fontSize: '1.2rem', marginBottom: '5px'}}>
                    Explora un mundo de juegos y accesorios.
                </p>
                <p style={{color: '#aaa', fontSize: '1.2rem'}}>
                    Únete a nuestra comunidad hoy mismo.
                </p>
            </div>
        </div>
    );
}

export default ProductsScreen;