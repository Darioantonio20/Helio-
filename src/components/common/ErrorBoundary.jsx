import { Component } from 'react'
import './ErrorBoundary.css'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Aquí podrías enviar el error a un servicio de logging
    console.error('ErrorBoundary capturó un error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <h2 className="error-boundary__title">¡Oops! Algo salió mal</h2>
            <p className="error-boundary__message">
              Ha ocurrido un error inesperado en la aplicación.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="error-boundary__details">
                <summary>Detalles del error (solo en desarrollo)</summary>
                <pre className="error-boundary__stack">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <button 
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Recargar página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 