import { useAppContext } from '../../contexts/AppContext'
import Hero from './components/Hero'
import Features from './components/Features'
import WeatherSection from './components/WeatherSection'
import TrafficSection from './components/TrafficSection'
import QuickActions from './components/QuickActions'
import './Home.css'

const Home = () => {
  const { user } = useAppContext()

  return (
    <div className="home">
      <Hero user={user} />
      
      {/* Sección de Acciones Rápidas */}
      <QuickActions />
      
      {/* Sección de Información Útil */}
      <section className="home__info-sections">
        <div className="container">
          <h2 className="home__section-title">Información en Tiempo Real</h2>
          <div className="home__info-grid">
            <WeatherSection />
            <TrafficSection />
          </div>
        </div>
      </section>
      
      {/* Características del Asistente */}
      <Features />
      
      <section className="home__cta">
        <div className="container">
          <h2>¿Listo para organizar tu vida?</h2>
          <p>Tu vida al alcance de un toque con nuestro asistente personal inteligente.</p>
          <button className="btn btn--primary btn--large">
            Comenzar ahora
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home 