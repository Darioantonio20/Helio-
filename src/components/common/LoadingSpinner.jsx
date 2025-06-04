import './LoadingSpinner.css'

const LoadingSpinner = ({ size = 'medium', text = 'Cargando...' }) => {
  return (
    <div className="loading-spinner">
      <div className={`loading-spinner__icon loading-spinner__icon--${size}`}>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
      </div>
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  )
}

export default LoadingSpinner 