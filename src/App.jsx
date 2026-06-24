import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PaginaInicio from './pages/PaginaInicio.jsx';
import IniciarSesionAdmin from './pages/IniciarSesionAdmin/IniciarSesionAdmin.jsx';
import PanelAdmin from './pages/PanelAdmin/PanelAdmin.jsx';
import CatalogoPlantas from './pages/CatalogoPlantas.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/plantas" element={<CatalogoPlantas />} />
        <Route path="/admin/login" element={<IniciarSesionAdmin />} />
        <Route path="/admin/panel" element={<PanelAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
