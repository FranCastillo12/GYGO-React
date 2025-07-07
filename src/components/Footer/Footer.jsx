import "../../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Servicios</h4>
            <ul>
              <li>
                <a href="#auditoria">Auditoría Ambiental</a>
              </li>
              <li>
                <a href="#consultoria">Consultoría</a>
              </li>
              <li>
                <a href="#capacitacion">Capacitación</a>
              </li>
              <li>
                <a href="#implementacion">Implementación</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Certificaciones</h4>
            <ul>
              <li>
                <a href="#iso14001">ISO 14001</a>
              </li>
              <li>
                <a href="#iso45001">ISO 45001</a>
              </li>
              <li>
                <a href="#iso9001">ISO 9001</a>
              </li>
              <li>
                <a href="#leed">LEED</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Recursos</h4>
            <ul>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#casos">Casos de Éxito</a>
              </li>
              <li>
                <a href="#descargas">Descargas</a>
              </li>
              <li>
                <a href="#webinars">Webinars</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href="#telefono">+1 234 567 8900</a>
              </li>
              <li>
                <a href="#email">info@greenon.com</a>
              </li>
              <li>
                <a href="#direccion">123 Green Street</a>
              </li>
              <li>
                <a href="#horarios">Lun - Vie 9:00-18:00</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links">
            <a href="#facebook" className="social-link">
              f
            </a>
            <a href="#twitter" className="social-link">
              t
            </a>
            <a href="#linkedin" className="social-link">
              in
            </a>
            <a href="#instagram" className="social-link">
              ig
            </a>
            <a href="#youtube" className="social-link">
              yt
            </a>
          </div>
          <div className="footer-logo">
            <span>Green On</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer