import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/authService'; // Importar funciones del API
import '../../styles/Styles.css';


const GENDERS = ['Masculino', 'Femenino', 'Otro', 'No especificado'];

// Función auxiliar para obtener el usuario activo
const getActiveUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const GestionDePerfiles = ({ onBack }) => {

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
        const activeUser = getActiveUser();
        if (!activeUser) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const data = await getProfile(activeUser.email);
                if (data && data.user) {
                    setProfileData(data.user);
                }
            } catch (err) {
                console.error('Error al obtener el perfil:', err);
                setError(err.message || 'Error al obtener el perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        const activeUser = getActiveUser();
        if (!activeUser) {
            setError('No hay un usuario activo. Inicia sesión nuevamente.');
            return;
        }

        try {
            const data = await updateProfile(activeUser.email, {
                name: profileData.name,
                birthDate: profileData.birthDate,
                gender: profileData.gender,
                address: profileData.address,
            });

            if (data && data.user) {
                setProfileData(data.user);
            }
            if (data && data.message) {
                setMessage(data.message);
            } else {
                setMessage('Perfil actualizado con éxito.');
            }
        } catch (err) {
            console.error('Error al actualizar el perfil:', err);
            setError(err.message || 'Error al actualizar el perfil.');
        }
    };

    const activeUser = getActiveUser();

    if (!activeUser) {
        return (
            <div className="perfiles-body">
                <div className="main-card" style={{ maxWidth: '450px' }}>
                    <h2 className="text-center" style={{color: '#fff', marginBottom: '30px'}}>Gestión de Perfiles</h2>
                    <p className="text-center error-text" style={{fontSize: '1.2rem', padding: '30px'}}>
                        Debes iniciar sesión para gestionar tu perfil.
                    </p>
                    <div className="text-center">
                        <a onClick={onBack} className="primary-button nav-btn">
                            ← Volver
                        </a>
                    </div>
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
                    <img
                        src="imagenes/leveluplogo.png"
                        alt="Level-Up Gamer"
                        className="logo-img"
                    />
                </div>
                {/* Botón Volver */}
                <a onClick={onBack} className="primary-button nav-btn">
                    ← Volver
                </a>
            </div>

            {/* Tarjeta de Perfiles */}
            <div className="main-card" style={{ maxWidth: '600px' }}>
                <h2 className="text-center" style={{ color: '#fff', marginBottom: '20px' }}>
                    Gestión de Perfiles
                </h2>

                {message && <p className="success-text text-center" style={{ marginBottom: '15px' }}>{message}</p>}
                {error && <p className="error-text text-center" style={{ marginBottom: '15px' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <div className="mb-4">
                        <label className="input-label">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            className="dark-input"
                            value={profileData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email (solo lectura) */}
                    <div className="mb-4">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="dark-input"
                            value={profileData.email}
                            readOnly
                        />
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="mb-4">
                        <label className="input-label">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="birthDate"
                            className="dark-input"
                            value={profileData.birthDate || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Género */}
                    <div className="mb-4">
                        <label className="input-label">Género</label>
                        <select
                            name="gender"
                            className="dark-input"
                            value={profileData.gender || 'No especificado'}
                            onChange={handleChange}
                        >
                            {GENDERS.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    {/* Dirección */}
                    <div className="mb-4">
                        <label className="input-label">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            className="dark-input"
                            value={profileData.address || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text-center mt-4">
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