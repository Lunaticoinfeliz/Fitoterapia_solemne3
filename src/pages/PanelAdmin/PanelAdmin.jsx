import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Leaf, Save, X, Calendar } from 'lucide-react';
import './PanelAdmin.scss';
import { plantas } from "../../datos/plantas.js";
import { eventos } from "../../datos/eventos.js";


function PanelAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plants');

  // Estados de Plantas
  const [plants, setPlants] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [editingPlantIndex, setEditingPlantIndex] = useState(null);
  const [plantFormData, setPlantFormData] = useState({
    nombre: '',
    imagen: '',
    beneficios: '',
    usos: '',
    categoria: ''
  });

  // Estados de Eventos
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    participantes: 0,
    imagen: '',
    descripcion: ''
  });

  useEffect(() => {
    // verifica autenticación
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin/login');
      return;
    }

    // Cargar plantas
    const savedPlants = localStorage.getItem('adminPlants');
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    } else {
      setPlants(plantas);
      localStorage.setItem('adminPlants', JSON.stringify(plantas));
    }

    // Cargar eventos
    const savedEvents = localStorage.getItem('adminEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(eventos);
      localStorage.setItem('adminEvents', JSON.stringify(eventos));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Controladores de Planta
  const handlePlantSubmit = (e) => {
    e.preventDefault();

    let updatedPlants;
    if (editingPlantIndex !== null) {
      updatedPlants = [...plants];
      updatedPlants[editingPlantIndex] = plantFormData;
      setEditingPlantIndex(null);
    } else {
      updatedPlants = [...plants, plantFormData];
    }

    setPlants(updatedPlants);
    localStorage.setItem('adminPlants', JSON.stringify(updatedPlants));

    setPlantFormData({
      nombre: '',
      imagen: '',
      beneficios: '',
      usos: '',
      categoria: ''
    });
    setShowAddPlantForm(false);
  };

  const handlePlantEdit = (index) => {
    setPlantFormData(plants[index]);
    setEditingPlantIndex(index);
    setShowAddPlantForm(true);
  };

  const handlePlantDelete = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta planta?')) {
      const updatedPlants = plants.filter((_, i) => i !== index);
      setPlants(updatedPlants);
      localStorage.setItem('adminPlants', JSON.stringify(updatedPlants));
    }
  };

  const handlePlantCancel = () => {
    setShowAddPlantForm(false);
    setEditingPlantIndex(null);
    setPlantFormData({
      nombre: '',
      imagen: '',
      beneficios: '',
      usos: '',
      categoria: ''
    });
  };

  // Controladores de Evento
  const handleEventSubmit = (e) => {
    e.preventDefault();

    let updatedEvents;
    if (editingEventIndex !== null) {
      updatedEvents = [...events];
      updatedEvents[editingEventIndex] = eventFormData;
      setEditingEventIndex(null);
    } else {
      updatedEvents = [...events, eventFormData];
    }

    setEvents(updatedEvents);
    localStorage.setItem('adminEvents', JSON.stringify(updatedEvents));

    setEventFormData({
      titulo: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      participantes: 0,
      imagen: '',
      descripcion: ''
    });
    setShowAddEventForm(false);
  };

  const handleEventEdit = (index) => {
    setEventFormData(events[index]);
    setEditingEventIndex(index);
    setShowAddEventForm(true);
  };

  const handleEventDelete = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
      localStorage.setItem('adminEvents', JSON.stringify(updatedEvents));
    }
  };

  const handleEventCancel = () => {
    setShowAddEventForm(false);
    setEditingEventIndex(null);
    setEventFormData({
      titulo: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      participantes: 0,
      imagen: '',
      descripcion: ''
    });
  };

  return (
    <div className="panel-admin">
      {/* Header */}
      <header className="panel-admin__header">
        <div className="panel-admin__header-container">
          <div className="panel-admin__header-content">
            <div className="panel-admin__brand">
              <Leaf className="panel-admin__brand-logo" />
              <div className="panel-admin__brand-text">
                <h1 className="panel-admin__title">Panel de Administración</h1>
                <p className="panel-admin__subtitle">Gestión completa del sitio</p>
              </div>
            </div>
            <div className="panel-admin__actions-nav">
              <Link to="/" className="panel-admin__link-sitio">
                Ver sitio
              </Link>
              <button
                onClick={handleLogout}
                className="panel-admin__boton-logout"
              >
                <LogOut className="panel-admin__boton-logout-icono" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Uso de etiqueta <main> para el contenido principal */}
      <main className="panel-admin__content">
        {/* Tabs */}
        <div className="panel-admin__tabs">
          <div className="panel-admin__tab-list">
            <button
              onClick={() => setActiveTab('plants')}
              className={`panel-admin__tab-btn ${
                activeTab === 'plants' ? 'panel-admin__tab-btn--activo' : ''
              }`}
              aria-selected={activeTab === 'plants'}
            >
              <Leaf className="panel-admin__tab-icon" />
              Plantas Medicinales
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`panel-admin__tab-btn ${
                activeTab === 'events' ? 'panel-admin__tab-btn--activo' : ''
              }`}
              aria-selected={activeTab === 'events'}
            >
              <Calendar className="panel-admin__tab-icon" />
              Eventos
            </button>
          </div>
        </div>

        {/* Pestaña de Plantas */}
        {activeTab === 'plants' && (
          <section className="panel-admin__section">
            {/* Stats */}
            <div className="panel-admin__stats-grid">
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Total de Plantas</h3>
                <p className="panel-admin__stat-value">{plants.length}</p>
              </article>
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Categorías</h3>
                <p className="panel-admin__stat-value">
                  {new Set(plants.map((p) => p.categoria).filter(Boolean)).size}
                </p>
              </article>
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Estado</h3>
                <p className="panel-admin__stat-value panel-admin__stat-value--texto">Activo</p>
              </article>
            </div>

            {/* Botón Agregar */}
            <div className="panel-admin__action-bar">
              <button
                onClick={() => setShowAddPlantForm(!showAddPlantForm)}
                className="panel-admin__boton-agregar"
              >
                <Plus className="panel-admin__boton-agregar-icono" />
                Agregar Nueva Planta
              </button>
            </div>

            {/* Formulario Agregar/Editar */}
            {showAddPlantForm && (
              <div className="panel-admin__form-container">
                <h3 className="panel-admin__form-title">
                  {editingPlantIndex !== null ? 'Editar Planta' : 'Agregar Nueva Planta'}
                </h3>
                <form onSubmit={handlePlantSubmit} className="panel-admin__form">
                  <div className="panel-admin__form-row">
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Nombre de la Planta
                      </label>
                      <input
                        type="text"
                        value={plantFormData.nombre}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, nombre: e.target.value })
                        }
                        className="panel-admin__form-input"
                        required
                      />
                    </div>
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Categoría
                      </label>
                      <select
                        value={plantFormData.categoria}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, categoria: e.target.value })
                        }
                        className="panel-admin__form-select"
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="Aromática">Aromática</option>
                        <option value="Digestiva">Digestiva</option>
                        <option value="Relajante">Relajante</option>
                        <option value="Respiratoria">Respiratoria</option>
                        <option value="Dermatológica">Dermatológica</option>
                        <option value="Estimulante">Estimulante</option>
                        <option value="Hormonal">Hormonal</option>
                      </select>
                    </div>
                  </div>

                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      URL de Imagen
                    </label>
                    <input
                      type="url"
                      value={plantFormData.imagen}
                      onChange={(e) =>
                        setPlantFormData({ ...plantFormData, imagen: e.target.value })
                      }
                      className="panel-admin__form-input"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      required
                    />
                  </div>

                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      Beneficios
                    </label>
                    <textarea
                      value={plantFormData.beneficios}
                      onChange={(e) =>
                        setPlantFormData({ ...plantFormData, beneficios: e.target.value })
                      }
                      className="panel-admin__form-textarea"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      Usos
                    </label>
                    <textarea
                      value={plantFormData.usos}
                      onChange={(e) =>
                        setPlantFormData({ ...plantFormData, usos: e.target.value })
                      }
                      className="panel-admin__form-textarea"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="panel-admin__form-buttons">
                    <button
                      type="submit"
                      className="panel-admin__boton-guardar"
                    >
                      <Save className="panel-admin__form-btn-icono" />
                      {editingPlantIndex !== null ? 'Guardar Cambios' : 'Agregar Planta'}
                    </button>
                    <button
                      type="button"
                      onClick={handlePlantCancel}
                      className="panel-admin__boton-cancelar"
                    >
                      <X className="panel-admin__form-btn-icono" />
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tabla de Plantas */}
            <div className="panel-admin__table-card">
              <div className="panel-admin__table-header">
                <h3 className="panel-admin__table-title">Plantas Publicadas</h3>
              </div>
              <div className="panel-admin__table-responsive">
                <table className="panel-admin__table">
                  <thead className="panel-admin__thead">
                    <tr className="panel-admin__tr">
                      <th className="panel-admin__th">Nombre</th>
                      <th className="panel-admin__th">Categoría</th>
                      <th className="panel-admin__th">Beneficios</th>
                      <th className="panel-admin__th">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="panel-admin__tbody">
                    {plants.map((plant, index) => (
                      <tr key={index} className="panel-admin__tr">
                        <td className="panel-admin__td panel-admin__td--name">
                          <div className="panel-admin__item-name">{plant.nombre}</div>
                        </td>
                        <td className="panel-admin__td">
                          <span className="panel-admin__badge">
                            {plant.categoria}
                          </span>
                        </td>
                        <td className="panel-admin__td panel-admin__td--benefits">
                          <div className="panel-admin__item-desc">{plant.beneficios}</div>
                        </td>
                        <td className="panel-admin__td panel-admin__td--actions">
                          <div className="panel-admin__cell-actions">
                            <button
                              onClick={() => handlePlantEdit(index)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--editar"
                              title="Editar"
                            >
                              <Edit2 className="panel-admin__btn-accion-icono" />
                            </button>
                            <button
                              onClick={() => handlePlantDelete(index)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--eliminar"
                              title="Eliminar"
                            >
                              <Trash2 className="panel-admin__btn-accion-icono" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Pestaña de Eventos */}
        {activeTab === 'events' && (
          <section className="panel-admin__section">
            {/* Stats */}
            <div className="panel-admin__stats-grid">
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Total de Eventos</h3>
                <p className="panel-admin__stat-value">{events.length}</p>
              </article>
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Total Participantes</h3>
                <p className="panel-admin__stat-value">
                  {events.reduce((sum, e) => sum + (e.participantes || 0), 0)}
                </p>
              </article>
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Estado</h3>
                <p className="panel-admin__stat-value panel-admin__stat-value--texto">Activo</p>
              </article>
            </div>

            {/* Botón Agregar */}
            <div className="panel-admin__action-bar">
              <button
                onClick={() => setShowAddEventForm(!showAddEventForm)}
                className="panel-admin__boton-agregar"
              >
                <Plus className="panel-admin__boton-agregar-icono" />
                Agregar Nuevo Evento
              </button>
            </div>

            {/* Formulario Agregar/Editar */}
            {showAddEventForm && (
              <div className="panel-admin__form-container">
                <h3 className="panel-admin__form-title">
                  {editingEventIndex !== null ? 'Editar Evento' : 'Agregar Nuevo Evento'}
                </h3>
                <form onSubmit={handleEventSubmit} className="panel-admin__form">
                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      Título del Evento
                    </label>
                    <input
                      type="text"
                      value={eventFormData.titulo}
                      onChange={(e) =>
                        setEventFormData({ ...eventFormData, titulo: e.target.value })
                      }
                      className="panel-admin__form-input"
                      required
                    />
                  </div>

                  <div className="panel-admin__form-row panel-admin__form-row--three">
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Fecha
                      </label>
                      <input
                        type="text"
                        value={eventFormData.fecha}
                        onChange={(e) =>
                          setEventFormData({ ...eventFormData, fecha: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="20 de Mayo, 2026"
                        required
                      />
                    </div>
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Horario
                      </label>
                      <input
                        type="text"
                        value={eventFormData.hora}
                        onChange={(e) =>
                          setEventFormData({ ...eventFormData, hora: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="10:00 AM - 12:00 PM"
                        required
                      />
                    </div>
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Participantes
                      </label>
                      <input
                        type="number"
                        value={eventFormData.participantes}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            participantes: parseInt(e.target.value) || 0
                          })
                        }
                        className="panel-admin__form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={eventFormData.ubicacion}
                      onChange={(e) =>
                        setEventFormData({ ...eventFormData, ubicacion: e.target.value })
                      }
                      className="panel-admin__form-input"
                      placeholder="Jardín Botánico Municipal"
                      required
                    />
                  </div>

                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      URL de Imagen
                    </label>
                    <input
                      type="url"
                      value={eventFormData.imagen}
                      onChange={(e) =>
                        setEventFormData({ ...eventFormData, imagen: e.target.value })
                      }
                      className="panel-admin__form-input"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      required
                    />
                  </div>

                  <div className="panel-admin__form-group">
                    <label className="panel-admin__form-label">
                      Descripción
                    </label>
                    <textarea
                      value={eventFormData.descripcion}
                      onChange={(e) =>
                        setEventFormData({ ...eventFormData, descripcion: e.target.value })
                      }
                      className="panel-admin__form-textarea"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="panel-admin__form-buttons">
                    <button
                      type="submit"
                      className="panel-admin__boton-guardar"
                    >
                      <Save className="panel-admin__form-btn-icono" />
                      {editingEventIndex !== null ? 'Guardar Cambios' : 'Agregar Evento'}
                    </button>
                    <button
                      type="button"
                      onClick={handleEventCancel}
                      className="panel-admin__boton-cancelar"
                    >
                      <X className="panel-admin__form-btn-icono" />
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tabla de Eventos */}
            <div className="panel-admin__table-card">
              <div className="panel-admin__table-header">
                <h3 className="panel-admin__table-title">Eventos Publicados</h3>
              </div>
              <div className="panel-admin__table-responsive">
                <table className="panel-admin__table">
                  <thead className="panel-admin__thead">
                    <tr className="panel-admin__tr">
                      <th className="panel-admin__th">Título</th>
                      <th className="panel-admin__th">Fecha</th>
                      <th className="panel-admin__th">Ubicación</th>
                      <th className="panel-admin__th">Participantes</th>
                      <th className="panel-admin__th">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="panel-admin__tbody">
                    {events.map((event, index) => (
                      <tr key={index} className="panel-admin__tr">
                        <td className="panel-admin__td panel-admin__td--title">
                          <div className="panel-admin__item-name">{event.titulo}</div>
                        </td>
                        <td className="panel-admin__td whitespace-nowrap">
                          <div className="panel-admin__item-date">{event.fecha}</div>
                        </td>
                        <td className="panel-admin__td">
                          <div className="panel-admin__item-location">{event.ubicacion}</div>
                        </td>
                        <td className="panel-admin__td whitespace-nowrap">
                          <span className="panel-admin__badge panel-admin__badge--blue">
                            {event.participantes}
                          </span>
                        </td>
                        <td className="panel-admin__td panel-admin__td--actions">
                          <div className="panel-admin__cell-actions">
                            <button
                              onClick={() => handleEventEdit(index)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--editar"
                              title="Editar"
                            >
                              <Edit2 className="panel-admin__btn-accion-icono" />
                            </button>
                            <button
                              onClick={() => handleEventDelete(index)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--eliminar"
                              title="Eliminar"
                            >
                              <Trash2 className="panel-admin__btn-accion-icono" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PanelAdmin;