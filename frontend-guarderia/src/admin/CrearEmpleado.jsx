import React, { useState } from 'react';
import './CrearEmpleado.css';

function CrearEmpleado() {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    celular: '',
    correo_electronico: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      setExito('');
      return;
    }

    // Obtener empleados actuales
    const empleadosActuales = JSON.parse(localStorage.getItem('empleados')) || [];

    // Crear nuevo empleado con ID único
    const nuevoEmpleado = {
      id: Date.now(),
      nombre: formData.nombre,
      documento: formData.documento,
      celular: formData.celular,
      correo_electronico: formData.correo_electronico,
      contrasena: formData.contrasena,
    };

    // Guardar en localStorage
    localStorage.setItem('empleados', JSON.stringify([...empleadosActuales, nuevoEmpleado]));

    setError('');
    setExito('Empleado creado exitosamente');

    setFormData({
      nombre: '',
      documento: '',
      celular: '',
      correo_electronico: '',
      contrasena: '',
      confirmarContrasena: '',
    });
  };

  return (
    <form className="formulario-empleado" onSubmit={handleSubmit}>
      <h2>Crear Empleado</h2>
      <input type="text" name="nombre" placeholder='Nombre' value={formData.nombre} onChange={handleChange} required />
      <input type="text" name="documento" placeholder='Documento' value={formData.documento} onChange={handleChange} required />
      <input type="tel" name="celular" placeholder='Celular' value={formData.celular} onChange={handleChange} required />
      <input type="email" name="correo_electronico" placeholder='Correo electrónico' value={formData.correo_electronico} onChange={handleChange} required />
      <input type="password" name="contrasena" placeholder='Contraseña' value={formData.contrasena} onChange={handleChange} required />
      <input type="password" name="confirmarContrasena" placeholder='Confirmar contraseña' value={formData.confirmarContrasena} onChange={handleChange} required />

      {error && <p className="error-text">{error}</p>}
      {exito && <p className="success-text">{exito}</p>}

      <button type="submit">Crear empleado</button>
    </form>
  );
}

export default CrearEmpleado;








