import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style-index.css'; // Asegúrate de que la ruta esté bien

function Index() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header" id="inicio">
        <img src="/img/logo-inicio.png" alt="Paraíso Canino" className="logo" />
        <div className="buttons">
          <button className="btn-login" onClick={() => navigate('/login')}>Iniciar Sesión</button>
          <button className="btn-register" onClick={() => navigate('/registro')}>Registrar</button>
        </div>
      </header>

      <nav className="navbar">
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#planes">Servicios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <section className="seccion-bienvenida">
        <div className="overlay">
          <img src="/img/fondo-inicio.jpg" alt="" />
        </div>
        <div className="texto-bienvenida">
          <h1>¡Bienvenido a Paraíso Canino!</h1>
          <p>Un segundo hogar para tu mejor amigo 🐾</p>
        </div>
      </section>

      {/* Sección Nosotros */}
      <section className="seccion-info" id="nosotros">
        <div className="titulo-info">
          <h1>Paraiso Canino: Un Hogar Seguro y Divertido para tu Mascota</h1>
          <p>Conoce un poco de lo que te podemos ofrecer en paraíso canino.</p>
        </div>
        {[1, 2].map((grupo, i) => (
          <div key={i} className={i === 0 ? "contenedor-superior-info" : "contenedor-inferior-info"}>
            {[...Array(3)].map((_, idx) => (
              <div key={idx}>
                <img src="/img/huella.png" alt="Huella" />
                <h2>Huella</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Sección Planes */}
      <section className="contenedor-planes" id="planes">
        {[
          { titulo: '0-5 kg', img1: 'tarifa1.png', img2: 'tarifa1.1.png' },
          { titulo: '5-15 kg', img1: 'tarifa2.png', img2: 'tarifa2.2.png' },
          { titulo: '15-25 kg', img1: 'tarifa3.png', img2: 'tarifa3.3.png' },
          { titulo: '25-35 kg', img1: 'tarifa4.png', img2: 'tarifa4.4.png' },
          { titulo: 'Más de 35 kg', img1: 'tarifa5.png', img2: 'tarifa5.5.png' },
        ].map((plan, idx) => (
          <div key={idx} className={`plan-${idx + 1}`}>
            {idx === 0 && <h1>Nuestras Tarifas</h1>}
            <h3>Tarifa de {plan.titulo}</h3>
            <p>Texto de ejemplo para el plan <img src="/img/huellitas.png" alt="huellas" /></p>
            <div className="cont-imagenes">
              <img src={`/img/${plan.img1}`} alt="" />
              <img src={`/img/${plan.img2}`} alt="" />
              <div className="boton-reserva">
                <button onClick={() => navigate('/login')}>Reserva ya!</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Contacto */}
      <section className="contacto" id="contacto">
        <div className="contenedor-izq">
          <img src="/img/logo-inicio.png" alt="logo" className="logo-paraiso" />
          <div className="info-izq">
            <h2>Contáctanos</h2>
            <p><strong>Dirección:</strong> Calle 8 #4b:10 Pereira, Risaralda</p>
            <p><strong>Teléfono:</strong> 323 433 3333</p>
          </div>
          <div className="redes-sociales">
            <p><strong>Síguenos en:</strong></p>
            <div className="iconos">
              <a href="#"><img src="/img/instagram.png" alt="Instagram" /></a>
              <a href="#"><img src="/img/whatsapp.png" alt="WhatsApp" /></a>
            </div>
          </div>
        </div>
        <div className="contenedor-der">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación"
          ></iframe>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Paraíso Canino.</p>
      </footer>
    </div>
  );
}

export default Index;
