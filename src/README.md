# ⚽ GANJAH TEAM 🌿

> Sistema de gestión deportiva profesional para equipos de fútbol con base de datos en la nube

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Descripción

**GANJAH TEAM** es una aplicación web móvil completa para la gestión deportiva de equipos de fútbol. Permite administrar jugadores, programar partidos y generar equipos equilibrados mediante un sistema de sorteo visual con ruleta animada.

### ✨ Características Principales

- 🎲 **Sorteo Inteligente:** Generación automática de equipos balanceados por posición
- 👥 **Gestión de Jugadores:** CRUD completo con 22 jugadores (1 portero, 5 defensas, 6 medios, 10 delanteros)
- 📅 **Calendario de Partidos:** Programación y seguimiento de encuentros
- 🎨 **9 Temas Visuales:** Interfaz personalizable con dark mode
- ☁️ **Base de Datos en la Nube:** Persistencia con Supabase PostgreSQL
- 🔐 **Sistema de Roles:** Invitado/Administrador con control de acceso
- 📱 **100% Responsive:** Optimizado para móvil, tablet y desktop
- 🌿 **Logo Animado:** Identidad visual con hoja de marihuana de 9 hojas

---

## 📚 Documentación

| Guía | Descripción |
|------|-------------|
| 🚀 [Inicio Rápido](./QUICK_START.md) | Configuración en menos de 5 minutos |
| 📦 [GitHub Setup](./GITHUB_SETUP.md) | Cómo subir el proyecto a GitHub |
| 🚢 [Deployment](./DEPLOYMENT.md) | Desplegar en Vercel, Netlify, etc. |
| 🗄️ [Base de Datos](./database/README.md) | Scripts SQL y configuración de Supabase |
| 🤝 [Contribuir](./CONTRIBUTING.md) | Guía para colaboradores |
| 📊 [Estado Actual](./ESTADO_ACTUAL.md) | Estado del proyecto |

---

## ⚡ Inicio Rápido

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/ganjah-team.git
cd ganjah-team

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de Supabase

# 4. Ejecutar aplicación
npm run dev
```

Ver [QUICK_START.md](./QUICK_START.md) para instrucciones detalladas.

---

## 🚀 Instalación Completa

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratis)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ventemiguel00-code/ganjah-team.git
cd ganjah-team
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica-aqui
VITE_ADMIN_PASSWORD=jpgtsoccer
```

### 4. Configurar Base de Datos Supabase

Ve al **SQL Editor** de tu proyecto Supabase y ejecuta:

