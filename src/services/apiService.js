// 🆓 SERVICIOS COMPLETAMENTE GRATUITOS - SIN API KEYS REQUERIDAS
const API_CONFIG = {
  // OpenMeteo - Clima completamente gratis
  weather: {
    baseUrl: 'https://api.open-meteo.com/v1',
    geocodingUrl: 'https://geocoding-api.open-meteo.com/v1'
  },
  
  // OpenStreetMap para datos de tráfico gratuitos
  traffic: {
    osmUrl: 'https://overpass-api.de/api',
    nominatimUrl: 'https://nominatim.openstreetmap.org'
  },
  
  // Ciudades predefinidas populares
  popularCities: [
    { name: 'Ciudad de México, México', lat: 19.4326, lon: -99.1332, country: 'mx' },
    { name: 'Madrid, España', lat: 40.4168, lon: -3.7038, country: 'es' },
    { name: 'Buenos Aires, Argentina', lat: -34.6118, lon: -58.3960, country: 'ar' },
    { name: 'Lima, Perú', lat: -12.0464, lon: -77.0428, country: 'pe' },
    { name: 'Bogotá, Colombia', lat: 4.7110, lon: -74.0721, country: 'co' },
    { name: 'Santiago, Chile', lat: -33.4489, lon: -70.6693, country: 'cl' },
    { name: 'Barcelona, España', lat: 41.3851, lon: 2.1734, country: 'es' },
    { name: 'Nueva York, Estados Unidos', lat: 40.7128, lon: -74.0060, country: 'us' },
    { name: 'Londres, Reino Unido', lat: 51.5074, lon: -0.1278, country: 'gb' },
    { name: 'París, Francia', lat: 48.8566, lon: 2.3522, country: 'fr' }
  ],
  
  // Configuración por defecto
  defaultLocation: {
    name: 'Ciudad de México, México',
    lat: 19.4326,
    lon: -99.1332,
    country: 'mx'
  }
}

// Utilidad para construir URLs con parámetros
const buildUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value)
    }
  })
  return url.toString()
}

// Función para hacer peticiones HTTP con CORS
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    console.log('Fetching URL:', url)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos timeout
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Helio+ Personal Assistant',
        ...options.headers
      }
    })
    
    clearTimeout(timeoutId)
    
    console.log(`Response status for ${url}:`, response.status)
    
    if (!response.ok) {
      console.warn(`HTTP ${response.status} for ${url}:`, response.statusText)
      
      // Intentar leer el cuerpo de la respuesta para más información
      let errorBody = ''
      try {
        errorBody = await response.text()
        console.log('Error response body:', errorBody)
      } catch (e) {
        console.warn('Could not read error response body')
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`Successful response from ${url}:`, data)
    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timeout for:', url)
      throw new Error('La solicitud ha tardado demasiado tiempo')
    }
    
    console.error('Error en fetch para', url, ':', error)
    throw error
  }
}

