# 🔧 Configuración de APIs para Helio+ Asistente Personal

Helio+ utiliza servicios externos para proporcionar información en tiempo real. Aquí te explico cómo obtener y configurar las API keys necesarias.

## 📋 APIs Utilizadas

| Servicio | Propósito | Plan Gratuito | Límites |
|----------|-----------|---------------|---------|
| [OpenWeatherMap](https://openweathermap.org/api) | 🌤️ Clima | ✅ Sí | 1,000 llamadas/día |
| [NewsAPI](https://newsapi.org/) | 📰 Noticias | ✅ Sí | 100 requests/día |
| [NewsData](https://newsdata.io/) | 📰 Noticias (respaldo) | ✅ Sí | 200 requests/día |
| [Google Maps](https://console.cloud.google.com/) | 🚗 Tráfico | ✅ Sí | $200 USD/mes gratis |

## 🚀 Configuración Paso a Paso

### 1. 🌤️ OpenWeatherMap (Clima)

1. Ve a [OpenWeatherMap API](https://openweathermap.org/api)
2. Haz clic en "Sign Up" para crear una cuenta gratuita
3. Confirma tu email
4. Ve a tu perfil → "My API keys"
5. Copia tu API key por defecto

**Límites del plan gratuito:**
- ✅ 1,000 llamadas por día
- ✅ Clima actual y pronóstico de 5 días
- ✅ Sin tarjeta de crédito requerida

### 2. 📰 NewsAPI (Noticias)

1. Ve a [NewsAPI](https://newsapi.org/)
2. Haz clic en "Get API Key"
3. Completa el registro (selecciona "Developer" para plan gratuito)
4. Confirma tu email
5. Copia tu API key del dashboard

**Límites del plan gratuito:**
- ✅ 100 requests por día
- ✅ Noticias de múltiples fuentes
- ❌ Solo para desarrollo (no producción)

### 3. 📰 NewsData API (Alternativa)

1. Ve a [NewsData.io](https://newsdata.io/)
2. Haz clic en "Free API Access"
3. Regístrate con tu email
4. Confirma tu email
5. Copia tu API key del dashboard

**Límites del plan gratuito:**
- ✅ 200 requests por día
- ✅ Permitido en producción
- ✅ Sin tarjeta de crédito

### 4. 🚗 Google Maps API (Tráfico)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo o selecciona uno existente
3. Habilita la "Directions API":
   - Ve a "APIs & Services" → "Library"
   - Busca "Directions API"
   - Haz clic en "Enable"
4. Crea credentials:
   - Ve a "APIs & Services" → "Credentials"
   - Haz clic en "Create Credentials" → "API Key"
   - Copia tu API key

**Límites del plan gratuito:**
- ✅ $200 USD de crédito mensual
- ✅ ~40,000 requests de Directions API
- ⚠️ Requiere tarjeta de crédito (no se cobra)

## 🔐 Configuración en el Proyecto

1. **Crea el archivo `.env.local`** en la raíz del proyecto:

```bash
# 🌤️ OpenWeatherMap API
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui

# 📰 NewsAPI
VITE_NEWS_API_KEY=tu_api_key_aqui

# 🚗 Google Maps API
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui

# 📰 NewsData API (opcional)
VITE_NEWSDATA_API_KEY=tu_api_key_aqui

# 📍 Ubicación por defecto (opcional)
VITE_DEFAULT_CITY=Ciudad de México
VITE_DEFAULT_COUNTRY=MX
VITE_DEFAULT_LAT=19.4326
VITE_DEFAULT_LON=-99.1332
```

2. **Reinicia el servidor de desarrollo:**

```bash
npm run dev
```

## 🔒 Seguridad y Mejores Prácticas

### ✅ Recomendaciones de Seguridad

- **Nunca** compartas tus API keys en repositorios públicos
- Usa diferentes keys para desarrollo y producción
- Configura restricciones de dominio cuando sea posible
- Monitorea el uso de tus APIs regularmente

### 🛡️ Restricciones Recomendadas

**Google Maps API:**
- Ve a "APIs & Services" → "Credentials"
- Edita tu API key
- En "Application restrictions":
  - Selecciona "HTTP referrers"
  - Añade tu dominio: `localhost:5173/*` (desarrollo)

**OpenWeatherMap:**
- En tu dashboard, puedes ver estadísticas de uso
- No requiere restricciones adicionales para desarrollo

## 🚨 Resolución de Problemas

### Error: "API key inválida"
- ✅ Verifica que la API key esté correcta
- ✅ Confirma que el servicio esté habilitado
- ✅ Revisa que el archivo `.env.local` esté en la raíz

### Error: "Límite excedido"
- ✅ Verifica tu uso diario en el dashboard de cada servicio
- ✅ Considera usar múltiples keys para desarrollo
- ✅ Implementa cache local para reducir llamadas

### Error: "CORS" o "Blocked request"
- ✅ Verifica las restricciones de dominio
- ✅ Asegúrate de usar HTTPS en producción
- ✅ Revisa la configuración de referrers

## 📊 Monitoreo de Uso

Cada servicio tiene un dashboard donde puedes monitorear tu uso:

- **OpenWeatherMap:** [Dashboard](https://openweathermap.org/api/statistics)
- **NewsAPI:** [Dashboard](https://newsapi.org/account)
- **NewsData:** [Dashboard](https://newsdata.io/dashboard)
- **Google Maps:** [Cloud Console](https://console.cloud.google.com/apis/dashboard)

## 🆓 Alternativas Gratuitas

Si necesitas más límites, considera estas alternativas:

### Para Clima:
- [WeatherAPI](https://www.weatherapi.com/) - 1M llamadas/mes gratis
- [Visual Crossing](https://www.visualcrossing.com/) - 1K requests/día

### Para Noticias:
- [NewsData.io](https://newsdata.io/) - Mejor alternativa a NewsAPI
- [Currents API](https://currentsapi.services/) - 600 requests/día

### Para Tráfico:
- [MapBox](https://www.mapbox.com/) - 50K requests/mes gratis
- [HERE Maps](https://developer.here.com/) - 250K requests/mes gratis

## ✨ Funcionalidades sin API Keys

Helio+ funcionará parcialmente sin API keys:

- 🏠 **Página principal**: ✅ Funciona completamente
- 📝 **Acciones rápidas**: ✅ Funciona completamente  
- 🌤️ **Clima**: ❌ Mostrará mensaje de error
- 📰 **Noticias**: ❌ Mostrará mensaje de error
- 🚗 **Tráfico**: ❌ Mostrará mensaje de error

---

## 📞 Soporte

Si tienes problemas configurando las APIs:

1. Revisa la [documentación oficial](README.md)
2. Verifica los logs de la consola del navegador
3. Consulta los dashboards de cada servicio

¡Tu asistente personal Helio+ estará listo para funcionar con datos reales! 🚀 