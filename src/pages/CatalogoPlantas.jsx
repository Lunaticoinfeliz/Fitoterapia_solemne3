import { useState, useEffect } from 'react';
import { Search, X, Leaf } from 'lucide-react';
import BarraNavegacion from '../components/BarraNavegacion/BarraNavegacion.jsx';
import TarjetaPlanta from '../components/molecules/TarjetaPlanta/TarjetaPlanta.jsx';
import PiePagina from '../components/organisms/PiePagina/PiePagina.jsx';
import { plantas as plantasRespaldo } from '../datos/plantas.js';
import './CatalogoPlantas.scss';

function CatalogoPlantas() {
  const [plantas, setPlantas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar categorías al montar
  useEffect(() => {
    fetch('http://localhost:8000/api/categorias/')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar categorías');
        return res.json();
      })
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error('Usando categorías por defecto debido a error:', err);
        // Categorías por defecto del respaldo
        setCategorias([
          { id: 1, nombre: 'Digestivo' },
          { id: 2, nombre: 'Piel' },
          { id: 3, nombre: 'Laxante' },
          { id: 4, nombre: 'Respiratorio' },
          { id: 5, nombre: 'Sedante / Ansiolítico' },
          { id: 6, nombre: 'Antiinflamatorio' },
          { id: 7, nombre: 'Antiespasmódico' },
          { id: 8, nombre: 'Circulatorio' },
        ]);
      });
  }, []);

  // Cargar plantas reactivamente cuando cambia la búsqueda o filtro
  useEffect(() => {
    setLoading(true);
    let url = 'http://localhost:8000/api/plantas/?solo_activas=true';
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }
    if (selectedCategory) {
      url += `&categoria=${selectedCategory}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar plantas');
        return res.json();
      })
      .then((data) => {
        setPlantas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al consultar la API, filtrando localmente:', err);
        
        // Fallback a filtrado local con datos guardados o de respaldo
        const guardadas = localStorage.getItem('adminPlants');
        const listaRespaldo = guardadas ? JSON.parse(guardadas) : plantasRespaldo;
        
        const plantasFiltradas = listaRespaldo.filter((planta) => {
          const cumpleNombre =
            !searchTerm ||
            (planta.nombre_comun || planta.nombre || '')
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (planta.nombre_cientifico || '')
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
              
          // El respaldo usa nombres de categoría en string, la API usa ids. 
          // Mapeamos el id de la categoría seleccionada a su nombre para comparar en el respaldo.
          const catObjeto = categorias.find((c) => c.id === parseInt(selectedCategory));
          const catNombre = catObjeto ? catObjeto.nombre : '';
          
          const cumpleCat =
            !selectedCategory ||
            (planta.categoria_nombre || planta.categoria || '')
              .toLowerCase()
              .includes(catNombre.toLowerCase());
              
          return cumpleNombre && cumpleCat;
        });

        setPlantas(plantasFiltradas);
        setLoading(false);
      });
  }, [searchTerm, selectedCategory, categorias]);

  return (
    <div className="layout-principal">
      <BarraNavegacion />
      
      <main className="layout-principal__contenido catalogo-plantas">
        {/* Banner Hero */}
        <section className="catalogo-plantas__hero">
          <h1 className="catalogo-plantas__titulo">Herbario Medicinal Completo</h1>
          <p className="catalogo-plantas__subtitulo">
            Explora las propiedades, usos correctos y dosificación de nuestra selección de plantas medicinales para el hogar.
          </p>
        </section>

        {/* Buscador */}
        <div className="catalogo-plantas__search-container">
          <div className="catalogo-plantas__search-box">
            <Search className="catalogo-plantas__search-icono" size={20} />
            <input
              type="text"
              placeholder="Buscar planta por nombre común o científico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="catalogo-plantas__search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="catalogo-plantas__clear-btn"
                title="Limpiar búsqueda"
                type="button"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Sección de Contenido y Filtros */}
        <div className="catalogo-plantas__contenido">
          {/* Filtro por Categorías */}
          <section className="catalogo-plantas__filtros-seccion">
            <span className="catalogo-plantas__filtro-label">Filtrar por Categoría</span>
            <div className="catalogo-plantas__tags-container">
              <button
                onClick={() => setSelectedCategory('')}
                className={`catalogo-plantas__tag-btn ${selectedCategory === '' ? 'catalogo-plantas__tag-btn--activo' : ''}`}
                type="button"
              >
                Todas
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id.toString())}
                  className={`catalogo-plantas__tag-btn ${selectedCategory === cat.id.toString() ? 'catalogo-plantas__tag-btn--activo' : ''}`}
                  type="button"
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </section>

          {/* Listado de Plantas */}
          {loading ? (
            <div className="layout-principal__placeholder">
              <p>Cargando catálogo terapéutico...</p>
            </div>
          ) : plantas.length > 0 ? (
            <div className="catalogo-plantas__rejilla">
              {plantas.map((planta, index) => (
                <TarjetaPlanta
                  key={planta.id || index}
                  nombre={planta.nombre_comun || planta.nombre}
                  imagen={planta.imagen_url || planta.imagen}
                  beneficios={planta.propiedades_usos || planta.beneficios}
                  usos={planta.posologia || planta.usos}
                />
              ))}
            </div>
          ) : (
            <div className="catalogo-plantas__vacio">
              <Leaf className="catalogo-plantas__vacio-icono" />
              <h2 className="catalogo-plantas__vacio-titulo">No se encontraron resultados</h2>
              <p className="catalogo-plantas__vacio-descripcion">
                Intenta buscar con otros términos o cambia la categoría de filtro seleccionada.
              </p>
            </div>
          )}
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default CatalogoPlantas;
