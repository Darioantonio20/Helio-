import { useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import './Contact.css'

const Contact = () => {
  const { setLoading, setError } = useAppContext()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulación de envío de formulario
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setError('Error al enviar el mensaje. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="contact">
        <div className="contact__container">
          <div className="contact__success">
            <h2>¡Mensaje enviado!</h2>
            <p>Gracias por contactarnos. Te responderemos pronto.</p>
            <button 
              className="btn btn--primary"
              onClick={() => setIsSubmitted(false)}
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact">
      <div className="contact__container">
        <header className="contact__header">
          <h1 className="contact__title">Contáctanos</h1>
          <p className="contact__subtitle">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
          </p>
        </header>

        <div className="contact__content">
          <div className="contact__info">
            <h3>Información de contacto</h3>
            <div className="contact__item">
              <strong>📧 Email:</strong>
              <p>hola@helioplus.com</p>
            </div>
            <div className="contact__item">
              <strong>📞 Teléfono:</strong>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact__item">
              <strong>📍 Dirección:</strong>
              <p>123 Innovation Street<br />Tech City, TC 12345</p>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Asunto *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn--primary btn--large">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact 