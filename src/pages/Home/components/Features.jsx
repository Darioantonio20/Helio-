import './Features.css'

const Features = () => {
  const features = [
    {
      id: 1,
      title: '📝 Asistente Personal',
      description: 'Notas, tareas, recordatorios y agenda. Todo sincronizado y organizado para tu productividad.',
      category: 'personal'
    },
    {
      id: 2,
      title: '🚀 Productividad',
      description: 'Genera textos, resúmenes, traduce y convierte voz a texto con IA avanzada.',
      category: 'productivity'
    },
    {
      id: 3,
      title: '📰 Información Útil',
      description: 'Noticias actuales, clima en tiempo real y estado del tráfico. Mantente siempre informado.',
      category: 'information'
    },
    {
      id: 4,
      title: '🎓 Educación',
      description: 'Resuelve dudas, aprende idiomas, obtén explicaciones y convierte archivos fácilmente.',
      category: 'education'
    },
    {
      id: 5,
      title: '💚 Bienestar',
      description: 'Rutinas saludables, seguimiento de hábitos, diario emocional y meditación guiada.',
      category: 'wellness'
    },
    {
      id: 6,
      title: '🎭 Entretenimiento',
      description: 'Chistes, cuentos, leyendas, fábulas y poemas. Creación y lectura de contenido divertido.',
      category: 'entertainment'
    }
  ]

  return (
    <section className="features">
      <div className="features__container">
        <div className="features__header">
          <h2 className="features__title">Tu Asistente Personal Completo</h2>
          <p className="features__subtitle">
            Descubre todas las herramientas que tenemos para organizar y mejorar tu vida diaria
          </p>
        </div>
        
        <div className="features__grid">
          {features.map((feature) => (
            <div key={feature.id} className={`feature-card feature-card--${feature.category}`}>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
              <button className="feature-card__button">
                Explorar →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 