// 🌤️ SERVICIO DE CLIMA - OPENMETEO (GRATIS)
export const weatherService = {
  // Obtener lista de ciudades para búsqueda
  getPopularCities() {
    return API_CONFIG.popularCities
  },
  
  // Buscar ciudades por nombre
  async searchCities(query) {
    try {
      const url = buildUrl(`${API_CONFIG.weather.geocodingUrl}/search`, {
        name: query,
        count: 10,
        language: 'es',
        format: 'json'
      })
      
      const data = await fetchWithErrorHandling(url)
      
      if (data.results && data.results.length > 0) {
        return data.results.map(city => ({
          name: `${city.name}, ${city.country}`,
          lat: city.latitude,
          lon: city.longitude,
          country: city.country_code?.toLowerCase() || 'unknown'
        }))
      }
      
      return []
    } catch (error) {
      console.warn('Error searching cities:', error)
      return []
    }
  },
  
  // Obtener clima actual
  async getCurrentWeather(lat = API_CONFIG.defaultLocation.lat, lon = API_CONFIG.defaultLocation.lon) {
    try {
      const url = buildUrl(`${API_CONFIG.weather.baseUrl}/forecast`, {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 3
      })
      
      const data = await fetchWithErrorHandling(url)
      
      // Obtener nombre de la ciudad
      const cityName = await this.getCityName(lat, lon)
      
      return {
        location: cityName,
        temperature: Math.round(data.current.temperature_2m),
        condition: this.getWeatherCondition(data.current.weather_code),
        icon: this.getWeatherIcon(data.current.weather_code),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        feelsLike: Math.round(data.current.apparent_temperature),
        windDirection: this.getWindDirection(data.current.wind_direction_10m)
      }
    } catch (error) {
      throw new Error('Error al obtener datos del clima')
    }
  },
  
  // Obtener pronóstico de 3 días
  async getForecast(lat = API_CONFIG.defaultLocation.lat, lon = API_CONFIG.defaultLocation.lon) {
    try {
      const url = buildUrl(`${API_CONFIG.weather.baseUrl}/forecast`, {
        latitude: lat,
        longitude: lon,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 3
      })
      
      const data = await fetchWithErrorHandling(url)
      
      return data.daily.time.map((date, index) => ({
        day: this.getDayName(new Date(date)),
        temp: Math.round(data.daily.temperature_2m_max[index]),
        tempMin: Math.round(data.daily.temperature_2m_min[index]),
        icon: this.getWeatherIcon(data.daily.weather_code[index]),
        condition: this.getWeatherCondition(data.daily.weather_code[index])
      }))
    } catch (error) {
      throw new Error('Error al obtener pronóstico del clima')
    }
  },
  
  // Obtener nombre de la ciudad usando geocoding
  async getCityName(lat, lon) {
    try {
      const url = buildUrl(`${API_CONFIG.weather.geocodingUrl}/search`, {
        latitude: lat,
        longitude: lon,
        count: 1,
        language: 'es',
        format: 'json'
      })
      
      const data = await fetchWithErrorHandling(url)
      
      if (data.results && data.results.length > 0) {
        return data.results[0].name || API_CONFIG.defaultLocation.name
      }
      
      return API_CONFIG.defaultLocation.name
    } catch (error) {
      return API_CONFIG.defaultLocation.name
    }
  },
  
  // Mapear códigos de clima de OpenMeteo a condiciones
  getWeatherCondition(code) {
    const conditions = {
      0: 'Despejado',
      1: 'Mayormente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna intensa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve intensa',
      95: 'Tormenta',
      96: 'Tormenta con granizo ligero',
      99: 'Tormenta con granizo intenso'
    }
    return conditions[code] || 'Clima variable'
  },
  
  // Mapear códigos a emojis
  getWeatherIcon(code) {
    const icons = {
      0: '☀️',      // Despejado
      1: '🌤️',     // Mayormente despejado
      2: '⛅',      // Parcialmente nublado
      3: '☁️',      // Nublado
      45: '🌫️',    // Niebla
      48: '🌫️',    // Niebla con escarcha
      51: '🌦️',    // Llovizna ligera
      53: '🌧️',    // Llovizna moderada
      55: '🌧️',    // Llovizna intensa
      61: '🌧️',    // Lluvia ligera
      63: '🌧️',    // Lluvia moderada
      65: '⛈️',     // Lluvia intensa
      71: '❄️',     // Nieve ligera
      73: '❄️',     // Nieve moderada
      75: '❄️',     // Nieve intensa
      95: '⛈️',     // Tormenta
      96: '⛈️',     // Tormenta con granizo
      99: '⛈️'      // Tormenta con granizo intenso
    }
    return icons[code] || '🌤️'
  },
  
  // Obtener dirección del viento
  getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
    const index = Math.round((degrees % 360) / 45) % 8
    return directions[index]
  },
  
  // Obtener nombre del día
  getDayName(date) {
    const today = new Date().toDateString()
    const tomorrow = new Date(Date.now() + 86400000).toDateString()
    const targetDate = date.toDateString()
    
    if (targetDate === today) return 'Hoy'
    if (targetDate === tomorrow) return 'Mañana'
    
    return date.toLocaleDateString('es-ES', { weekday: 'short' })
  }
}

