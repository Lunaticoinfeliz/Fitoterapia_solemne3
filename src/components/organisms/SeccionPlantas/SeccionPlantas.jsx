import { useState, useEffect } from 'react';
import EncabezadoSeccion from '../../atoms/EncabezadoSeccion/EncabezadoSeccion.jsx';
import TarjetaPlanta from '../../molecules/TarjetaPlanta/TarjetaPlanta.jsx';
import Boton from '../../atoms/Boton/Boton.jsx';
import { plantas as plantasIniciales } from '../../../datos/plantas.js';
import './SeccionPlantas.scss';

const PLANTAS_INICIALES = 3; // cuántas mostrar al inicio

function SeccionPlantas() {
  const [plantas, setPlantas] = useState([]);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    const guardadas = localStorage.getItem('adminPlants');
    if (guardadas) {
      setPlantas(JSON.parse(guardadas));
    } else {
      setPlantas(plantasIniciales);
    }
  }, []);

  const plantasVisibles = expandido ? plantas : plantas.slice(0, PLANTAS_INICIALES);
  const hayMas = plantas.length > PLANTAS_INICIALES;

  return (
    <section id="plantas" className="seccion-plantas" aria-labelledby="titulo-plantas">
      <div className="seccion-plantas__contenedor">
        <EncabezadoSeccion
          idSeccion="titulo-plantas"
          titulo="Plantas Terapéuticas Esenciales"
          descripcion="Conoce las plantas medicinales más populares y fáciles de cultivar en tu hogar"
        />
        <div className="seccion-plantas__rejilla">
          {plantasVisibles.map((planta, index) => (
            <TarjetaPlanta
              key={planta.id || index}
              nombre={planta.nombre}
              imagen={planta.imagen}
              beneficios={planta.beneficios}
              usos={planta.usos}
            />
          ))}
        </div>
        {hayMas && (
          <div className="seccion-plantas__acciones">
            <Boton
              tipo="button"
              texto={expandido ? 'Ver menos plantas' : 'Ver más plantas'}
              aria-label={expandido ? 'Mostrar menos plantas' : 'Ver catálogo completo de plantas'}
              onClick={() => setExpandido(!expandido)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default SeccionPlantas;
