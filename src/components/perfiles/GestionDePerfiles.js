import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/authService'; // Importar funciones del API
import { useNavigate } from 'react-router-dom'; 
import '../../styles/Styles.css';


const GENDERS = ['Masculino', 'Femenino', 'Otro', 'No especificado'];

// Función auxiliar para obtener el usuario activo
const getActiveUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const GestionDePerfiles = ({ onBack }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        birthDate: '', 
        gender: 'No especificado',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Cargar datos del perfil al iniciar el componente
    useEffect(() => {
        const user = getActiveUser();
        
        if (!user || !user.email) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                // LLAMADA AL BACKEND: GET /api/auth/profile/:email
                const res = await getProfile(user.email); 
                
                setProfileData({
                    name: res.user.name || '',
                    email: res.user.email || '',
                    birthDate: res.user.birthDate || '', // Formato YYYY-MM-DD
                    gender: res.user.gender || 'No especificado',
                    address: res.user.address || ''
                });
                setMessage('Perfil cargado.');
            } catch (err) {
                console.error("Error al cargar perfil:", err);
                setError(err.message || 'Error al cargar el perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // Maneja los cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({ ...prevData, [name]: value }));
    };

    // GUARDAR PERFIL (Llama a la API)
    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!profileData.email) {
            setError('Error: El email no está disponible para actualizar.');
            return;
        }

        // Datos a enviar (el backend espera name, birthDate, gender, address)
        const dataToUpdate = {
            name: profileData.name.trim(),
            birthDate: profileData.birthDate,
            gender: profileData.gender,
            address: profileData.address,
        };
        
        try {
            // LLAMADA AL BACKEND: PATCH /api/auth/profile/:email
            const response = await updateProfile(profileData.email, dataToUpdate); 
            
            setMessage(response.message || 'Perfil actualizado con éxito.');
            
            // Si el backend es exitoso, actualizamos el localStorage con el nuevo nombre
            const currentUser = getActiveUser();
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify({
                    ...currentUser,
                    name: response.user.name 
                }));
            }
            
            setProfileData(response.user); // Actualizar estado con datos del servidor
            

        } catch (err) {
            const errorMessage = err.message || err.response?.data?.message || 'Error desconocido al actualizar.';
            setError(errorMessage);
            console.error('Error en la actualización:', err);
        }
    };
    
    // REDIRECCIÓN si no hay usuario logueado o error de carga
    if (!getActiveUser() && !loading) {
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

    if (loading) {
         return <div className="app-body"><p className="text-center" style={{color: '#00c6ff', fontSize: '1.5rem', marginTop: '100px'}}>Cargando perfil...</p></div>;
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
                    Hola, {profileData.name || 'Usuario'} | Perfil
                </h2>
                
                <form onSubmit={handleSave}>
                    {/* Mensajes */}
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Información de la Cuenta (No Editable aquí) */}
                    <div style={{marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px'}}>
                        <h3 style={{color: '#fff', marginBottom: '15px'}}>Datos de Acceso</h3>
                        <div className="form-group-row">
                             <div>
                                <label className="input-label">Email de Cuenta</label>
                                <input type="email" className="dark-input" value={profileData.email} disabled />
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
                                className={`dark-input ${error && error.includes('nombre') ? 'input-error' : ''}`}
                                name="name"
                                value={profileData.name} 
                                onChange={handleInputChange}
                            />
                            {error && error.includes('nombre') && <p className="error-text">{error}</p>}
                        </div>
                        
                        {/* Campo Fecha Nacimiento */}
                        <div>
                            <label className="input-label">Fecha Nacimiento</label>
                            <input 
                                type="date" 
                                className="dark-input" 
                                name="birthDate"
                                value={profileData.birthDate} 
                                onChange={handleInputChange}
                            />
                            {error && error.includes('años') && <p className="error-text">{error}</p>}
                        </div>
                    </div>
                    
                    <div className="form-group-row">
                         {/* Campo  Género */}
                        <div>
                            <label className="input-label">Género</label>
                            <select 
                                className="dark-input"
                                name="gender"
                                value={profileData.gender}
                                onChange={handleInputChange}
                            >
                                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        
                        {/* Campo Dirección */}
                        <div>
                            <label className="input-label">Dirección</label>
                            <input 
                                type="text" 
                                className="dark-input" 
                                name="address"
                                value={profileData.address || ''}
                                onChange={handleInputChange}
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