import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import AppRoutes from './routes/AppRoutes'
import Layout from './components/layout/Layout'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import './styles/globals.css'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
