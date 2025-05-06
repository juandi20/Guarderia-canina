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
      const response = await axios.post('http://localhost:8000/api/login-cliente/', {
        correo_electronico: correo,
        contrasena: contrasena
      });

      localStorage.setItem('cliente', JSON.stringify(response.data));
      if (onLoginSuccess) onLoginSuccess(response.data);

      navigate('/dashboard-cliente');
    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión Cliente</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
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
  );
}

export default Login;
