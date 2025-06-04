import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({ currentPath }) => {
  const navItems = [
    { path: '/', label: 'Inicio', exact: true },
    { path: '/about', label: 'Acerca de' },
    { path: '/contact', label: 'Contacto' }
  ]

  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return currentPath === path
    }
    return currentPath.startsWith(path)
  }

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navItems.map(({ path, label, exact }) => (
          <li key={path} className="navigation__item">
            <Link
              to={path}
              className={`navigation__link ${
                isActiveLink(path, exact) ? 'navigation__link--active' : ''
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation 