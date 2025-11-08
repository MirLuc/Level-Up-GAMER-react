import React, { useState, useEffect } from 'react';
import '../../styles/Styles.css';

// Función auxiliar para buscar y cargar el usuario
const getActiveUser = () => {
    const activeEmail = localStorage.getItem('activeUserEmail');
    if (!activeEmail) return null;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.email.toLowerCase() === activeEmail.toLowerCase());
};

const GestionDePerfiles = ({ onBack }) => {
    const [user, setUser] = useState(null); 
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState(''); 
    const [address, setAddress] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // Cargar datos del usuario activo al iniciar
    useEffect(() => {
        const loadedUser = getActiveUser();
        
        if (loadedUser) {
            setUser(loadedUser);
            setName(loadedUser.name || '');
            setBirthDate(loadedUser.birthDate || '');
            setGender(loadedUser.gender || 'No especificado');
            setAddress(loadedUser.address || '');
        }
        setLoading(false);
    }, []);

    //  FUNCIÓN DE VALIDACIÓN 
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!name.trim()) {
            tempErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // GUARDAR PERFIL
    const handleSave = (e) => {
        e.preventDefault();

        if (validate() && user) {
            const updatedUser = {
                ...user,
                name: name.trim(),
                birthDate: birthDate,
                gender: gender,
                address: address,
            };

            //Actualizar la lista completa de usuarios en localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.email === user.email);

            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                
                setUser(updatedUser);
                alert('¡Perfil actualizado con éxito!');
            } else {
                alert('Error: No se encontró el usuario para actualizar.');
            }
        }
    };
    
    if (loading) {
        return <div className="app-body"><p className="text-center" style={{color: '#00c6ff', fontSize: '1.5rem', marginTop: '100px'}}>Cargando perfil...</p></div>;
    }

    // Si no hay usuario activo, redirigir o mostrar mensaje
    if (!user) {
        return (
            <div className="perfiles-body">
                <div className="login-header">
                    <div className="login-logo">🎮 LEVEL-UP-GAMER</div>
                    <a onClick={onBack} className="primary-button nav-btn">← Volver</a>
                </div>
                <div className="main-card" style={{maxWidth: '600px'}}>
                    <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Gestión de Perfiles</h2>
                    <p className="text-center error-text" style={{fontSize: '1.2rem', padding: '30px'}}>
                        Debes iniciar sesión para gestionar tu perfil.
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="perfiles-body">
            {/* Header */}
            <div className="login-header"> 
                <div className="login-logo">
                    <span role="img" aria-label="Game Controller"> 🎮 </span>
                    LEVEL-UP GAMER
                </div>
                {/* Botón Volver */}
                <a onClick={onBack} className="primary-button nav-btn">
                    ← Volver
                </a>
            </div>
            
            {/* Tarjeta de Gestión */}
            <div className="main-card" style={{maxWidth: '800px', margin: '50px auto'}}>
                <h2 className="text-center" style={{color: '#00c6ff', marginBottom: '30px'}}>
                    Hola, {user.name || 'Usuario'} | Perfil
                </h2>
                
                <form onSubmit={handleSave}>
                    {/* Información de la Cuenta (No Editable aquí) */}
                    <div style={{marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px'}}>
                        <h3 style={{color: '#fff', marginBottom: '15px'}}>Datos de Acceso</h3>
                        <div className="form-group-row">
                             <div>
                                <label className="input-label">Email de Cuenta</label>
                                <input type="email" className="dark-input" value={user.email} disabled />
                            </div>
                             <div>
                                <label className="input-label">Contraseña</label>
                                <input type="password" className="dark-input" value="********" disabled />
                            </div>
                        </div>
                    </div>

                    {/* Información Personal (Editable) */}
                    <h3 style={{color: '#fff', marginBottom: '20px'}}>Información Personal</h3>
                    <div className="form-group-row">
                        
                        {/* Campo Nombre */}
                        <div>
                            <label className="input-label">Nombre de Usuario</label>
                            <input 
                                type="text" 
                                className={`dark-input ${errors.name ? 'input-error' : ''}`}
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        
                        {/* Campo Fecha Nacimiento */}
                        <div>
                            <label className="input-label">Fecha Nacimiento</label>
                            <input 
                                type="date" 
                                className="dark-input" 
                                value={birthDate} 
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group-row">
                         {/* Campo  Género */}
                        <div>
                            <label className="input-label">Género</label>
                            <select 
                                className="dark-input"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="No especificado">No especificado</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        
                        {/* Campo Dirección */}
                        <div>
                            <label className="input-label">Dirección</label>
                            <input 
                                type="text" 
                                className="dark-input" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Ingresa tu dirección completa" 
                            />
                        </div>
                    </div>

                    <div className="text-center" style={{marginTop: '40px'}}>
                        <button type="submit" className="primary-button">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GestionDePerfiles;