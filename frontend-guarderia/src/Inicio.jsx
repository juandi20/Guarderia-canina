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
          <img src="/img/fondo-inicio.jpg" alt="Fondo de bienvenida a Paraíso Canino" />
        </div>
        <div className="texto-bienvenida">
          <h1>¡Bienvenido a Paraíso Canino!</h1>
          <p>Un segundo hogar para tu mejor amigo 🐾</p>
        </div>
      </section>

   
      {/* SECCIÓN NOSOTROS - CON DATOS DEFINIDOS*/}
      
      {(function() { 
        //Datos para las secciones
        const serviciosNosotrosData = [
          {
            id: 'nosotros-juegos',
            imgSrc: '/img/huella.png',
            titulo: 'Juegos Supervisados',
            texto: 'Amplias zonas seguras donde tu perro socializa y juega bajo nuestra atenta mirada profesional y cariñosa.'
          },
          {
            id: 'nosotros-descanso',
            imgSrc: '/img/huella.png',
            titulo: 'Zonas de Descanso',
            texto: 'Contamos con los espacios mas comodos, tranquilos , limpios y seguros para tu mascota, permtiendo sueños reparadores para despues despertar con energia.'
          },
          {
            id: 'nosotros-cuidado',
            imgSrc: '/img/huella.png',
            titulo: 'Cuidado Profesional',
            texto: 'Personal amante de los perros,capacitado para brindar atención y cariño que cada mascota necesita, velando por su bienestar.'
          },
          {
            id: 'nosotros-higiene',
            imgSrc: '/img/huella.png',
            titulo: 'Higiene Constante',
            texto: 'Mantenemos nuestras instalaciones impecablemente limpias y desinfectadas para la salud y seguridad de todos.'
          },
          {
            id: 'nosotros-vacunacion',
            imgSrc: '/img/huella.png',
            titulo: 'Carnet vacunas',
            texto: 'Todos nuestros huéspedes deben presentar su carnet de vacunación al momento de registrarse para su estadía.'
          },
          {
            id: 'nosotros-alimentacion',
            imgSrc: '/img/huella.png',
            titulo: 'Horarios de Comida',
            texto: 'Respetamos las rutinas. Puedes traer su comida y nos aseguraremos de seguir sus horarios específicos.'
          }
        ];

        // Dividimos los datos en dos grupos para las dos filas
        const filaSuperiorNosotros = serviciosNosotrosData.slice(0, 3);
        const filaInferiorNosotros = serviciosNosotrosData.slice(3, 6);

        // Retornamos el JSX de la sección
        return (
          <section className="seccion-info" id="nosotros">
            <div className="titulo-info">
              <h1>Paraiso Canino: Un Hogar Seguro y Divertido para tu Mascota</h1>
              <p>Conoce un poco de lo que te podemos ofrecer en paraíso canino.</p>
            </div>

            <div className="contenedor-superior-info">
              {filaSuperiorNosotros.map((servicio) => (
                <div key={servicio.id} className="item-servicio-nosotros">
                  <img src={servicio.imgSrc} alt={servicio.titulo} />
                  <h2>{servicio.titulo}</h2>
                  <p>{servicio.texto}</p>
                </div>
              ))}
            </div>

            <div className="contenedor-inferior-info">
              {filaInferiorNosotros.map((servicio) => (
                <div key={servicio.id} className="item-servicio-nosotros">
                  <img src={servicio.imgSrc} alt={servicio.titulo} />
                  <h2>{servicio.titulo}</h2>
                  <p>{servicio.texto}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })()}
   
      {/* FIN DE LA SECCIÓN NOSOTROS*/}
     


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
              <img src={`/img/${plan.img1}`} alt={`Tarifa ${plan.titulo} imagen 1`} />
              <img src={`/img/${plan.img2}`} alt={`Tarifa ${plan.titulo} imagen 2`} />
              <div className="boton-reserva">
                <button onClick={() => navigate('/login')}>Reserva ya!</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/*seccion contacto*/}
      <section className="contacto" id="contacto">
        <div className="contenedor-izq">
          <img src="/img/logo-inicio.png" alt="logo paraiso canino" className="logo-paraiso" />
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.160480781141!2d-75.6981786857378!3d4.81508294205706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38874b76a96107%3A0x73538535b02fc06a!2sCl.%208%20%234b-10%2C%20Pereira%2C%20Risaralda!5e0!3m2!1ses-419!2sco!4v1670000000000!5m2!1ses-419!2sco" // Ejemplo de URL, reemplaza con tu mapa real
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Paraíso Canino"
          ></iframe>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Paraíso Canino. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Index;
