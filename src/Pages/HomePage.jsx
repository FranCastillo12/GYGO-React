import Hero from "../components/Hero"
import Mission from "../components/Mission"
import Footer from "../components/Footer"
import "../styles/HomePage.css"

const HomePage = () => {
  
  return (
    <div className="home-page">
      <main>
        <section className="brand-section">
          <div className="container">
            <div className="brand-logo">
              <div className="logo-container">
                <img
                  src="src\assets\BigLogo.png"
                  alt="Green On Logo"
                  className="logo-image"
                ></img>
                
              </div>
              <p className="brand-tagline">SOLUCIÓN DE CONSULTORÍA DE SOSTENIBILIDAD</p>
            </div>
          </div>
        </section>
        
        <Hero />
        <Mission />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
