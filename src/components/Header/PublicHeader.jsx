"use client"
import logo from "../../assets/Logo.png";
import { useState, useEffect } from "react"
import "../../styles/Header.css" // Asegúrate de tener este archivo CSS

export const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".header")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  // Cerrar menú al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMenu = (e) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-small">
  <img src={logo} alt="Logo" className="logo-image" />
  <span className="logo-text">Green On</span>
</div>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <ul className="nav-list">
              <li>
                <a href="#servicios" onClick={closeMenu}>
                  Servicios
                </a>
              </li>
              <li>
                <a href="#certificaciones" onClick={closeMenu}>
                  Certificaciones
                </a>
              </li>
              <li>
                <a href="#eventos" onClick={closeMenu}>
                  Eventos
                </a>
              </li>
              <li>
                <a href="#contactos" onClick={closeMenu}>
                  Contactos
                </a>
              </li>
            </ul>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}