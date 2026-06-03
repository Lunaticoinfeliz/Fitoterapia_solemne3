import { useState, useEffect } from 'react';
import EncabezadoSeccion from '../../atoms/EncabezadoSeccion/EncabezadoSeccion.jsx';
import TarjetaEvento from '../../molecules/TarjetaEvento/TarjetaEvento.jsx';
import Boton from '../../atoms/Boton/Boton.jsx';
import { eventos as eventosIniciales } from '../../../datos/eventos.js';
import './SeccionEventos.scss';

function SeccionEventos() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    const guardados = localStorage.getItem('adminEvents');
    if(guardados) {
      setEventos(JSON.parse(guardados));
    } else {
      setEventos(eventosIniciales);
    }
  }, []);

  return (
    <section id="eventos" className="seccion-eventos" aria-labelledby="titulo-eventos">
      <div className="seccion-eventos__contenedor">
        <EncabezadoSeccion
          idSeccion="titulo-eventos"
          titulo="Próximos Eventos"
          descripcion="Únete a nuestra comunidad en talleres, cursos y eventos sobre plantas medicinales"
        />
        <div className="seccion-eventos__rejilla">
          {eventos.map((evento, index) => (
            <TarjetaEvento
              key={evento.id || index}
              titulo={evento.titulo}
              descripcion={evento.descripcion}
              fecha={evento.fecha}
              hora={evento.hora}
              ubicacion={evento.ubicacion}
              participantes={evento.participantes}
              imagen={evento.imagen}
            />
          ))}
        </div>
        <div className="seccion-eventos__acciones">
          <Boton
            tipo="enlace"
            href="#login"
            texto="Ver más eventos"
            aria-label="Ver listado completo de eventos"
          />
        </div>
      </div>
    </section>
  );
}

export default SeccionEventos;
