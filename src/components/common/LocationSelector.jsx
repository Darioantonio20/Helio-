import { useState, useEffect, useRef } from 'react'
import './LocationSelector.css'

const LocationSelector = ({ 
  onLocationSelect, 
  popularLocations = [], 
  searchFunction = null, 
  placeholder = "Buscar ubicación...",
  currentLocation = null,
  showCurrentLocation = true 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const dropdownRef = useRef(null)

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Buscar ubicaciones cuando cambia el query
  useEffect(() => {
    const searchLocations = async () => {
      if (!searchQuery.trim() || !searchFunction) {
        setSearchResults([])
        return
      }

      if (searchQuery.length < 3) return

      setIsSearching(true)
      try {
        const results = await searchFunction(searchQuery)
        setSearchResults(results)
      } catch (error) {
        console.error('Error searching locations:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const debounceTimer = setTimeout(searchLocations, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, searchFunction])

  const handleLocationSelect = (location) => {
    onLocationSelect(location)
    setIsOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 300000
        })
      })

      const location = {
        name: 'Tu ubicación actual',
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        country: 'current'
      }

      handleLocationSelect(location)
    } catch (error) {
      console.error('Error getting current location:', error)
      alert('No se pudo obtener tu ubicación actual. Por favor, permite el acceso a la ubicación.')
    }
  }

  return (
    <div className="location-selector" ref={dropdownRef}>
      <button 
        className="location-selector__trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="location-selector__current">
          📍 {currentLocation ? currentLocation.name : 'Seleccionar ubicación'}
        </span>
        <span className={`location-selector__arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="location-selector__dropdown">
          {/* Buscador */}
          {searchFunction && (
            <div className="location-selector__search">
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="location-selector__input"
              />
              {isSearching && (
                <div className="location-selector__searching">🔄 Buscando...</div>
              )}
            </div>
          )}

          {/* Ubicación actual */}
          {showCurrentLocation && (
            <div className="location-selector__section">
              <button
                className="location-selector__item current"
                onClick={handleCurrentLocation}
              >
                <span className="location-selector__icon">📍</span>
                <span>Usar mi ubicación actual</span>
              </button>
            </div>
          )}

          {/* Resultados de búsqueda */}
          {searchResults.length > 0 && (
            <div className="location-selector__section">
              <div className="location-selector__section-title">Resultados de búsqueda</div>
              {searchResults.map((location, index) => (
                <button
                  key={`search-${index}`}
                  className="location-selector__item"
                  onClick={() => handleLocationSelect(location)}
                >
                  <span className="location-selector__icon">🌍</span>
                  <span>{location.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Ubicaciones populares */}
          {popularLocations.length > 0 && !searchQuery && (
            <div className="location-selector__section">
              <div className="location-selector__section-title">Ubicaciones populares</div>
              {popularLocations.map((location, index) => (
                <button
                  key={`popular-${index}`}
                  className="location-selector__item"
                  onClick={() => handleLocationSelect(location)}
                >
                  <span className="location-selector__icon">
                    {location.country === 'mx' ? '🇲🇽' : 
                     location.country === 'es' ? '🇪🇸' : 
                     location.country === 'us' ? '🇺🇸' : 
                     location.country === 'gb' ? '🇬🇧' : 
                     location.country === 'fr' ? '🇫🇷' : 
                     location.country === 'ar' ? '🇦🇷' : 
                     location.country === 'co' ? '🇨🇴' : 
                     location.country === 'cl' ? '🇨🇱' : 
                     location.country === 'pe' ? '🇵🇪' : '🌍'}
                  </span>
                  <span>{location.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Estado vacío */}
          {!searchQuery && popularLocations.length === 0 && (
            <div className="location-selector__empty">
              No hay ubicaciones disponibles
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LocationSelector 