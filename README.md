# 🌟 Helio+ - Tu Asistente Personal Inteligente

<div align="center">

![Helio+ Logo](./src/assets/LogoEmpresa.jpeg)

**"Tu vida al alcance de un toque"**

Un asistente personal completo construido con React + Vite que te ayuda a organizar tu día con **datos reales en tiempo real**.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![APIs](https://img.shields.io/badge/APIs-Tiempo%20Real-00C851?style=flat&logo=api)](./API_SETUP.md)

</div>

## ✨ Características Principales

### 🎯 **Asistente Personal Completo**
- 📝 **Gestión de Notas y Tareas**
- 📅 **Calendario y Agenda Personal**
- ⏰ **Recordatorios Inteligentes**
- 🎯 **Seguimiento de Metas**

### 🌍 **Información en Tiempo Real**
- 🌤️ **Clima Actual y Pronóstico** - Powered by [OpenWeatherMap](https://openweathermap.org/api)
- 📰 **Noticias Actuales** - Powered by [NewsAPI](https://newsapi.org/) & [NewsData](https://newsdata.io/)
- 🚗 **Estado del Tráfico** - Powered by [Google Maps API](https://console.cloud.google.com/)

### 🚀 **Productividad**
- 🤖 **Generación de Textos con IA**
- 🗣️ **Conversión Voz a Texto**
- 🌐 **Traducción Automática**
- 📄 **Convertidor de Archivos**

### 🎓 **Educación y Aprendizaje**
- ❓ **Resolución de Dudas**
- 📚 **Explicaciones Interactivas**
- 🗣️ **Práctica de Idiomas**

### 💚 **Bienestar Personal**
- 🏃‍♂️ **Rutinas Saludables**
- 📊 **Seguimiento de Hábitos**
- 📔 **Diario Emocional**
- 🧘‍♀️ **Meditación Guiada**

### 🎭 **Entretenimiento**
- 😂 **Chistes y Humor**
- 📖 **Cuentos y Leyendas**
- 🎵 **Poemas Creativos**

## 🚀 Inicio Rápido

### 1. **Clonación e Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/helio-plus.git
cd helio-plus

# Instalar dependencias
npm install
```

### 2. **Configuración de APIs (Opcional pero Recomendado)**

Para obtener **datos reales en tiempo real**, configura las API keys:

```bash
# Crear archivo de variables de entorno
cp .env.example .env.local

# Editar .env.local con tus API keys
# Ver instrucciones completas en API_SETUP.md
```

**📖 [Guía Completa de Configuración de APIs](./API_SETUP.md)**

### 3. **Ejecutar la Aplicación**

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🔗 APIs Utilizadas

| Servicio | Propósito | Plan Gratuito | Estado |
|----------|-----------|---------------|--------|
| [OpenWeatherMap](https://openweathermap.org/api) | 🌤️ Clima | 1,000 llamadas/día | ✅ Integrado |
| [NewsAPI](https://newsapi.org/) | 📰 Noticias | 100 requests/día | ✅ Integrado |
| [NewsData](https://newsdata.io/) | 📰 Noticias (respaldo) | 200 requests/día | ✅ Integrado |
| [Google Maps](https://console.cloud.google.com/) | 🚗 Tráfico | $200 USD/mes gratis | ✅ Integrado |

> **💡 Nota:** La aplicación funciona sin API keys, pero mostrará mensajes informativos en lugar de datos reales.

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── common/          # Componentes generales
│   └── layout/          # Componentes de diseño
├── contexts/            # Context API para estado global
├── pages/               # Páginas principales
│   ├── Home/            # Página de inicio
│   ├── About/           # Acerca de
│   └── Contact/         # Contacto
├── services/            # Servicios de API
│   └── apiService.js    # Integración con APIs externas
├── styles/              # Estilos globales
├── utils/               # Utilidades y helpers
└── hooks/               # Custom hooks
```

### 🎨 **Sistema de Diseño**

- **CSS Variables** para theming consistente
- **Tema Claro/Oscuro** automático
- **Diseño Responsivo** Mobile-first
- **Animaciones Fluidas** y micro-interacciones
- **Accesibilidad (A11Y)** integrada

## 🌐 Funcionalidades Principales

### 📱 **Interfaz de Usuario**

- **🏠 Dashboard Principal** - Vista general del día
- **📝 Acciones Rápidas** - Crear notas, tareas, recordatorios
- **📊 Información en Tiempo Real** - Clima, noticias, tráfico
- **🎨 Tema Adaptativo** - Claro/oscuro automático
- **📱 Diseño Responsivo** - Optimizado para móvil y desktop

### 🔧 **Gestión de Estado**

- **Context API** para estado global
- **Reducers** para lógica compleja
- **Local Storage** para persistencia
- **Error Boundaries** para manejo de errores

### 🌍 **Integración de APIs**

- **Manejo de Errores** robusto
- **Fallbacks** cuando las APIs fallan
- **Caching** para optimizar requests
- **Rate Limiting** awareness

## 🚧 Desarrollo

### **Scripts Disponibles**

```bash
npm run dev         # Servidor de desarrollo
npm run build       # Construir para producción  
npm run preview     # Vista previa de build
npm run lint        # Linter ESLint
```

### **Tecnologías Utilizadas**

- ⚛️ **React 18+** - Biblioteca principal
- ⚡ **Vite** - Build tool y dev server
- 🎨 **CSS Modules** - Estilos modulares
- 🧭 **React Router** - Navegación
- 🌐 **Fetch API** - Peticiones HTTP
- 📱 **Progressive Web App** (PWA) ready

## 🔒 Seguridad y Privacidad

- 🔐 **API Keys** seguras (variables de entorno)
- 🚫 **Sin tracking** externo
- 📍 **Geolocalización** opcional
- 🛡️ **Validación** de inputs
- 🔒 **HTTPS** requerido en producción

## 🤝 Contribución

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

¿Necesitas ayuda? 

- 📖 **Documentación**: [API Setup Guide](./API_SETUP.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/tu-usuario/helio-plus/issues)
- 💬 **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/helio-plus/discussions)

---

<div align="center">

**¡Tu vida al alcance de un toque con Helio+! 🌟**

Made with ❤️ by [Tu Nombre]

</div>
