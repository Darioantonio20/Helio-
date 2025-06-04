import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="about__container">
        <header className="about__header">
          <h1 className="about__title">Acerca de Helio+</h1>
          <p className="about__subtitle">
            Conoce nuestra historia, misión y los valores que nos impulsan
          </p>
        </header>

        <section className="about__content">
          <div className="about__section">
            <h2>Nuestra Historia</h2>
            <p>
              Helio+ nació de la visión de crear una plataforma que transforme 
              la manera en que las personas interactúan con la tecnología. 
              Fundada en 2024, nuestra empresa se ha comprometido a desarrollar 
              soluciones innovadoras que simplifiquen la vida digital.
            </p>
          </div>

          <div className="about__section">
            <h2>Nuestra Misión</h2>
            <p>
              Empoderar a individuos y organizaciones con herramientas digitales 
              de vanguardia que les permitan alcanzar su máximo potencial, 
              fomentando la innovación y la colaboración en un mundo cada vez 
              más conectado.
            </p>
          </div>

          <div className="about__section">
            <h2>Nuestros Valores</h2>
            <div className="about__values">
              <div className="value-item">
                <h3>🚀 Innovación</h3>
                <p>Buscamos constantemente nuevas formas de mejorar y evolucionar.</p>
              </div>
              <div className="value-item">
                <h3>🤝 Colaboración</h3>
                <p>Creemos en el poder del trabajo en equipo y la comunidad.</p>
              </div>
              <div className="value-item">
                <h3>💡 Simplicidad</h3>
                <p>Diseñamos soluciones elegantes y fáciles de usar.</p>
              </div>
              <div className="value-item">
                <h3>🔒 Confianza</h3>
                <p>La seguridad y privacidad de nuestros usuarios es prioritaria.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About 