import { useState } from 'react'
import './Sidebar.css'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', href: '#dashboard' },
    { icon: '📝', label: 'Notas', href: '#notes' },
    { icon: '✅', label: 'Tareas', href: '#tasks' },
    { icon: '📅', label: 'Agenda', href: '#calendar' },
    { icon: '⏰', label: 'Recordatorios', href: '#reminders' },
    { icon: '📰', label: 'Noticias', href: '#news' },
    { icon: '🌤️', label: 'Clima', href: '#weather' },
    { icon: '🚗', label: 'Tráfico', href: '#traffic' },
    { icon: '🎓', label: 'Educación', href: '#education' },
    { icon: '💚', label: 'Bienestar', href: '#wellness' },
    { icon: '🎭', label: 'Entretenimiento', href: '#entertainment' },
    { icon: '⚙️', label: 'Configuración', href: '#settings' }
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      <button 
        className="sidebar__toggle"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        {isCollapsed ? '→' : '←'}
      </button>
      
      <div className="sidebar__content">
        <nav className="sidebar__nav">
          <h3 className="sidebar__title">Asistente Personal</h3>
          <ul className="sidebar__list">
            {menuItems.map((item, index) => (
              <li key={index} className="sidebar__item">
                <a href={item.href} className="sidebar__link">
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar 