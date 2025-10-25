# ⚡ Comandos Rápidos - GANJAH TEAM

## 🚀 Subir a GitHub (PRIMERA VEZ)

### Windows PowerShell:
```powershell
.\SUBIR_A_GITHUB.bat
```

### Mac/Linux Terminal:
```bash
chmod +x SUBIR_A_GITHUB.sh
./SUBIR_A_GITHUB.sh
```

### Manual (si los scripts no funcionan):
```bash
git init
git add .
git commit -m "Initial commit: GANJAH TEAM v1.0"
git branch -M main
git remote add origin https://github.com/ventemiguel00-code/ganjah-team.git
git push -u origin main
```

---

## 🔄 Actualizar GitHub (después de cambios)

```bash
git add .
git commit -m "Descripción de tus cambios"
git push
```

---

## 📥 Clonar desde GitHub

```bash
git clone https://github.com/ventemiguel00-code/ganjah-team.git
cd ganjah-team
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev
```

---

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 🗄️ Base de Datos (Supabase)

### Ver datos:
https://supabase.com/dashboard/project/osptacxbwmmptkuzynym/editor

### Ejecutar SQL:
https://supabase.com/dashboard/project/osptacxbwmmptkuzynym/sql/new

### Script de setup:
Copia y pega el contenido de `/database/setup.sql` en el SQL Editor

---

## 🚢 Desplegar en Vercel

### Opción 1: Desde la Web
1. Ve a https://vercel.com
2. New Project → Import from GitHub
3. Selecciona: `ventemiguel00-code/ganjah-team`
4. Agrega variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`
5. Deploy

### Opción 2: Desde Terminal
```bash
npm install -g vercel
vercel login
vercel
```

---

## 🔍 Verificar Estado

```bash
# Ver archivos modificados
git status

# Ver diferencias
git diff

# Ver historial de commits
git log --oneline

# Ver ramas
git branch
```

---

## 🆘 Solución de Problemas

### Error: "repository not found"
```bash
# Crear repositorio en GitHub primero, luego:
git remote remove origin
git remote add origin https://github.com/ventemiguel00-code/ganjah-team.git
git push -u origin main
```

### Error: "Permission denied"
```bash
# Usa Personal Access Token
# Genera uno en: https://github.com/settings/tokens
# Cuando pida contraseña, usa el token
```

### Eliminar .env del repositorio (si se subió por error)
```bash
git rm --cached .env
git commit -m "Remove .env from repository"
git push
```

### Resetear a un commit anterior
```bash
git log --oneline  # Ver commits
git reset --hard COMMIT_ID
git push --force
```

---

## 📱 Probar la App

### Local:
```
http://localhost:5173
```

### Producción (después de desplegar):
```
https://ganjah-team.vercel.app
```

---

## 🔐 Credenciales

### PIN Admin:
```
jpgtsoccer
```

### Supabase URL:
```
https://osptacxbwmmptkuzynym.supabase.co
```

---

## 📚 Más Información

- 📖 [README](./README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 📦 [GitHub Setup](./GITHUB_SETUP.md)
- 🗄️ [Database Guide](./database/README.md)

---

## ✅ Workflow Recomendado

```bash
# 1. Hacer cambios en el código
# 2. Guardar archivos

# 3. Probar localmente
npm run dev

# 4. Si funciona, subir a GitHub
git add .
git commit -m "feat: descripción del cambio"
git push

# 5. Vercel desplegará automáticamente
```

---

**Repositorio:** https://github.com/ventemiguel00-code/ganjah-team  
**Issues:** https://github.com/ventemiguel00-code/ganjah-team/issues

⚽🌿
