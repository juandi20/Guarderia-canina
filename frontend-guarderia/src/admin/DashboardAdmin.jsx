import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';
import ListaEmpleados from './ListaEmpleados';
import CrearEmpleado from './CrearEmpleado';
import './DashboardAdmin.css';

function DashboardAdmin() {
  const [vista, setVista] = useState('dashboard');

  const renderVista = () => {
    switch (vista) {
      case 'empleados':
        return <ListaEmpleados />;
      case 'crear':
        return <CrearEmpleado />;
      default:
        return <h1 className="welcome-text">Bienvenido al Panel de Administrador</h1>;
    }
  };

  return (
    <div className="dashboard-container">
      <SidebarAdmin setVista={setVista} />
      <main className="dashboard-main">
        {renderVista()}
      </main>
    </div>
  );
}

export default DashboardAdmin;