```sql
-- Crear tabla de jugadores
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT CHECK (position IN ('Portero', 'Defensa', 'Medio', 'Delantero')),
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de partidos
CREATE TABLE matches (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  team_a_score INTEGER,
  team_b_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de sorteos
CREATE TABLE draws (
  id TEXT PRIMARY KEY,
  match_id TEXT REFERENCES matches(id),
  team_a_players JSONB,
  team_b_players JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Cargar Jugadores Iniciales (Opcional)

```sql
-- Ver archivo SQL en la documentación para cargar los 22 jugadores base
```

### 6. Ejecutar la Aplicación

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🎯 Estado del Proyecto

```
✅ Base de datos: Supabase PostgreSQL
✅ Autenticación: Sistema de roles implementado
✅ CRUD Completo: Jugadores, Partidos, Sorteos
✅ UI/UX: Dark mode con 9 temas
✅ Responsive: Móvil/Tablet/Desktop
✅ Estado: 🟢 PRODUCCIÓN
```

---

## 🚀 Cómo Usar la Aplicación

### 🏠 **Inicio**
- Dashboard con estadísticas en tiempo real
- Cancha de fútbol interactiva
- Próximo partido
- Último sorteo realizado
- Botón "Realizar Sorteo"

### 👥 **Jugadores**
- 22 jugadores distribuidos por posiciones:
  - Portero: 1
  - Defensas: 5
  - Mediocampistas: 6
  - Delanteros: 10
- Filtrado por posición
- Agregar/Editar/Borrar (solo Admin)

### 📅 **Partidos**
- Lista de partidos próximos
- Historial de completados
- Agregar/Editar/Borrar (solo Admin)
- Registro de marcadores

### 👤 **Perfil**
- Estado: Invitado/Administrador
- Base de datos: **Supabase PostgreSQL** 🟢
- Selector de 9 temas visuales
- Login con PIN: **jpgtsoccer**

---

## 🎲 Flujo de Sorteo (3 Pasos)

### 1️⃣ **Selección de Jugadores**
- Marca los jugadores disponibles
- Mínimo 6 jugadores
- Vista organizada por posiciones

### 2️⃣ **Confirmación**
- Revisa la lista seleccionada
- Distribución por posiciones
- Opción de regresar y ajustar

### 3️⃣ **Generación de Equipos**
- Ruleta visual animada 🎡
- Distribución equitativa por posiciones
- Resultado: Equipo A vs Equipo B
- Se guarda automáticamente en Supabase

---

## 🎨 Temas Visuales (9 Opciones)

1. **Fire & Ice** - Contraste rojo/azul dinámico
2. **Ganjah Green** 🌿 - Verde natural (tema oficial)
3. **Cyberpunk** - Neon futurista
4. **Gradient** - Gradientes modernos
5. **Minimal** - Minimalista elegante
6. **Neon** - Neón vibrante
7. **Premium Dark** - Oscuro premium
8. **Retro Arcade** - Retro gaming
9. **Stadium** - Estadio deportivo

**Cambio automático:** El tema cambia automáticamente cada día a las 00:00 hrs

---

## 🔐 Sistema de Roles

### 👤 **Invitado** (por defecto)
- ✅ Ver jugadores
- ✅ Ver partidos
- ✅ Ver estadísticas
- ❌ No puede modificar datos

### 🔑 **Administrador**
- **PIN:** `jpgtsoccer`
- ✅ Todas las funciones de invitado
- ✅ Agregar/Editar/Borrar jugadores
- ✅ Agregar/Editar/Borrar partidos
- ✅ Realizar sorteos
- ✅ Editar marcadores

---

## 🗄️ Base de Datos Supabase

### Tablas Creadas:

#### `players`
```sql
- id (TEXT PRIMARY KEY)
- name (TEXT NOT NULL)
- position (TEXT CHECK IN ('Portero', 'Defensa', 'Medio', 'Delantero'))
- phone (TEXT)
- created_at (TIMESTAMP)
```

#### `matches`
```sql
- id (TEXT PRIMARY KEY)
- date (TEXT NOT NULL)
- time (TEXT NOT NULL)
- location (TEXT NOT NULL)
- is_completed (BOOLEAN DEFAULT FALSE)
- team_a_score (INTEGER)
- team_b_score (INTEGER)
- created_at (TIMESTAMP)
```

#### `draws`
```sql
- id (TEXT PRIMARY KEY)
- match_id (TEXT REFERENCES matches)
- team_a_players (JSONB)
- team_b_players (JSONB)
- created_at (TIMESTAMP)
```

---

## 🔧 Tecnologías

- ⚛️ **React** - Framework UI
- 🎨 **Tailwind CSS** - Estilos modernos
- 🗄️ **Supabase PostgreSQL** - Base de datos en la nube
- 📦 **TypeScript** - Type safety
- 🎭 **Shadcn/ui** - Componentes UI
- 🎨 **Lucide React** - Iconos
- 🎡 **Motion** - Animaciones suaves

---

## 🏗️ Estructura del Proyecto

```
📁 GANJAH TEAM/
│
├── 📄 App.tsx - Componente principal
├── 📄 README.md - Este archivo
│
├── 📁 components/
│   ├── HomePage.tsx - Dashboard principal
│   ├── PlayersPage.tsx - Gestión de jugadores
│   ├── MatchesPage.tsx - Gestión de partidos
│   ├── ProfilePage.tsx - Perfil y configuración
│   ├── DrawFlow.tsx - Flujo de sorteo (3 pasos)
│   ├── RouletteWheel.tsx - Ruleta visual
│   ├── SoccerField.tsx - Cancha interactiva
│   ├── GanjahLogo.tsx - Logo animado 🌿
│   └── themes/ - 9 temas visuales
│
├── 📁 utils/
│   ├── supabaseClient.ts - Cliente de Supabase ✅
│   ├── supabaseService.ts - Funciones CRUD
│   ├── sorteo.ts - Algoritmo de balanceo
│   ├── dateUtils.ts - Utilidades de fecha
│   └── themeUtils.ts - Sistema de temas
│
├── 📁 data/
│   └── mockData.ts - 22 jugadores reales
│
└── 📁 types/
    └── index.ts - Tipos TypeScript
