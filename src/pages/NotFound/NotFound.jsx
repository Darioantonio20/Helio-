import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__subtitle">Página no encontrada</h2>
          <p className="not-found__message">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          
          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary">
              Volver al inicio
            </Link>
            <button 
              className="btn btn--secondary"
              onClick={() => window.history.back()}
            >
              Volver atrás
            </button>
          </div>
        </div>
        
        <div className="not-found__visual">
          <div className="not-found__graphic">
            <div className="not-found__planet"></div>
            <div className="not-found__rocket">🚀</div>
            <div className="not-found__stars">
              <span>⭐</span>
              <span>✨</span>
              <span>⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound 