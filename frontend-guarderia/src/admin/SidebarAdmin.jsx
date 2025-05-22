import React from 'react';
import './DashboardAdmin.css';
import { useNavigate } from 'react-router-dom';

function SidebarAdmin({ setVista }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin</h2>

      <button className="sidebar-button" onClick={() => setVista('dashboard')}>Inicio</button>
      <button className="sidebar-button" onClick={() => setVista('')}>Perfil</button>
      <button className="sidebar-button" onClick={() => setVista('empleados')}>Lista de empleados</button>
      <button className="sidebar-button" onClick={() => setVista('crear')}>Crear empleado</button>
      <button className="sidebar-button logout-button" onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}

export default SidebarAdmin;




