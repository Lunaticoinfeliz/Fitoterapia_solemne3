import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EncabezadoSeccion from '../../atoms/EncabezadoSeccion/EncabezadoSeccion.jsx';
import TarjetaPlanta from '../../molecules/TarjetaPlanta/TarjetaPlanta.jsx';
import Boton from '../../atoms/Boton/Boton.jsx';
import { plantas as plantasIniciales } from '../../../datos/plantas.js';
import './SeccionPlantas.scss';

const PLANTAS_INICIALES = 3;

function SeccionPlantas() {
  const [plantas, setPlantas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/plantas/?solo_activas=true')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la petición');
        return res.json();
      })
      .then((data) => setPlantas(data))
      .catch((err) => {
        console.error('Error al obtener plantas de la API, usando respaldo:', err);
        const guardadas = localStorage.getItem('adminPlants');
        if (guardadas) {
          setPlantas(JSON.parse(guardadas));
        } else {
          setPlantas(plantasIniciales);
        }
      });
  }, []);

  const plantasVisibles = plantas.slice(0, PLANTAS_INICIALES);
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
              nombre={planta.nombre_comun || planta.nombre}
              imagen={planta.imagen_url || planta.imagen}
              beneficios={planta.propiedades_usos || planta.beneficios}
              usos={planta.posologia || planta.usos}
            />
          ))}
        </div>
        {hayMas && (
          <div className="seccion-plantas__acciones">
            <Boton
              tipo="button"
              texto="Ver catálogo completo"
              aria-label="Ver catálogo completo de plantas"
              onClick={() => navigate('/plantas')}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default SeccionPlantas;
