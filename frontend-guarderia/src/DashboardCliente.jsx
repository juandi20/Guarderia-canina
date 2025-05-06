// src/DashboardCliente.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardCliente({ cliente, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    if (onLogout) onLogout();  // Limpia el estado del cliente en App
    navigate('/');
  };

  if (!cliente) return <p>No has iniciado sesión.</p>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido a Guardería Canina</h1>
      <p><strong>Nombre:</strong> {cliente.nombre}</p>
      <p><strong>Correo:</strong> {cliente.correo_electronico}</p>
      <p><strong>Dirección:</strong> {cliente.direccion}</p>
      <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
      
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default DashboardCliente;
