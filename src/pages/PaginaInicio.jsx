import { useEffect, useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion/BarraNavegacion.jsx';
import SeccionHero from '../components/organisms/SeccionHero/SeccionHero.jsx';
import SeccionGuiaHuerto from '../components/organisms/SeccionGuiaHuerto/SeccionGuiaHuerto.jsx';
import SeccionPlantas from '../components/organisms/SeccionPlantas/SeccionPlantas.jsx';
import SeccionEventos from '../components/organisms/SeccionEventos/SeccionEventos.jsx';
import SeccionComoEmpezar from '../components/organisms/SeccionComoEmpezar/SeccionComoEmpezar.jsx';
import PiePagina from '../components/organisms/PiePagina/PiePagina.jsx';
import './PaginaInicio.scss';

function PaginaInicio() {
  const [activeTab, setActiveTab] = useState('plantas');

  useEffect(() => {
    document.title = 'Fitoterapia — Huerto Terapéutico';

    const handleHashChange = () => {
      if (window.location.hash === '#eventos') {
        setActiveTab('eventos');
      } else if (window.location.hash === '#plantas') {
        setActiveTab('plantas');
      }
    };

    // Check hash on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="layout-principal">
      <BarraNavegacion />
      <main className="layout-principal__contenido" id="contenido-principal">
        <SeccionHero />
        <SeccionGuiaHuerto />

        {/* Tab switch section to avoid oversaturating the homepage */}
        <section className="seccion-tabs" aria-label="Catálogo y Actividades">
          <div className="seccion-tabs__controles">
            <button
              className={`seccion-tabs__boton ${activeTab === 'plantas' ? 'seccion-tabs__boton--activo' : ''}`}
              onClick={() => {
                setActiveTab('plantas');
                window.history.pushState(null, '', '#plantas');
              }}
              type="button"
            >
              🌿 Catálogo de Plantas
            </button>
            <button
              className={`seccion-tabs__boton ${activeTab === 'eventos' ? 'seccion-tabs__boton--activo' : ''}`}
              onClick={() => {
                setActiveTab('eventos');
                window.history.pushState(null, '', '#eventos');
              }}
              type="button"
            >
              📅 Próximos Eventos
            </button>
          </div>

          <div className="seccion-tabs__contenido" key={activeTab}>
            {activeTab === 'plantas' ? <SeccionPlantas /> : <SeccionEventos />}
          </div>
        </section>

        <SeccionComoEmpezar />
      </main>
      <PiePagina />
    </div>
  );
}

export default PaginaInicio;
