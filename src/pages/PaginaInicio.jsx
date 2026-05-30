import { useEffect } from 'react';
import BarraNavegacion from '../components/BarraNavegacion/BarraNavegacion.jsx';
import SeccionHero from '../components/organisms/SeccionHero/SeccionHero.jsx';
import SeccionGuiaHuerto from '../components/organisms/SeccionGuiaHuerto/SeccionGuiaHuerto.jsx';
import SeccionPlantas from '../components/organisms/SeccionPlantas/SeccionPlantas.jsx';
import SeccionEventos from '../components/organisms/SeccionEventos/SeccionEventos.jsx';
import SeccionComoEmpezar from '../components/organisms/SeccionComoEmpezar/SeccionComoEmpezar.jsx';
import PiePagina from '../components/organisms/PiePagina/PiePagina.jsx';

function PaginaInicio() {
  useEffect(() => {
    document.title = 'Fitoterapia — Huerto Terapéutico';
  }, []);

  return (
    <div className="layout-principal">
      <BarraNavegacion />
      <main className="layout-principal__contenido" id="contenido-principal">
        <SeccionHero />
        <SeccionGuiaHuerto />
        <SeccionPlantas />
        <SeccionEventos />
        <SeccionComoEmpezar />
      </main>
      <PiePagina />
    </div>
  );
}

export default PaginaInicio;
