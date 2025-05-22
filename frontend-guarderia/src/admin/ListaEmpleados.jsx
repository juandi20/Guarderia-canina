import { useEffect, useState } from 'react';
import './ListaEmpleados.css';

function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('empleados')) || [];
    setEmpleados(data);
  }, []);

  const eliminarEmpleado = (id) => {
    const nuevosEmpleados = empleados.filter(emp => emp.id !== id);
    localStorage.setItem('empleados', JSON.stringify(nuevosEmpleados));
    setEmpleados(nuevosEmpleados);
  };

  return (
    <div className="contenedor-empleados">
      <h2 className="titulo-empleados">Lista de Empleados</h2>
      {empleados.length === 0 ? (
        <p className="no-empleados">No hay empleados registrados.</p>
      ) : (
        <div className="tarjetas-empleados">
          {empleados.map(emp => (
            <div key={emp.id} className="tarjeta-empleado">
              <h3>{emp.nombre}</h3>
              <p><strong>Documento:</strong> {emp.documento}</p>
              <p><strong>Correo:</strong> {emp.correo_electronico}</p>
              <p><strong>Celular:</strong> {emp.celular}</p>
              <button onClick={() => eliminarEmpleado(emp.id)} className="btn-eliminar">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaEmpleados;





