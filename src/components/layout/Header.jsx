import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppContext'
import Navigation from './Navigation'
import ThemeToggle from '../common/ThemeToggle'
import logoEmpresa from '../../assets/LogoEmpresa.jpeg'
import './Header.css'

const Header = () => {
  const { user } = useAppContext()
  const location = useLocation()

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img 
            src={logoEmpresa} 
            alt="Helio+ - Tu vida al alcance de un toque" 
            className="header__logo-img"
          />
          <div className="header__logo-text">
            <h1>Helio+</h1>
            <span>Tu asistente personal</span>
          </div>
        </Link>
        
        <Navigation currentPath={location.pathname} />
        
        <div className="header__actions">
          <ThemeToggle />
          
          {user ? (
            <div className="header__user">
              <span>Hola, {user.name}</span>
              <button className="btn btn--secondary">Cerrar Sesión</button>
            </div>
          ) : (
            <div className="header__auth">
              <button className="btn btn--primary">Iniciar Sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 