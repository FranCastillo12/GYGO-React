import "../../styles/Mission.css"

const Mission = () => {
  return (
    <section className="mission-section">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-item mission-center">
            <div className="mission-circle mission-primary">
              <h3>Misión</h3>
            </div>
            <p className="mission-text">
              Brindar soluciones integrales de consultoría en sostenibilidad, ayudando a las empresas a implementar
              prácticas responsables que generen valor económico, social y ambiental.
            </p>
          </div>

          <div className="mission-item mission-left">
            <div className="mission-circle mission-secondary">
              <h3>Valores</h3>
            </div>
            <p className="mission-text">
              Compromiso con la excelencia, transparencia en nuestros procesos, innovación constante y respeto por el
              medio ambiente en cada una de nuestras acciones y recomendaciones.
            </p>
          </div>

          <div className="mission-item mission-right">
            <div className="mission-circle mission-tertiary">
              <h3>Visión</h3>
            </div>
            <p className="mission-text">
              Ser la empresa líder en consultoría de sostenibilidad, reconocida por transformar organizaciones hacia un
              futuro más sostenible y responsable con el planeta.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission