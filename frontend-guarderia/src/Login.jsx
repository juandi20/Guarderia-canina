import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
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
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src="/img/logo-inicio.png" alt="Logo" className="logo-img" />
      </div>

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

          <div className="password-container">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            
            <FontAwesomeIcon
              icon={mostrarContrasena ? faEye : faEyeSlash}
              className="eye-icon"
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              title={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
            />  

          </div>

          {error && <p className='login-error'>{error}</p>}
          <button type="submit">Iniciar sesión</button>
        </form>

        <div className="login-links">
          <Link to="/olvide-contrasena">¿Olvidaste tu contraseña?</Link><br />
          <Link to="/registro">Crear cuenta nueva</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;




