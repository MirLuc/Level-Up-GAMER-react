import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Importa los componentes (verifica que las rutas y mayúsculas coincidan con los archivos reales)
import Carrito from '../components/carrito/Carrito';
import Index from '../components/index/index';
import LoginScreen from '../components/login/LoginScreen';
import RegistroScreen from '../components/registro/RegistroScreen';
import GestionDePerfiles from '../components/perfiles/GestionDePerfiles';
import CarritoProductos from '../components/productos/CarritoProductos';
import ListaProductos from '../components/productos/ListaProductos';

// Test mínimo para confirmar que Jest detecta este archivo
test('archivo de test se carga', () => {
  expect(true).toBe(true);
});

// Carrito
describe('Carrito', () => {
  test('renderiza sin errores', () => {
    render(<Carrito />);
  });
});

// Index
describe('Index (pantalla principal)', () => {
  test('renderiza sin errores', () => {
    render(<Index />);
  });
});

// LoginScreen
describe('LoginScreen', () => {
  test('renderiza sin errores', () => {
    render(<LoginScreen />);
  });

  test('muestra errores de validación para email y contraseña vacíos', () => {
    render(<LoginScreen onBack={() => {}} />);
    const submitBtn = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/El email es obligatorio\./i)).toBeInTheDocument();
    expect(screen.getByText(/La contraseña es obligatoria\./i)).toBeInTheDocument();
  });
});

// RegistroScreen
describe('RegistroScreen', () => {
  test('renderiza sin errores', () => {
    render(<RegistroScreen />);
  });

  test('muestra error de +18 si fecha es menor de edad', () => {
    render(<RegistroScreen onBack={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Nombre de Usuario/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'tester@correo.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Fecha Nacimiento/i), { target: { value: '2010-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(screen.getByText(/Debes ser mayor de 18 años para registrarte\./i)).toBeInTheDocument();
  });
});

// GestionDePerfiles
describe('GestionDePerfiles', () => {
  test('renderiza sin errores', () => {
    render(<GestionDePerfiles />);
  });
});

// CarritoProductos
describe('CarritoProductos', () => {
  test('renderiza sin errores', () => {
    render(<CarritoProductos />);
  });

  test('ejecuta callback addToCart al hacer click en "Añadir"', () => {
    const product = { id: 1, name: 'Mouse', price: 25.5, description: 'Gaming mouse', image: '/mouse.png' };
    const addToCart = jest.fn();
    render(<CarritoProductos product={product} addToCart={addToCart} />);
    const button = screen.getByRole('button', { name: /añadir/i });
    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});

// ListaProductos
describe('ListaProductos', () => {
  test('renderiza sin errores', () => {
    render(<ListaProductos />);
  });
});