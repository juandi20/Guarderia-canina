import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistroCliente.css';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    ciudad: '',
    direccion: '',
    celular: '',
    correo_electronico: '',
    contrasena_hash: '',
    confirmar_contrasena: '', // Agregado para validación
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
  
    if (formData.contrasena_hash !== formData.confirmar_contrasena) {
      setError('Error: Las contraseñas no coinciden');
      return;
    }
  
    try {
      const { confirmar_contrasena, ...rest } = formData;
      const dataToSend = {
        ...rest,
        documento: parseInt(formData.documento),  // 👈 convertir a número
      };
      
      await axios.post('http://localhost:8000/api/registro-cliente/', formData);
      setMensaje('Cliente registrado exitosamente');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err.response?.data); // 👈 esto mostrará qué campo falló
      setError('Error al registrar. Intenta nuevamente.');
    }
  };  

  return (
    <div className="pageWrapper">
      <div className="container">
        <h2 className="title">Registrar Cliente</h2>
        <form onSubmit={handleSubmit} className="form">
          <input className="input" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input className="input" name="documento" placeholder="Documento" value={formData.documento} onChange={handleChange} required />
          <input className="input" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
          <input className="input" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
          <input className="input" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required />
          <input className="input" name="correo_electronico" placeholder="Correo electrónico" value={formData.correo_electronico} onChange={handleChange} required />
          <input className="input" type="password" name="contrasena_hash" placeholder="Contraseña" value={formData.contrasena_hash} onChange={handleChange} required />
          <input className="input" type="password" name="confirmar_contrasena" placeholder="Confirmar Contraseña" value={formData.confirmar_contrasena} onChange={handleChange} required />
          <button type="submit" className="button">Registrar</button>
        </form>

        {error && <p className="message error">{error}</p>}
        {mensaje && <p className="message success">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Registro;
