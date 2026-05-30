import { Facebook, Instagram, Leaf, Mail, Twitter } from 'lucide-react';
import './PiePagina.scss';

const enlacesUtiles = [
  { etiqueta: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { etiqueta: 'Blog de Plantas', href: '#blog' },
  { etiqueta: 'Guías de Cultivo', href: '#guias' },
  { etiqueta: 'Recetas Herbales', href: '#recetas' },
];

function PiePagina() {
  return (
    <footer className="pie-pagina layout-principal__pie">
      <div className="pie-pagina__contenedor">
        <div className="pie-pagina__rejilla">
          <section className="pie-pagina__bloque" aria-label="Marca del sitio">
            <div className="pie-pagina__marca">
              <Leaf className="pie-pagina__icono" aria-hidden="true" />
              <span className="pie-pagina__nombre">Huerto Terapéutico</span>
            </div>
            <p className="pie-pagina__descripcion">
              Cultivando salud y bienestar a través del poder sanador de las plantas medicinales.
            </p>
          </section>

          <nav className="pie-pagina__bloque" aria-label="Enlaces útiles">
            <h3 className="pie-pagina__subtitulo">Enlaces Útiles</h3>
            <ul className="pie-pagina__lista">
              {enlacesUtiles.map((enlace) => (
                <li key={enlace.etiqueta}>
                  <a href={enlace.href} className="pie-pagina__enlace">
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section className="pie-pagina__bloque" aria-label="Contacto">
            <h3 className="pie-pagina__subtitulo">Contacto</h3>
            <div className="pie-pagina__contacto">
              <p className="pie-pagina__correo">
                <Mail className="pie-pagina__icono-contacto" aria-hidden="true" />
                <a href="mailto:info@huertoterapeutico.com">info@huertoterapeutico.com</a>
              </p>
              <div className="pie-pagina__redes" role="list" aria-label="Redes sociales">
                <a href="#facebook" className="pie-pagina__red-social" aria-label="Facebook">
                  <Facebook aria-hidden="true" />
                </a>
                <a href="#instagram" className="pie-pagina__red-social" aria-label="Instagram">
                  <Instagram aria-hidden="true" />
                </a>
                <a href="#twitter" className="pie-pagina__red-social" aria-label="Twitter">
                  <Twitter aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="pie-pagina__legal">
          <p>&copy; 2026 Huerto Terapéutico. Todos los derechos reservados.</p>
          <p className="pie-pagina__aviso">
            Las plantas medicinales complementan, pero no reemplazan el tratamiento médico profesional.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PiePagina;
