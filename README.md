# 🌿 ARRELS — Plataforma Digital para Cooperativa Agrícola

> **TFG DAW 2025** · Laura Mira Abenza · [linkedin.com/in/lmiraabenza](https://linkedin.com/in/lmiraabenza)

Arrels (raíces en valenciano) es una plataforma web completa para la gestión digital de una cooperativa agrícola. Incluye panel de gestión interna multi-rol, cuaderno de campo con funcionamiento **offline-first**, monitorización de sensores IoT en tiempo real y tienda online bilingüe ES/EN.

---

## 🚀 Demo en vivo

| Servicio | URL |
|---|---|
| Web pública + Tienda | [arrels-coop.vercel.app](https://arrels-coop.vercel.app) |
| Panel cooperativa | [arrels-coop.vercel.app/login](https://arrels-coop.vercel.app/login) |
| API + Swagger | [arrels-api.railway.app/docs](https://arrels-api.railway.app/docs) |

**Credenciales de prueba:**
| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@arrels.coop | admin1234 |
| Ingeniero | ingeniero@arrels.coop | ingeniero1234 |
| Trabajador | trabajador@arrels.coop | trabajador1234 |
| Socio | socio@arrels.coop | socio1234 |

---

## ✨ Funcionalidades

### 🏢 Panel de la Cooperativa (web interna)
- **Auth JWT** con 6 roles diferenciados y permisos granulares
- **Ventas in situ** con control de stock automático
- **Alquiler de aperos** con calendario de disponibilidad y precio calculado por días
- **Fichajes** de trabajadores con geolocalización
- **Aportaciones** — registro de pesos y liquidaciones de socios
- **Mensajería** interna ingeniero ↔ socio
- **Planes de acción** personalizados por agricultor

### 🌾 App de Campo (PWA offline-first)
- Funciona **sin internet** usando Dexie.js (IndexedDB)
- Sincronización automática al recuperar conexión
- Geolocalización GPS en cada anotación
- Instalable en móvil como app nativa (PWA)

### 📡 Monitorización IoT
- Sensores ESP32: temperatura, humedad, luz solar, pH, lluvia, nivel de agua
- Protocolo MQTT → Raspberry Pi → HTTP → FastAPI
- Dashboard en tiempo real con WebSocket
- Historial de lecturas con gráficas Recharts

### 🛒 Tienda Online Pública
- Catálogo bilingüe **ES/EN** (toggle de idioma solo en productos)
- Carrito con cálculo de envío gratis +40€
- Integración Stripe en modo test

### 📰 Blog Agrícola
- Artículos con categorías y búsqueda
- Recursos oficiales: MAPA, AEMET, GVA
- Enlace directo a previsión meteorológica AEMET

---

## 🛠️ Stack Tecnológico

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

- **React Query** — gestión de estado del servidor
- **React Router** — navegación SPA
- **Dexie.js** — IndexedDB para modo offline
- **Recharts** — gráficas IoT
- **PWA** — instalable en móvil

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.13-3776AB?style=flat&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=flat&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

- **SQLAlchemy + Alembic** — ORM y migraciones
- **JWT + bcrypt** — autenticación segura
- **WebSocket** — tiempo real para IoT
- **MQTT (Mosquitto)** — protocolo IoT

### Hardware IoT
- **ESP32 DevKit** — nodo de sensores WiFi
- **Raspberry Pi 4** — gateway MQTT → HTTP
- **Sensores:** DHT22, BH1750, SEN0161 (pH), DS18B20, HC-SR04, YL-83

### Infraestructura
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## 🏗️ Arquitectura
Navegador (React + Vite)
↕ HTTP / WebSocket
FastAPI (Railway)
↕                    ↕
PostgreSQL (Railway)    MongoDB Atlas
↑
ESP32 → MQTT → Raspberry Pi → HTTP
---

## 🚀 Instalación local

### Requisitos
- Docker Desktop
- Python 3.12+
- Node.js 20 LTS

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Lau-Abenza/arrels-cooperativa
cd arrels-cooperativa

# 2. Levantar infraestructura
docker-compose up -d

# 3. Backend
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
python init_db.py              # Crear usuarios iniciales
uvicorn main:app --reload --port 8000

# 4. Frontend
cd ../frontend-web
npm install
npm run dev
```

Abre **http://localhost:5173** y entra con `admin@arrels.coop` / `admin1234`

---

## 📁 Estructura del proyecto
arrels-cooperativa/
├── backend/
│   ├── models/          # SQLAlchemy (12 modelos)
│   ├── routers/         # FastAPI (11 routers, 40+ endpoints)
│   ├── schemas/         # Pydantic
│   ├── migrations/      # Alembic
│   ├── main.py
│   └── init_db.py       # Script de datos iniciales
├── frontend-web/
│   ├── src/
│   │   ├── pages/       # 15 páginas React
│   │   ├── components/  # Layout, Sidebar, LayoutPublico
│   │   ├── context/     # AuthContext
│   │   ├── hooks/       # useSync (offline)
│   │   └── db.ts        # Dexie.js schema
│   └── vite.config.ts
├── hardware/
│   └── mosquitto.conf
└── docker-compose.yml
---

## 👩‍💻 Autora

**Laura Mira Abenza**
DAW · IES [Centro] · 2025
[LinkedIn](https://linkedin.com/in/lmiraabenza) · [GitHub](https://github.com/Lau-Abenza)

---

## 📄 Licencia

MIT License — consulta el archivo [LICENSE](LICENSE) para más detalles.