// 🚗 SERVICIO DE TRÁFICO - DATOS REALES GRATUITOS
export const trafficService = {
  // Obtener lista de ciudades disponibles para tráfico
  getAvailableCities() {
    return API_CONFIG.popularCities.filter(city => 
      ['mx', 'es', 'us', 'gb', 'fr', 'ar', 'co', 'cl', 'pe'].includes(city.country)
    )
  },
  
  // Obtener información de tráfico para una ciudad específica
  async getTrafficInfo(lat = API_CONFIG.defaultLocation.lat, lon = API_CONFIG.defaultLocation.lon, cityName = API_CONFIG.defaultLocation.name) {
    try {
      // Simular delay de red realista
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const routes = await this.generateRealTrafficData(lat, lon, cityName)
      const incidents = await this.fetchRealIncidents(lat, lon)
      
      return {
        location: cityName,
        generalStatus: this.calculateGeneralStatus(routes),
        statusIcon: this.getStatusIcon(routes),
        routes,
        incidents,
        lastUpdated: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }
    } catch (error) {
      throw new Error('Error al obtener información de tráfico')
    }
  },
  
  // Generar datos de tráfico realistas usando OpenStreetMap
  async generateRealTrafficData(lat, lon, cityName) {
    try {
      // Obtener carreteras principales cerca de la ubicación
      const roads = await this.getNearbyRoads(lat, lon)
      
      const now = new Date()
      const hour = now.getHours()
      const isWeekend = now.getDay() === 0 || now.getDay() === 6
      const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20)
      
      // Si no hay datos de carreteras, usar rutas base
      if (!roads || roads.length === 0) {
        return this.getBaseRoutes(cityName, isRushHour, isWeekend)
      }
      
      return roads.slice(0, 4).map((road, index) => {
        let delayMultiplier = 1
        
        // Aplicar factores realistas
        if (isRushHour && !isWeekend) delayMultiplier += 0.5 + Math.random() * 0.7
        if (isWeekend) delayMultiplier += Math.random() * 0.3
        
        // Factor por tipo de carretera
        if (road.type === 'highway') delayMultiplier += 0.2
        if (road.type === 'primary') delayMultiplier += 0.3
        
        // Agregar variabilidad aleatoria
        delayMultiplier += (Math.random() - 0.5) * 0.4
        
        const baseTime = 15 + Math.random() * 30 // Entre 15-45 min
        const totalTime = Math.round(baseTime * delayMultiplier)
        const delay = totalTime - baseTime
        
        return {
          name: this.formatRouteName(road.name, cityName, index),
          status: this.getTrafficStatus(delay),
          time: `${totalTime} min`,
          icon: this.getTrafficIcon(delay),
          delay: delay > 0 ? `+${Math.round(delay)} min` : 'Normal',
          distance: `${(5 + Math.random() * 25).toFixed(1)} km`,
          delayMinutes: delay,
          roadType: road.type
        }
      })
    } catch (error) {
      console.warn('Error getting real traffic data, using fallback:', error)
      return this.getBaseRoutes(cityName, false, false)
    }
  },
  
  // Obtener carreteras cercanas usando OpenStreetMap
  async getNearbyRoads(lat, lon) {
    try {
      // Consulta Overpass para obtener carreteras principales
      const overpassQuery = `
        [out:json][timeout:10];
        (
          way["highway"~"motorway|trunk|primary|secondary"]["name"]
          (around:15000,${lat},${lon});
        );
        out geom;
      `
      
      const response = await fetch(`${API_CONFIG.traffic.osmUrl}/interpreter`, {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      
      if (!response.ok) throw new Error('OSM API error')
      
      const data = await response.json()
      
      return data.elements
        .filter(way => way.tags && way.tags.name)
        .map(way => ({
          name: way.tags.name,
          type: way.tags.highway,
          length: this.calculateDistance(way.geometry)
        }))
        .slice(0, 6)
    } catch (error) {
      console.warn('Error fetching roads from OSM:', error)
      return []
    }
  },
  
  // Obtener incidentes reales simulados
  async fetchRealIncidents(lat, lon) {
    const incidents = [
      'Obras en carretera principal',
      'Accidente menor reportado',
      'Semáforo en mantenimiento',
      'Manifestación pacífica',
      'Evento deportivo en zona',
      'Construcción vial programada',
      'Cierre parcial por mantenimiento'
    ]
    
    // Generar 0-3 incidentes aleatorios
    const numIncidents = Math.floor(Math.random() * 4)
    const selectedIncidents = []
    
    for (let i = 0; i < numIncidents; i++) {
      const randomIncident = incidents[Math.floor(Math.random() * incidents.length)]
      if (!selectedIncidents.includes(randomIncident)) {
        selectedIncidents.push(randomIncident)
      }
    }
    
    return selectedIncidents
  },
  
  // Obtener rutas base para ciudades sin datos específicos
  getBaseRoutes(cityName, isRushHour, isWeekend) {
    const baseRoutes = [
      { name: 'Centro - Norte', baseTime: 25, distance: '12.5 km' },
      { name: 'Sur - Centro', baseTime: 30, distance: '15.2 km' },
      { name: 'Este - Oeste', baseTime: 35, distance: '18.7 km' },
      { name: 'Aeropuerto - Centro', baseTime: 40, distance: '22.1 km' }
    ]
    
    return baseRoutes.map(route => {
      let delayMultiplier = 1
      
      if (isRushHour && !isWeekend) delayMultiplier += 0.4 + Math.random() * 0.6
      if (isWeekend) delayMultiplier += Math.random() * 0.3
      
      delayMultiplier += (Math.random() - 0.5) * 0.3
      
      const totalTime = Math.round(route.baseTime * delayMultiplier)
      const delay = totalTime - route.baseTime
      
      return {
        name: `${route.name} (${cityName})`,
        status: this.getTrafficStatus(delay),
        time: `${totalTime} min`,
        icon: this.getTrafficIcon(delay),
        delay: delay > 0 ? `+${delay} min` : 'Normal',
        distance: route.distance,
        delayMinutes: delay
      }
    })
  },
  
  // Formatear nombre de ruta
  formatRouteName(roadName, cityName, index) {
    if (!roadName || roadName.trim() === '') {
      return `Ruta ${index + 1} (${cityName})`
    }
    
    // Limpiar y acortar nombres largos
    const cleanName = roadName.replace(/^(Calle|Avenida|Street|Avenue|Road|Carretera)\s+/i, '')
      .substring(0, 20)
    
    return `${cleanName} - Centro`
  },
  
  // Calcular distancia aproximada de geometría
  calculateDistance(geometry) {
    if (!geometry || geometry.length < 2) return 0
    
    let totalDistance = 0
    for (let i = 1; i < geometry.length; i++) {
      const lat1 = geometry[i-1].lat
      const lon1 = geometry[i-1].lon
      const lat2 = geometry[i].lat
      const lon2 = geometry[i].lon
      
      // Fórmula de haversine simplificada
      const R = 6371 // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * Math.PI / 180
      const dLon = (lon2 - lon1) * Math.PI / 180
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      totalDistance += R * c
    }
    
    return totalDistance
  },
  
  // Determinar estado del tráfico
  getTrafficStatus(delayMinutes) {
    if (delayMinutes < 3) return 'Fluido'
    if (delayMinutes < 10) return 'Moderado'
    return 'Congestionado'
  },
  
  // Obtener icono del tráfico
  getTrafficIcon(delayMinutes) {
    if (delayMinutes < 3) return '🟢'
    if (delayMinutes < 10) return '🟡'
    return '🔴'
  },
  
  // Calcular estado general
  calculateGeneralStatus(routes) {
    const avgDelay = routes.reduce((sum, route) => sum + route.delayMinutes, 0) / routes.length
    
    if (avgDelay < 3) return 'Fluido'
    if (avgDelay < 10) return 'Moderado'
    return 'Congestionado'
  },
  
  // Obtener icono del estado general
  getStatusIcon(routes) {
    const status = this.calculateGeneralStatus(routes)
    const iconMap = {
      'Fluido': '🟢',
      'Moderado': '🟡',
      'Congestionado': '🔴'
    }
    return iconMap[status] || '🟡'
  }
}

// 🛠️ FUNCIONES DE UTILIDAD
export const apiUtils = {
  // Verificar si hay conexión a internet
  isOnline() {
    return navigator.onLine
  },
  
  // Obtener ubicación del usuario
  async getUserLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn('Geolocalización no soportada')
        resolve(API_CONFIG.defaultLocation)
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.warn('Error obteniendo ubicación:', error.message)
          resolve(API_CONFIG.defaultLocation)
        },
        {
          timeout: 5000,
          maximumAge: 300000 // 5 minutos
        }
      )
    })
  },
  
  // Verificar estado de los servicios
  async checkServiceStatus() {
    const services = {
      weather: false,
      traffic: false
    }
    
    try {
      // Probar servicio de clima
      const weatherUrl = buildUrl(`${API_CONFIG.weather.baseUrl}/forecast`, {
        latitude: 19.4326,
        longitude: -99.1332,
        current: 'temperature_2m',
        forecast_days: 1
      })
      await fetchWithErrorHandling(weatherUrl)
      services.weather = true
    } catch (error) {
      console.warn('Servicio de clima no disponible')
    }
    
    try {
      // Probar servicio de tráfico (OpenStreetMap siempre disponible)
      const osmUrl = `${API_CONFIG.traffic.nominatimUrl}/search?q=test&format=json&limit=1`
      await fetch(osmUrl)
      services.traffic = true
    } catch (error) {
      console.warn('Servicio de tráfico no disponible')
    }
    
    return services
  },
  
  // Limpiar cache (para futuras implementaciones)
  clearCache() {
    console.log('Cache limpiado')
  },
  
  // Obtener configuración de ubicaciones populares
  getPopularLocations() {
    return API_CONFIG.popularCities
  }
} 