```

---

## 📱 Compatibilidad

### Navegadores Soportados:
- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS/Android)

### Dispositivos:
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

---

## 🐛 Solución de Problemas

### Problema: Los datos no se guardan
**Solución:** Verifica que estás en modo Administrador (PIN: jpgtsoccer)

### Problema: La app se ve lenta
**Solución:** Recarga con Ctrl+Shift+R (hard reload) para limpiar caché

### Problema: No aparecen los jugadores
**Solución:** 
1. Abre la consola (F12)
2. Busca errores de Supabase
3. Verifica que las tablas existan en Supabase Dashboard

### Problema: Error al hacer sorteo
**Solución:** Selecciona al menos 6 jugadores antes de confirmar

---

## 📊 Características Destacadas

```
☁️ Datos en la nube con Supabase
🔒 Seguridad con RLS (Row Level Security)
⚡ Rendimiento optimizado
🎨 9 temas visuales intercambiables
🎲 Sorteo inteligente por posiciones
📊 Dashboard interactivo
📱 Diseño responsive
💾 Persistencia automática
🌿 Logo oficial GANJAH TEAM
```

---

## 📈 Próximas Funcionalidades

- [ ] Estadísticas por jugador
- [ ] Historial de sorteos completo
- [ ] Exportar partidos a PDF
- [ ] Notificaciones WhatsApp
- [ ] Sistema de votación MVP
- [ ] Gráficas de rendimiento

---

## 👥 Jugadores del Equipo (22 Total)

### 🥅 Portero (1)
- **ARTURO**

### 🛡️ Defensas (5)
- **ALEX**
- **GULLE**
- **JEFF**
- **SANMI**
- **PAPO**

### ⚡ Mediocampistas (6)
- **JP**
- **ESTEBAN**
- **LERMA**
- **JUAN MA**
- **DAVID PRI**
- **MIKE**

### 🎯 Delanteros (10)
- **CHAPA**
- **MIGUELITO**
- **JOSE**
- **OLAVE**
- **PITO**
- **PERICO**
- **LEO**
- **NICOL**
- **JASON**
- **CIFU**

---

## 🎯 Acceso Rápido a Supabase

**Dashboard del Proyecto:**
https://supabase.com/dashboard/project/osptacxbwmmptkuzynym

**Ver Tablas:**
https://supabase.com/dashboard/project/osptacxbwmmptkuzynym/editor

**SQL Editor:**
https://supabase.com/dashboard/project/osptacxbwmmptkuzynym/sql/new

---

## 📜 Licencia

Proyecto desarrollado para gestión deportiva privada del equipo GANJAH TEAM.

---

## ✨ Créditos

**Desarrollado con:**
- ❤️ Pasión por el fútbol
- 🌿 Estética GANJAH TEAM
- ⚡ Tecnología moderna
- 🎨 Diseño dark mode profesional

---

**GANJAH TEAM - Gestión deportiva profesional en la nube** ⚽🌿✨

**Versión:** 2.0.0 con Supabase Database  
**Fecha:** 21 de Octubre, 2025  
**Estado:** ✅ Configurado y funcionando perfectamente
