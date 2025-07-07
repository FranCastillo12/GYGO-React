import "../../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img src="src\assets\forestlandscape.jpg" alt="Forest landscape" className="hero-image" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h2>Creando soluciones</h2>
            <h2>Ecológicas para todo</h2>
            <h2>tipo de empresas</h2>
            <button className="cta-button">Sobre nosotros</button>
          </div>
        </div>
      </div>
      <div className="hero-indicators">
        
      </div>
    </section>
  )
}

export default Hero