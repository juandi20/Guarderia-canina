import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardEmpleado() {
  const [empleado, setEmpleado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      const userData = JSON.parse(datos);
      if (userData.rol === 'empleado') {
        setEmpleado(userData);
      } else {
        navigate('/login'); // Evitar acceso de clientes u otros
      }
    } else {
      navigate('/login'); // No hay sesión activa
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  if (!empleado) return <p>Cargando...</p>;

  return (
    <div className="dashboard-empleado">
      <h2>Bienvenido, {empleado.nombre}</h2>
      <p><strong>Correo:</strong> {empleado.correo_electronico}</p>
      <p><strong>Celular:</strong> {empleado.celular}</p>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default DashboardEmpleado;
