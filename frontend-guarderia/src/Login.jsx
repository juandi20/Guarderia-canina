import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';  // Asegúrate de que la ruta sea correcta

function Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/login/', {
        correo_electronico: correo,
        contrasena: contrasena
      });

      localStorage.setItem('usuario', JSON.stringify(response.data));
      if (onLoginSuccess) onLoginSuccess(response.data);

      if (response.data.rol === 'cliente') {
        navigate('/dashboard-cliente');
      } else if (response.data.rol === 'empleado') {
        navigate('/dashboard-empleado');
      }
    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
    }
  };

  const handleLogoClick = () => {
    navigate('/');  // Redirige a la página principal
  };

  return (
    <div className="login-page">
      
      {/* LOGO al lado izquierdo */}
      <div className="logo-section" onClick={handleLogoClick}>
        <img src="/img/logo-inicio.png" alt="Logo" className="logo-img" />
      </div>

      {/* FORMULARIO al lado derecho */}
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
               placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          {error && <p className='login-error'>{error}</p>}
          <button type="submit">Iniciar sesión</button>
        </form>

        <div className="login-links">
          <Link to="/olvide-contrasena">¿Olvidaste tu contraseña?</Link><br />
          <Link to="/registro">¿No tienes cuenta? Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

