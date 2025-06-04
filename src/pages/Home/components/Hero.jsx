import './Hero.css'

const Hero = ({ user }) => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Tu <span className="hero__brand">Asistente Personal</span> Inteligente
          </h1>
          <p className="hero__subtitle">
            {user 
              ? `¡Hola ${user.name}! Organiza tu día, mantente informado y alcanza tus metas.`
              : 'Organiza tu vida al alcance de un toque. Recordatorios, notas, noticias, clima y mucho más en un solo lugar.'
            }
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary btn--large">
              📝 Crear Nota Rápida
            </button>
            <button className="btn btn--secondary btn--large">
              📅 Ver Agenda
            </button>
          </div>
          
          <div className="hero__features-preview">
            <div className="hero__feature">
              <span className="hero__feature-icon">✅</span>
              <span>Gestión de Tareas</span>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-icon">⏰</span>
              <span>Recordatorios</span>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-icon">🌤️</span>
              <span>Clima en Tiempo Real</span>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-icon">📰</span>
              <span>Noticias Actuales</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__graphic">
            <div className="hero__circle hero__circle--1"></div>
            <div className="hero__circle hero__circle--2"></div>
            <div className="hero__circle hero__circle--3"></div>
            <div className="hero__assistant-icon">🤖</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 