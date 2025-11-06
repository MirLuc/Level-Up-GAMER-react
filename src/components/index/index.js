import React, { useState } from 'react';
import '../../styles/Styles.css'; // Correcto: Sube a 'components', luego entra a 'styles'
import LoginScreen from '../login/LoginScreen.js'; 
import RegistroScreen from '../registro/RegistroScreen.js';
import GestionDePerfiles from '../perfiles/GestionDePerfiles.js'; 
import Carrito from '../carrito/Carrito.js'; 
import ListaProductos from '../productos/ListaProductos.js'; // Correcto: Apunta a la carpeta 'productos'

const ProductsScreen = () => {
  // Estado para controlar la pantalla actual.
  const [currentScreen, setCurrentScreen] = useState('products');

  // Función para cambiar el estado y navegar a otra pantalla.
  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
  };
    
  // --- Datos de Productos de Ejemplo ---
  const products = [
      { id: 1, name: 'Consola Retro', price: 299.99, description: 'Una consola clásica con cientos de juegos.', emoji: '🕹️' },
      { id: 2, name: 'Silla Gamer RGB', price: 450.00, description: 'Máximo confort para largas sesiones de juego.', emoji: '💺' },
      { id: 3, name: 'Teclado Mecánico', price: 120.50, description: 'Teclas rápidas y sensibles para eSports.', emoji: '⌨️' },
      { id: 4, name: 'Mouse Inalámbrico', price: 75.99, description: 'Precisión y batería de larga duración.', emoji: '🖱️' },
      { id: 5, name: 'Auriculares 7.1', price: 95.00, description: 'Sonido envolvente para una inmersión total.', emoji: '🎧' },
      { id: 6, name: 'Monitor 144Hz', price: 350.00, description: 'Velocidad y respuesta para el juego competitivo.', emoji: '🖥️' },
  ];

  // --- Renderizado Condicional ---
  
  if (currentScreen === 'login') {
    return <LoginScreen onBack={() => navigateTo('products')} />;
  }
  
  if (currentScreen === 'registro') {
    return <RegistroScreen onBack={() => navigateTo('products')} />;
  }

  if (currentScreen === 'perfiles') {
    return <GestionDePerfiles onBack={() => navigateTo('products')} />;
  }
  
  if (currentScreen === 'carrito') {
    return <Carrito onBack={() => navigateTo('products')} />;
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
          {/* Botón Login */}
          <a onClick={() => navigateTo('login')} className="primary-button" style={{padding: '8px 15px', fontSize: '1rem', cursor: 'pointer'}}>
            Login
          </a>
          {/* Botón Registro */}
          <a onClick={() => navigateTo('registro')} className="primary-button" style={{padding: '8px 15px', fontSize: '1rem', cursor: 'pointer'}}>
            Registro
          </a>
          {/* Botón Gestión Perfiles */}
          <a onClick={() => navigateTo('perfiles')} className="secondary-button back" style={{cursor: 'pointer'}}>
            Gestión Perfiles
          </a>
          {/* Botón Carrito */}
          <a onClick={() => navigateTo('carrito')} className="primary-button" style={{padding: '8px 15px', fontSize: '1rem', cursor: 'pointer'}}>
            <span role="img" aria-label="Carrito"> 🛒 </span>
          </a>
        </div>
      </div>
      
      {/* Tarjeta de Búsqueda/Filtros */}
      <div className="main-card" style={{marginTop: '40px', maxWidth: '700px', margin: '40px auto 20px'}}>
        <h2 style={{color: '#fff', marginBottom: '30px', textAlign: 'center'}}>Buscar Productos</h2>
        <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
          {/* Input de Búsqueda */}
          <div style={{flex: 2}}>
            <label style={{display: 'block', color: '#fff', marginBottom: '8px'}}>Buscar</label>
            <input type="text" className="dark-input" placeholder="Buscar productos" />
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
          <button type="button" className="primary-button" style={{flex: 1}}>Buscar</button>
          <button type="button" className="secondary-button" style={{flex: 1, backgroundColor: '#444'}}>Limpiar filtros</button>
        </div>
      </div>
      
      {/* --- Listado de Productos --- */}
      <ListaProductos 
          products={products} 
          navigateToCarrito={() => navigateTo('carrito')} 
      />

      {/* Mensaje de Bienvenida */}
      <div style={{textAlign: 'center', marginTop: '80px', paddingBottom: '50px'}}>
        <h1 style={{color: '#00c6ff', fontSize: '2.5rem', marginBottom: '10px'}}>
          BIENVENIDOS A LEVELUPGAMER
        </h1>
        <p style={{color: '#aaa', fontSize: '1.2rem'}}>
          Únete a nuestra comunidad hoy mismo.
        </p>
      </div>
    </div>
  );
}
export default ProductsScreen;