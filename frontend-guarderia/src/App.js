// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import DashboardCliente from './DashboardCliente';
import Registro from './RegistroCliente'; 
import OlvideContrasena from './OlvideContrasena'; 
import DashboardEmpleado from './DashboardEmpleado';

function App() {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const storedCliente = localStorage.getItem('cliente');
    if (storedCliente) {
      setCliente(JSON.parse(storedCliente));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login onLoginSuccess={setCliente} />} />
        <Route path="/dashboard-cliente" element={<DashboardCliente cliente={cliente} onLogout={() => setCliente(null)} />} />
        <Route path="/dashboard" element={<DashboardCliente cliente={cliente} onLogout={() => setCliente(null)} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/olvide-contrasena" element={<OlvideContrasena />} />
        <Route path="/dashboard-empleado" element={<DashboardEmpleado />} />
      </Routes>
    </Router>
  );
}

export default App;

        

