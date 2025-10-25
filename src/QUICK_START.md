# 🚀 Inicio Rápido - GANJAH TEAM

Esta guía te ayudará a poner en marcha el proyecto en **menos de 5 minutos**.

---

## ⚡ Configuración Express

### 1. Clonar e Instalar

```bash
# Clonar repositorio
git clone https://github.com/TU-USUARIO/ganjah-team.git
cd ganjah-team

# Instalar dependencias
npm install
```

### 2. Configurar Supabase

```bash
# Copiar archivo de ejemplo
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU-CLAVE-PUBLICA
VITE_ADMIN_PASSWORD=jpgtsoccer
```

### 3. Configurar Base de Datos

1. Ve a: https://supabase.com/dashboard
2. Abre **SQL Editor**
3. Copia y pega el contenido de `/database/setup.sql`
4. Haz clic en **RUN**

### 4. Ejecutar Aplicación

```bash
npm run dev
```

Abre: http://localhost:5173

---

## 🎯 Acceso Rápido

### Credenciales
- **PIN Admin:** `jpgtsoccer`

### URLs Importantes
- **App Local:** http://localhost:5173
- **Supabase Dashboard:** https://supabase.com/dashboard

---

## 📱 Usar la App

### 1️⃣ Ver Jugadores
- Haz clic en 👥 **Jugadores** (menú inferior)
- Deberías ver 22 jugadores

### 2️⃣ Hacer Sorteo
- Ve a 🏠 **Inicio**
- Haz clic en **"Iniciar Sorteo"**
- Selecciona jugadores
- ¡Genera equipos!

### 3️⃣ Cambiar Tema
- Ve a 👤 **Perfil**
- Selecciona uno de los 9 temas
- El cambio es instantáneo

---

## 🐛 Problemas Comunes

### No aparecen jugadores
✅ Verifica que ejecutaste el script SQL
✅ Revisa las credenciales en `.env`
✅ Abre la consola del navegador (F12)

### Error de compilación
✅ Borra `node_modules` y ejecuta `npm install` de nuevo
✅ Verifica que tienes Node.js 18+

### Error de Supabase
✅ Verifica que las credenciales sean correctas
✅ Verifica que RLS esté configurado

---

## 📚 Documentación Completa

- 📖 [README Principal](./README.md)
- 🚀 [Guía de Despliegue](./DEPLOYMENT.md)
- 📦 [Configurar GitHub](./GITHUB_SETUP.md)
- 🗄️ [Base de Datos](./database/README.md)
- 🤝 [Contribuir](./CONTRIBUTING.md)

---

## ✅ Siguiente Paso

Una vez que funciona localmente:

1. **Sube a GitHub** → Ver `GITHUB_SETUP.md`
2. **Despliega en Vercel** → Ver `DEPLOYMENT.md`
3. **Comparte la URL** con tu equipo

---

¿Problemas? Abre un Issue en GitHub. 🆘

**¡Que disfrutes GANJAH TEAM!** ⚽🌿
