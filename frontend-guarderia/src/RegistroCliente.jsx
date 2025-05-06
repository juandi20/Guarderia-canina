import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistroCliente.css'; 


function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    documento: '',
    ciudad: '',
    direccion: '',
    celular: '',
    correo_electronico: '',
    contrasena_hash: '',
    confirmar_contrasena: '',  // Agregar este campo
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación de contraseñas
    if (form.contrasena_hash !== form.confirmar_contrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Excluir el campo confirmar_contrasena antes de enviarlo
      const { confirmar_contrasena, ...dataToSend } = form;
      await axios.post('http://localhost:8000/api/registro-cliente/', dataToSend);
      navigate('/'); // Redirige al login tras registrarse
    } catch (err) {
      console.error(err);
      setError('Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Registro de Cliente</h2>
      <form className="form" onSubmit={handleSubmit} >
        <input className="input" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input className="input" name="documento" placeholder="Documento" value={form.documento} onChange={handleChange} required />
        <input className="input" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
        <input className="input" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <input className="input" name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} required />
        <input className="input" name="correo_electronico" placeholder="Correo electrónico" value={form.correo_electronico} onChange={handleChange} required />
        <input className="input" type="password" name="contrasena_hash" placeholder="Contraseña" value={form.contrasena_hash} onChange={handleChange} required />
        <input className="input" type="password" name="confirmar_contrasena" placeholder="Confirmar Contraseña" value={form.confirmar_contrasena} onChange={handleChange} required />
        
        {/* Mostrar mensaje de error si las contraseñas no coinciden */}
        {error && <p className="message" style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit" className="button">Registrar</button>
      </form>
    </div>
  );
}

export default Registro;
