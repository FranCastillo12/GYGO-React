"use client"

import ContactInfo from "../components/ContactInfo"
import "../styles/Contactenos.css"
import AboutUs from "../components/AboutUs"
import { useState } from "react"

const Contactenos = () => {
  const [showAboutUs, setShowAboutUs] = useState(false)

  if (showAboutUs) {
    return <AboutUs />
  }

  return (
    <div className="contactenos-container">

      <div className="contactenos-content">
        {/* Page Title */}
        <div className="page-title">
          <h1>Contáctenos</h1>
          <p>Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.</p>
        </div>

        {/* Contact Content */}
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info-container">
            <ContactInfo />
          </div>
        </div>

        {/* Call to Action */}
        <div className="call-to-action">
          <h3>¿Te interesaría colaborar con nosotros?</h3>
          <p>Únete a nuestro equipo y forma parte de algo extraordinario.</p>
          <button className="cta-button" onClick={() => setShowAboutUs(true)}>
            Conoce más sobre nosotros
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contactenos
