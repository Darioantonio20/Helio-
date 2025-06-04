import { useState, useEffect } from 'react'
import { weatherService } from '../../../services/apiService'
import './WeatherSection.css'

const WeatherSection = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Ubicación fija para Ciudad de México
  const FIXED_LOCATION = {
    name: 'Ciudad de México, México',
    lat: 19.4326,
    lon: -99.1332,
    country: 'mx'
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Fetching weather for Ciudad de México')
      
      // Obtener clima actual y pronóstico en paralelo
      const [currentWeather, weatherForecast] = await Promise.all([
        weatherService.getCurrentWeather(FIXED_LOCATION.lat, FIXED_LOCATION.lon),
        weatherService.getForecast(FIXED_LOCATION.lat, FIXED_LOCATION.lon)
      ])
      
      console.log('Weather data received:', { currentWeather, weatherForecast })
      
      setWeather(currentWeather)
      setForecast(weatherForecast)
    } catch (err) {
      console.error('Error fetching weather:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    console.log('Refreshing weather for Ciudad de México')
    fetchWeatherData()
  }

  if (loading) {
    return (
      <div className="weather-section">
        <div className="weather-section__header">
          <h3>🌤️ Clima - Ciudad de México</h3>
        </div>
        <div className="weather-section__loading">
          <div className="loading-spinner">Cargando clima...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-section">
        <div className="weather-section__header">
          <h3>🌤️ Clima - Ciudad de México</h3>
          <button className="weather-section__refresh" onClick={handleRefresh}>🔄</button>
        </div>
        <div className="weather-section__error">
          <p>⚠️ {error}</p>
          <button className="btn btn--primary" onClick={handleRefresh}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-section">
      <div className="weather-section__header">
        <h3>🌤️ Clima - Ciudad de México</h3>
        <button className="weather-section__refresh" onClick={handleRefresh}>🔄</button>
      </div>
      
      {weather ? (
        <>
          <div className="weather-section__current">
            <div className="weather-current">
              <div className="weather-current__main">
                <span className="weather-current__icon">{weather.icon}</span>
                <div className="weather-current__temp">{weather.temperature}°C</div>
              </div>
              <div className="weather-current__info">
                <div className="weather-current__location">{weather.location}</div>
                <div className="weather-current__condition">{weather.condition}</div>
              </div>
            </div>
            
            <div className="weather-details">
              <div className="weather-detail">
                <span>💧 Humedad</span>
                <span>{weather.humidity}%</span>
              </div>
              <div className="weather-detail">
                <span>💨 Viento</span>
                <span>{weather.windSpeed} km/h {weather.windDirection}</span>
              </div>
              {weather.feelsLike && (
                <div className="weather-detail">
                  <span>🌡️ Sensación</span>
                  <span>{weather.feelsLike}°C</span>
                </div>
              )}
            </div>
          </div>
          
          {forecast.length > 0 && (
            <div className="weather-section__forecast">
              {forecast.map((day, index) => (
                <div key={index} className="weather-forecast-item">
                  <span className="forecast-day">{day.day}</span>
                  <span className="forecast-icon">{day.icon}</span>
                  <div className="forecast-temps">
                    <span className="forecast-temp-max">{day.temp}°</span>
                    {day.tempMin && (
                      <span className="forecast-temp-min">{day.tempMin}°</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="weather-section__loading">
          <p>No hay datos de clima disponibles</p>
        </div>
      )}
    </div>
  )
}

export default WeatherSection 