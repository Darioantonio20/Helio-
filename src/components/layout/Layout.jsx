import { useAppContext } from '../../contexts/AppContext'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import './Layout.css'

const Layout = ({ children }) => {
  const { theme, loading } = useAppContext()

  return (
    <div className={`layout layout--${theme}`}>
      <Header />
      
      <div className="layout__main">
        <Sidebar />
        <main className="layout__content">
          {loading && (
            <div className="layout__loading">
              <div className="loading-spinner">Cargando...</div>
            </div>
          )}
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout 