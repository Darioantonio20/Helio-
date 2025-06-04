import './QuickActions.css'

const QuickActions = () => {
  const quickActions = [
    {
      icon: '📝',
      title: 'Nota Rápida',
      description: 'Anota ideas al instante',
      action: () => console.log('Crear nota')
    },
    {
      icon: '✅',
      title: 'Nueva Tarea',
      description: 'Añadir a tu lista',
      action: () => console.log('Nueva tarea')
    },
    {
      icon: '⏰',
      title: 'Recordatorio',
      description: 'No olvides nada importante',
      action: () => console.log('Nuevo recordatorio')
    },
    {
      icon: '📅',
      title: 'Evento',
      description: 'Programa tu día',
      action: () => console.log('Nuevo evento')
    },
    {
      icon: '🎯',
      title: 'Meta',
      description: 'Define objetivos',
      action: () => console.log('Nueva meta')
    },
    {
      icon: '💡',
      title: 'Idea',
      description: 'Captura inspiración',
      action: () => console.log('Nueva idea')
    }
  ]

  return (
    <section className="quick-actions">
      <div className="container">
        <h2 className="quick-actions__title">Acciones Rápidas</h2>
        <div className="quick-actions__grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-card"
              onClick={action.action}
            >
              <span className="quick-action-card__icon">{action.icon}</span>
              <h3 className="quick-action-card__title">{action.title}</h3>
              <p className="quick-action-card__description">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickActions 