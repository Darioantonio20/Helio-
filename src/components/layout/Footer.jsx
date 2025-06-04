import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>Helio+</h3>
            <p>Construyendo el futuro, una línea de código a la vez.</p>
          </div>
          
          <div className="footer__section">
            <h4>Enlaces</h4>
            <ul className="footer__links">
              <li><a href="/">Inicio</a></li>
              <li><a href="/about">Acerca de</a></li>
              <li><a href="/contact">Contacto</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4>Redes Sociales</h4>
            <div className="footer__social">
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="GitHub">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {currentYear} Helio+. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 