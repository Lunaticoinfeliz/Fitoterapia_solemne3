import { useState, useEffect } from 'react';
import EncabezadoSeccion from '../../atoms/EncabezadoSeccion/EncabezadoSeccion.jsx';
import TarjetaEvento from '../../molecules/TarjetaEvento/TarjetaEvento.jsx';
import Boton from '../../atoms/Boton/Boton.jsx';
import { eventos as eventosIniciales } from '../../../datos/eventos.js';
import './SeccionEventos.scss';

const EVENTOS_INICIALES = 1;

function SeccionEventos() {
  const [eventos, setEventos] = useState([]);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    const guardados = localStorage.getItem('adminEvents');
    if (guardados) {
      setEventos(JSON.parse(guardados));
    } else {
      setEventos(eventosIniciales);
    }
  }, []);

  const eventosVisibles = expandido ? eventos : eventos.slice(0, EVENTOS_INICIALES);
  const hayMas = eventos.length > EVENTOS_INICIALES;

  return (
    <section id="eventos" className="seccion-eventos" aria-labelledby="titulo-eventos">
      <div className="seccion-eventos__contenedor">
        <EncabezadoSeccion
          idSeccion="titulo-eventos"
          titulo="Próximos Eventos"
          descripcion="Únete a nuestra comunidad en talleres, cursos y eventos sobre plantas medicinales"
        />
        <div className="seccion-eventos__rejilla">
          {eventosVisibles.map((evento, index) => (
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
        {hayMas && (
          <div className="seccion-eventos__acciones">
            <Boton
              tipo="button"
              texto={expandido ? 'Ver menos eventos' : 'Ver más eventos'}
              aria-label={expandido ? 'Mostrar menos eventos' : 'Ver listado completo de eventos'}
              onClick={() => setExpandido(!expandido)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default SeccionEventos;
