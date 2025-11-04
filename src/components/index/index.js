import React, { useState } from 'react';
import '../../styles/Styles.css';
import LoginScreen from '../login/LoginScreen.js';
import RegistroScreen from '../registro/RegistroScreen.js';

const ProductsScreen = () => {
  // Estado para controlar la pantalla actual. 'products' es la inicial.
  const [currentScreen, setCurrentScreen] = useState('products');

  // Función para cambiar el estado y navegar a otra pantalla.
  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
  };

  // --- Renderizado Condicional ---
  
  // 1. Si el estado es 'login', muestra LoginScreen y le pasa la función para volver.
  if (currentScreen === 'login') {
    return <LoginScreen onBack={() => navigateTo('products')} />;
  }
  
  // 2. Si el estado es 'registro', muestra RegistroScreen y le pasa la función para volver.
  if (currentScreen === 'registro') {
    return <RegistroScreen onBack={() => navigateTo('products')} />;
  }

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
          {/* Botón Login - Usa onClick para cambiar el estado */}
          <a 
            onClick={() => navigateTo('login')} 
            className="primary-button" 
            style={{padding: '8px 15px', fontSize: '1rem', cursor: 'pointer'}}
          >
            Login
          </a>
          {/* Botón Registro - Usa onClick para cambiar el estado */}
          <a 
            onClick={() => navigateTo('registro')} 
            className="primary-button" 
            style={{padding: '8px 15px', fontSize: '1rem', cursor: 'pointer'}}
          >
            Registro
          </a>
          {/* Botón Gestión Perfiles */}
          <a href="/perfiles" className="secondary-button back">
            Gestión Perfiles
          </a>
        </div>
      </div>
      {/* Tarjeta de Búsqueda/Filtros */}
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
              <option>Juegos de mesa</option>
              <option>Sillas Gamer</option>
              <option>Computadores</option>
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
// Renombra el componente exportado si tu archivo se llama index.js pero contiene ProductsScreen
export default ProductsScreen;
