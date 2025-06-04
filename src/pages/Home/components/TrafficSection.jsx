import { useState, useEffect } from 'react'
import { trafficService } from '../../../services/apiService'
import LocationSelector from '../../../components/common/LocationSelector'
import './TrafficSection.css'

const TrafficSection = () => {
  const [traffic, setTraffic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)

  useEffect(() => {
    // Usar ubicación por defecto al iniciar
    const availableCities = trafficService.getAvailableCities()
    const defaultLocation = availableCities[0] // Ciudad de México
    handleLocationSelect(defaultLocation)
  }, [])

  const fetchTrafficData = async (lat, lon, cityName) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Fetching traffic for: ${cityName} (${lat}, ${lon})`)
      const trafficData = await trafficService.getTrafficInfo(lat, lon, cityName)
      console.log('Traffic data received:', trafficData)
      setTraffic(trafficData)
    } catch (err) {
      console.error('Error fetching traffic:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSelect = (location) => {
    console.log('Traffic location selected:', location)
    setCurrentLocation(location)
    setTraffic(null) // Limpiar datos anteriores
    fetchTrafficData(location.lat, location.lon, location.name)
  }

  const handleRefresh = () => {
    if (currentLocation) {
      console.log('Refreshing traffic for:', currentLocation)
      fetchTrafficData(currentLocation.lat, currentLocation.lon, currentLocation.name)
    }
  }

  if (loading) {
    return (
      <div className="traffic-section">
        <div className="traffic-section__header">
          <h3>🚗 Tráfico</h3>
        </div>
        <div className="traffic-section__loading">
          <div className="loading-spinner">Cargando tráfico...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="traffic-section">
        <div className="traffic-section__header">
          <h3>🚗 Tráfico</h3>
          <button className="traffic-section__refresh" onClick={handleRefresh}>🔄</button>
        </div>
        <div className="traffic-section__error">
          <p>⚠️ {error}</p>
          <button className="btn btn--primary" onClick={handleRefresh}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="traffic-section">
      <div className="traffic-section__header">
        <h3>🚗 Tráfico</h3>
        <button className="traffic-section__refresh" onClick={handleRefresh}>🔄</button>
      </div>
      
      {/* Selector de ubicación */}
      <div className="traffic-section__location">
        <LocationSelector
          onLocationSelect={handleLocationSelect}
          popularLocations={trafficService.getAvailableCities()}
          searchFunction={null} // Sin búsqueda para tráfico, solo ciudades predefinidas
          placeholder="Seleccionar ciudad..."
          currentLocation={currentLocation}
          showCurrentLocation={false} // Deshabilitado para tráfico ya que necesita datos específicos
        />
      </div>
      
      {traffic ? (
        <>
          <div className="traffic-section__status">
            <div className="traffic-status">
              <span className="traffic-status__icon">{traffic.statusIcon}</span>
              <span className="traffic-status__text">Estado: {traffic.generalStatus}</span>
            </div>
            {traffic.lastUpdated && (
              <div className="traffic-section__updated">
                Actualizado: {traffic.lastUpdated}
              </div>
            )}
          </div>
          
          <div className="traffic-section__routes">
            {traffic.routes.map((route, index) => (
              <div key={index} className="traffic-route">
                <div className="traffic-route__main">
                  <span className="traffic-route__icon">{route.icon}</span>
                  <div className="traffic-route__info">
                    <div className="traffic-route__name">{route.name}</div>
                    <div className="traffic-route__details">
                      <span className="traffic-route__status">{route.status}</span>
                      {route.distance && (
                        <>
                          <span className="traffic-route__separator"> • </span>
                          <span className="traffic-route__distance">{route.distance}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="traffic-route__time">
                  <div className="traffic-route__duration">{route.time}</div>
                  <div className="traffic-route__delay">{route.delay}</div>
                </div>
              </div>
            ))}
          </div>
          
          {traffic.incidents && traffic.incidents.length > 0 && (
            <div className="traffic-section__incidents">
              <h4>⚠️ Incidentes</h4>
              {traffic.incidents.map((incident, index) => (
                <div key={index} className="traffic-incident">
                  {incident}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="traffic-section__loading">
          <p>No hay datos de tráfico disponibles</p>
        </div>
      )}
    </div>
  )
}

export default TrafficSection 