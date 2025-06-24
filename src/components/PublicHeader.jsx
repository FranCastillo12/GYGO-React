"use client"
import  LoginButton  from "./LoginButton"
import { useState, useEffect } from "react"
import "../styles/Header.css" // Asegúrate de tener este archivo CSS
import { Link } from "react-router-dom"


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
            <Link to="/">
              <img
                src="src\assets\Logo.png"
                alt="Green On Logo"
                className="logo-image"
              />
            
            <span>Green On</span>
            </Link>
          </div>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <ul className="nav-list">
              <li>
                <Link to="/DashboardGroupPage" onClick={closeMenu}>
                  DashboardGroupPage
                </Link>
              </li>
             <li>
                <Link to="/ProjectsPage" onClick={closeMenu}>
                  ProjectsPage
                </Link>
              </li>
              <li>
                <Link to="/Chat" onClick={closeMenu}>
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/Contactenos" onClick={closeMenu}>
                  Contactos
                </Link>
              </li>
              <li>
                <LoginButton />
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


