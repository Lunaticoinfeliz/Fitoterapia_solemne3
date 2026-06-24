import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Leaf, Save, X, Calendar, RotateCcw } from 'lucide-react';
import './PanelAdmin.scss';
import { plantas } from "../../datos/plantas.js";
import { eventos } from "../../datos/eventos.js";


function PanelAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plants');

  // Estados de Plantas
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [editingPlantId, setEditingPlantId] = useState(null);
  const [plantFormData, setPlantFormData] = useState({
    nombre: '',
    nombre_cientifico: '',
    familia: '',
    imagen: '',
    beneficios: '',
    usos: '',
    categoria: '',
    parte_utilizada: '',
    efectos_adversos: '',
    interacciones: ''
  });

  // Estados de Eventos
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    participantes: 0,
    imagen: '',
    descripcion: ''
  });

  const loadPlants = () => {
    fetch('http://localhost:8000/api/plantas/')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar plantas');
        return res.json();
      })
      .then((data) => setPlants(data))
      .catch((err) => console.error(err));
  };

  const loadEvents = () => {
    fetch('http://localhost:8000/api/eventos/')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar eventos');
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  };

  const loadCategories = () => {
    fetch('http://localhost:8000/api/categorias/')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar categorías');
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // verifica autenticación
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin/login');
      return;
    }

    loadPlants();
    loadEvents();
    loadCategories();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Controladores de Planta
  const handlePlantSubmit = (e) => {
    e.preventDefault();

    const isEditing = editingPlantId !== null;
    const url = isEditing
      ? `http://localhost:8000/api/plantas/${editingPlantId}/`
      : 'http://localhost:8000/api/plantas/';
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      nombre_comun: plantFormData.nombre,
      nombre_cientifico: plantFormData.nombre_cientifico || (plantFormData.nombre + " L."),
      familia: plantFormData.familia || "Lamiaceae",
      categoria: parseInt(plantFormData.categoria),
      imagen_url: plantFormData.imagen,
      parte_utilizada: plantFormData.parte_utilizada || "Hojas y tallos",
      propiedades_usos: plantFormData.beneficios,
      posologia: plantFormData.usos,
      efectos_adversos: plantFormData.efectos_adversos || "Ninguno reportado.",
      interacciones: plantFormData.interacciones || "Ninguna reportada.",
      activa: true
    };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar la planta');
        return res.json();
      })
      .then(() => {
        loadPlants();
        setEditingPlantId(null);
        setPlantFormData({
          nombre: '',
          nombre_cientifico: '',
          familia: '',
          imagen: '',
          beneficios: '',
          usos: '',
          categoria: '',
          parte_utilizada: '',
          efectos_adversos: '',
          interacciones: ''
        });
        setShowAddPlantForm(false);
      })
      .catch((err) => alert(err.message));
  };

  const handlePlantEdit = (plant) => {
    setPlantFormData({
      nombre: plant.nombre_comun || plant.nombre || '',
      nombre_cientifico: plant.nombre_cientifico || '',
      familia: plant.familia || '',
      imagen: plant.imagen_url || plant.imagen || '',
      beneficios: plant.propiedades_usos || plant.beneficios || '',
      usos: plant.posologia || plant.usos || '',
      categoria: plant.categoria || '',
      parte_utilizada: plant.parte_utilizada || '',
      efectos_adversos: plant.efectos_adversos || '',
      interacciones: plant.interacciones || ''
    });
    setEditingPlantId(plant.id);
    setShowAddPlantForm(true);
  };

  const handlePlantDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta planta?')) {
      fetch(`http://localhost:8000/api/plantas/${id}/`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error al eliminar la planta');
          loadPlants();
        })
        .catch((err) => alert(err.message));
    }
  };

  const handlePlantCancel = () => {
    setShowAddPlantForm(false);
    setEditingPlantId(null);
    setPlantFormData({
      nombre: '',
      nombre_cientifico: '',
      familia: '',
      imagen: '',
      beneficios: '',
      usos: '',
      categoria: '',
      parte_utilizada: '',
      efectos_adversos: '',
      interacciones: ''
    });
  };

  const handleRestoreDefaultPlants = () => {
    if (window.confirm('¿Estás seguro de que deseas restaurar las plantas y eventos por defecto? Esto reemplazará los datos actuales en el panel.')) {
      fetch('http://localhost:8000/api/plantas/restablecer/', {
        method: 'POST',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error al restablecer datos');
          return res.json();
        })
        .then(() => {
          loadPlants();
          loadEvents();
          loadCategories();
        })
        .catch((err) => alert(err.message));
    }
  };

  // Controladores de Evento
  const handleEventSubmit = (e) => {
    e.preventDefault();

    const isEditing = editingEventId !== null;
    const url = isEditing
      ? `http://localhost:8000/api/eventos/${editingEventId}/`
      : 'http://localhost:8000/api/eventos/';
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      titulo: eventFormData.titulo,
      fecha: eventFormData.fecha,
      horario: eventFormData.hora,
      ubicacion: eventFormData.ubicacion,
      participantes_max: parseInt(eventFormData.participantes) || 0,
      imagen_url: eventFormData.imagen,
      descripcion: eventFormData.descripcion,
      activo: true
    };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar el evento');
        return res.json();
      })
      .then(() => {
        loadEvents();
        setEditingEventId(null);
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
      })
      .catch((err) => alert(err.message));
  };

  const handleEventEdit = (event) => {
    setEventFormData({
      titulo: event.titulo || '',
      fecha: event.fecha || '',
      hora: event.horario || event.hora || '',
      ubicacion: event.ubicacion || '',
      participantes: event.participantes_max || event.participantes || 0,
      imagen: event.imagen_url || event.imagen || '',
      descripcion: event.descripcion || ''
    });
    setEditingEventId(event.id);
    setShowAddEventForm(true);
  };

  const handleEventDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      fetch(`http://localhost:8000/api/eventos/${id}/`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error al eliminar el evento');
          loadEvents();
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleEventCancel = () => {
    setShowAddEventForm(false);
    setEditingEventId(null);
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

  const handleRestoreDefaultEvents = () => {
    handleRestoreDefaultPlants(); // Ambas llaman al restablecer común que reinicia plantas, categorías y eventos
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
            <div className="panel-admin__action-bar" style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowAddPlantForm(!showAddPlantForm)}
                className="panel-admin__boton-agregar"
              >
                <Plus className="panel-admin__boton-agregar-icono" />
                Agregar Nueva Planta
              </button>
              <button
                onClick={handleRestoreDefaultPlants}
                className="panel-admin__boton-restaurar"
                type="button"
              >
                <RotateCcw className="panel-admin__boton-agregar-icono" />
                Restaurar por Defecto
              </button>
            </div>

            {/* Formulario Agregar/Editar */}
            {showAddPlantForm && (
              <div className="panel-admin__form-container">
                <h3 className="panel-admin__form-title">
                  {editingPlantId !== null ? 'Editar Planta' : 'Agregar Nueva Planta'}
                </h3>
                <form onSubmit={handlePlantSubmit} className="panel-admin__form">
                  <div className="panel-admin__form-row">
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Nombre Común
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
                        Nombre Científico
                      </label>
                      <input
                        type="text"
                        value={plantFormData.nombre_cientifico}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, nombre_cientifico: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="Ej. Matricaria chamomilla L."
                      />
                    </div>
                  </div>

                  <div className="panel-admin__form-row">
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Familia
                      </label>
                      <input
                        type="text"
                        value={plantFormData.familia}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, familia: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="Ej. Asteraceae"
                      />
                    </div>
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Parte Utilizada
                      </label>
                      <input
                        type="text"
                        value={plantFormData.parte_utilizada}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, parte_utilizada: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="Ej. Hojas, flores, raíces"
                      />
                    </div>
                  </div>

                  <div className="panel-admin__form-row">
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Efectos Adversos
                      </label>
                      <input
                        type="text"
                        value={plantFormData.efectos_adversos}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, efectos_adversos: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="Ej. Reacciones alérgicas"
                      />
                    </div>
                    <div className="panel-admin__form-group">
                      <label className="panel-admin__form-label">
                        Interacciones
                      </label>
                      <input
                        type="text"
                        value={plantFormData.interacciones}
                        onChange={(e) =>
                          setPlantFormData({ ...plantFormData, interacciones: e.target.value })
                        }
                        className="panel-admin__form-input"
                        placeholder="Ej. Evitar con anticoagulantes"
                      />
                    </div>
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
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
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
                      {editingPlantId !== null ? 'Guardar Cambios' : 'Agregar Planta'}
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
                      <tr key={plant.id || index} className="panel-admin__tr">
                        <td className="panel-admin__td panel-admin__td--name">
                          <div className="panel-admin__item-name">{plant.nombre_comun || plant.nombre}</div>
                          {plant.nombre_cientifico && (
                            <div className="panel-admin__item-sub" style={{ fontSize: '0.8rem', color: '#6b7280', fontStyle: 'italic' }}>
                              {plant.nombre_cientifico}
                            </div>
                          )}
                        </td>
                        <td className="panel-admin__td">
                          <span className="panel-admin__badge">
                            {plant.categoria_nombre || plant.categoria}
                          </span>
                        </td>
                        <td className="panel-admin__td panel-admin__td--benefits">
                          <div className="panel-admin__item-desc">{plant.propiedades_usos || plant.beneficios}</div>
                        </td>
                        <td className="panel-admin__td panel-admin__td--actions">
                          <div className="panel-admin__cell-actions">
                            <button
                              onClick={() => handlePlantEdit(plant)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--editar"
                              title="Editar"
                              type="button"
                            >
                              <Edit2 className="panel-admin__btn-accion-icono" />
                            </button>
                            <button
                              onClick={() => handlePlantDelete(plant.id)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--eliminar"
                              title="Eliminar"
                              type="button"
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
                  {events.reduce((sum, e) => sum + (e.participantes_max || e.participantes || 0), 0)}
                </p>
              </article>
              <article className="panel-admin__stat-card">
                <h3 className="panel-admin__stat-label">Estado</h3>
                <p className="panel-admin__stat-value panel-admin__stat-value--texto">Activo</p>
              </article>
            </div>

            {/* Botón Agregar */}
            <div className="panel-admin__action-bar" style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowAddEventForm(!showAddEventForm)}
                className="panel-admin__boton-agregar"
              >
                <Plus className="panel-admin__boton-agregar-icono" />
                Agregar Nuevo Evento
              </button>
              <button
                onClick={handleRestoreDefaultEvents}
                className="panel-admin__boton-restaurar"
                type="button"
              >
                <RotateCcw className="panel-admin__boton-agregar-icono" />
                Restaurar por Defecto
              </button>
            </div>

            {/* Formulario Agregar/Editar */}
            {showAddEventForm && (
              <div className="panel-admin__form-container">
                <h3 className="panel-admin__form-title">
                  {editingEventId !== null ? 'Editar Evento' : 'Agregar Nuevo Evento'}
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
                      {editingEventId !== null ? 'Guardar Cambios' : 'Agregar Evento'}
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
                      <tr key={event.id || index} className="panel-admin__tr">
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
                            {event.participantes_max || event.participantes}
                          </span>
                        </td>
                        <td className="panel-admin__td panel-admin__td--actions">
                          <div className="panel-admin__cell-actions">
                            <button
                              onClick={() => handleEventEdit(event)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--editar"
                              title="Editar"
                              type="button"
                            >
                              <Edit2 className="panel-admin__btn-accion-icono" />
                            </button>
                            <button
                              onClick={() => handleEventDelete(event.id)}
                              className="panel-admin__btn-accion panel-admin__btn-accion--eliminar"
                              title="Eliminar"
                              type="button"
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