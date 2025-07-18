"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detectar scroll para cambiar la opacidad
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuItems = [
    { text: "Servicios", route: "/servicios" },
    { text: "Certificaciones", route: "/certificaciones" },
    { text: "Sobre Nosotros", route: "/nosotros" },
    { text: "Contactos", route: "/contactos" }
  ]

  const handleMenuClick = (route) => {
    closeMenu()
    navigate(route)
  }

  const handleLogoClick = () => {
    navigate("/HomePage")
  }

  const handleLoginClick = () => {
    navigate("/login")
  }

  return (
    <>
      <style jsx>{`
        .header {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          z-index: 1000;
          transition: all 0.3s ease-in-out;
        }

        .header-glass {
          background: ${scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.85)'};
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: ${scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.12)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)'};
          transition: all 0.3s ease-in-out;
        }

        .container {
          padding: 0 24px;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .logo-small {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .logo-small:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .logo-text {
          color: #2E7D32;
          font-weight: bold;
          font-size: 1.3rem;
        }

        .nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 8px;
        }

        .nav-list li {
          position: relative;
        }

        .nav-list button {
          display: block;
          color: #2E7D32;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 10px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .nav-list button:hover {
          background-color: rgba(76, 175, 80, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .login-btn {
          background: #2E7D32;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 10px 24px;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .login-btn:hover {
          background: #1B5E20;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
        }

        .menu-toggle {
          display: none;
          background: rgba(76, 175, 80, 0.1);
          border: none;
          border-radius: 12px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: rgba(76, 175, 80, 0.2);
          transform: scale(1.05);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 24px;
          height: 20px;
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background: #2E7D32;
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .header {
            width: 95%;
            top: 12px;
          }

          .header-content {
            height: 60px;
          }

          .container {
            padding: 0 16px;
          }

          .logo-text {
            font-size: 1.1rem;
          }

          .logo-icon {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }

          .nav {
            position: fixed;
            top: 0;
            right: ${isMenuOpen ? '0' : '-100%'};
            height: 100vh;
            width: 280px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
            transition: right 0.3s ease;
            z-index: 1001;
          }

          .nav-list {
            flex-direction: column;
            gap: 8px;
            padding: 80px 24px 24px;
            height: 100%;
          }

          .nav-list li {
            width: 100%;
          }

          .nav-list button {
            width: 100%;
            padding: 16px 20px;
            font-size: 1rem;
            border-radius: 12px;
            text-align: left;
          }

          .menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1002;
          }

          .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(76, 175, 80, 0.1);
            border: none;
            border-radius: 12px;
            padding: 10px;
            cursor: pointer;
            font-size: 1.5rem;
            color: #2E7D32;
            transition: all 0.3s ease;
          }

          .close-btn:hover {
            background: rgba(76, 175, 80, 0.2);
            transform: scale(1.05);
          }

          .mobile-login-btn {
            width: 100%;
            margin-top: 16px;
            padding: 16px 20px;
            font-size: 1rem;
            text-align: center;
          }
        }

        /* Mobile overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          opacity: ${isMenuOpen ? '1' : '0'};
          visibility: ${isMenuOpen ? 'visible' : 'hidden'};
          transition: all 0.3s ease;
        }

        @media (min-width: 769px) {
          .mobile-overlay {
            display: none;
          }
        }

        /* Spacer */
        .header-spacer {
          height: 102px;
        }

        @media (max-width: 768px) {
          .header-spacer {
            height: 88px;
          }
        }
      `}</style>

      <div className="mobile-overlay" onClick={closeMenu} />

      <header className="header">
        <div className="header-glass">
          <div className="container">
            <div className="header-content">
              <div className="logo-small" onClick={handleLogoClick}>
                <div className="logo-icon">
                  <img src="src/assets/Logo.png" alt="Green On Logo" />
                </div>
                <span className="logo-text">Green On</span>
              </div>

              <nav className="nav">
                {isMenuOpen && (
                  <button className="close-btn" onClick={closeMenu}>
                    ×
                  </button>
                )}
                <ul className="nav-list">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button onClick={() => handleMenuClick(item.route)}>
                        {item.text}
                      </button>
                    </li>
                  ))}
                  {/* Botón Log In en mobile dentro del menú */}
                  {isMobile && (
                    <li>
                      <button 
                        className="login-btn mobile-login-btn" 
                        onClick={handleLoginClick}
                      >
                        Log In
                      </button>
                    </li>
                  )}
                </ul>
              </nav>

              <div className="right-section">
                {/* Botón Log In en desktop */}
                {!isMobile && (
                  <button className="login-btn" onClick={handleLoginClick}>
                    Log In
                  </button>
                )}
                
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                  <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="header-spacer" />
    </>
  )
}