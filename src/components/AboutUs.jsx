"use client"

import "../styles/AboutUs.css" 

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        {/* Clients Section */}
        <div className="clients-section">
          <h2 className="clients-title">Nuestros Clientes</h2>

          <div className="clients-logos">
            <div className="client-logo">
              <div className="biotec-logo">
                <div className="biotec-icon">
                  <div className="biotec-circle"></div>
                  <div className="biotec-leaf"></div>
                </div>
                <span className="biotec-text">BIOTEC</span>
              </div>
            </div>

            <div className="client-logo">
              <div className="lima-logo">
                <div className="lima-waves">
                  <div className="wave wave-1"></div>
                  <div className="wave wave-2"></div>
                  <div className="wave wave-3"></div>
                </div>
                <span className="lima-text">LA LIMA</span>
              </div>
            </div>

            <div className="client-logo">
              <div className="garnier-logo">
                <div className="garnier-icon">G</div>
                <div className="garnier-text">
                  <span className="garnier-main">GARNIER</span>
                  <span className="garnier-sub">CONSULTING GROUP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="about-section">
          <h3 className="about-title">Sobre Nosotros</h3>

          <div className="about-content">
            <p className="about-paragraph">
              Green-On nació como una iniciativa para ayudar al desarrollo sostenible del país. Nuestra misión es velar
              por la sostenibilidad empresarial en todos sus ámbitos: ambiental, social y productivo mediante la
              implementación de tecnologías ambientales prácticas y accesibles, sin perjudicar el ámbito económico, para
              un desarrollo efectivo e integral del negocio de nuestros clientes. Además de promover las iniciativas
              nacionales como lo son las certificaciones ambientales.
            </p>

            <p className="about-paragraph">
              Queremos que nuestros clientes puedan cumplir todas sus expectativas ambientales sin importar la
              naturaleza o tamaño de su empresa.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="back-section">
          <button className="back-button" onClick={() => window.history.back()}>
            Volver a Contacto
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
