# 📦 Cómo Subir GANJAH TEAM a GitHub

Guía paso a paso para subir tu proyecto a GitHub por primera vez.

---

## 📋 Requisitos Previos

- ✅ Tener una cuenta en [GitHub](https://github.com)
- ✅ Tener Git instalado en tu computadora
  - Windows: Descarga desde [git-scm.com](https://git-scm.com/)
  - Mac: Ya viene instalado o usa `brew install git`
  - Linux: `sudo apt-get install git`

---

## 🚀 Pasos para Subir el Proyecto

### 1️⃣ Configurar Git (Solo Primera Vez)

Abre tu terminal y configura tu nombre y email:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

### 2️⃣ Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz clic en el botón **"+"** arriba a la derecha
3. Selecciona **"New repository"**
4. Llena los datos:
   - **Repository name:** `ganjah-team`
   - **Description:** `Aplicación móvil deportiva para gestión de equipos de fútbol`
   - **Visibility:** Public o Private (tú decides)
   - ❌ **NO** marques "Initialize this repository with a README"
   - ❌ **NO** agregues .gitignore ni license (ya los tienes)
5. Haz clic en **"Create repository"**

### 3️⃣ Conectar tu Proyecto Local

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar Git (si no está inicializado)
git init

# Verificar que .gitignore existe
ls -la | grep .gitignore

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: GANJAH TEAM v1.0"

# Cambiar la rama a 'main' (si estás en 'master')
git branch -M main

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU-USUARIO/ganjah-team.git

# Subir el código
git push -u origin main
```

**⚠️ IMPORTANTE:** Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

### 4️⃣ Verificar

1. Refresca la página de tu repositorio en GitHub
2. Deberías ver todos tus archivos subidos
3. ¡Listo! 🎉

---

## 🔐 Proteger Información Sensible

### Verificar que .env NO se subió

```bash
git ls-files | grep .env
```

Si NO aparece nada, ¡perfecto! Tu archivo `.env` está protegido.

Si aparece, necesitas eliminarlo del repositorio:

```bash
# Eliminar .env del repositorio (sin borrarlo localmente)
git rm --cached .env

# Hacer commit del cambio
git commit -m "Remove .env from repository"

# Subir cambios
git push
```

### ⚠️ Si Ya Subiste Credenciales

Si accidentalmente subiste tu `.env` con credenciales:

1. **Regenera tus claves** en Supabase Dashboard
2. **Elimina el archivo** del historial de Git (usa `git filter-branch` o BFG Repo-Cleaner)
3. **Actualiza** tu archivo local `.env` con las nuevas claves

---

## 📝 Comandos Git Útiles

### Ver estado de archivos
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Crear nueva rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### Cambiar de rama
```bash
git checkout main
```

### Actualizar desde GitHub
```bash
git pull origin main
```

### Subir cambios
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

---

## 🌿 Flujo de Trabajo Recomendado

### Hacer Cambios

```bash
# 1. Crear rama para nueva funcionalidad
git checkout -b feature/nueva-feature

# 2. Hacer cambios en tu código
# ... editar archivos ...

# 3. Ver qué cambió
git status
git diff

# 4. Agregar archivos modificados
git add .

# 5. Hacer commit
git commit -m "feat: agregar nueva funcionalidad"

# 6. Subir rama
git push -u origin feature/nueva-feature
```

### Crear Pull Request

1. Ve a tu repositorio en GitHub
2. Verás un banner amarillo "Compare & pull request"
3. Haz clic y crea el PR
4. Revisa los cambios
5. Haz clic en "Merge pull request"
6. Elimina la rama feature

### Actualizar main local

```bash
git checkout main
git pull origin main
```

---

## 🏷️ Etiquetas y Releases

### Crear una etiqueta de versión

```bash
# Crear etiqueta
git tag -a v1.0.0 -m "Primera versión estable"

# Subir etiqueta
git push origin v1.0.0
```

### Crear Release en GitHub

1. Ve a tu repositorio
2. Haz clic en "Releases" (lado derecho)
3. Haz clic en "Create a new release"
4. Selecciona tu etiqueta (v1.0.0)
5. Llena título y descripción
6. Haz clic en "Publish release"

---

## 📊 Agregar Badges al README

Agrega estos badges al inicio de tu README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/TU-USUARIO/ganjah-team?style=social)
![GitHub forks](https://img.shields.io/github/forks/TU-USUARIO/ganjah-team?style=social)
![GitHub issues](https://img.shields.io/github/issues/TU-USUARIO/ganjah-team)
![GitHub license](https://img.shields.io/github/license/TU-USUARIO/ganjah-team)
```

---

## 🤝 Colaboración

### Invitar Colaboradores

1. Ve a Settings > Collaborators
2. Haz clic en "Add people"
3. Ingresa el nombre de usuario de GitHub
4. Envía invitación

### Aceptar Pull Requests de Otros

1. Revisa el código
2. Comenta si hay cambios necesarios
3. Aprueba y haz merge
4. Elimina la rama

---

## 🔄 Sincronizar con Figma Make

Si hiciste cambios en Figma Make y quieres actualizarlos en GitHub:

```bash
# Guardar cambios
git add .
git commit -m "Update from Figma Make"
git push
```

---

## 🆘 Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote rm origin
git remote add origin https://github.com/TU-USUARIO/ganjah-team.git
```

### Error: "failed to push some refs"
```bash
# Traer cambios primero
git pull origin main --rebase
git push
```

### Error: "Permission denied (publickey)"
```bash
# Usar HTTPS en lugar de SSH
git remote set-url origin https://github.com/TU-USUARIO/ganjah-team.git
```

---

## 📚 Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Pro Git Book](https://git-scm.com/book/en/v2)

---

## ✅ Checklist Final

Antes de hacer tu repositorio público:

- [ ] Archivo `.env` está en `.gitignore`
- [ ] No hay credenciales en el código
- [ ] README.md está actualizado
- [ ] LICENSE está incluido
- [ ] CONTRIBUTING.md existe
- [ ] Contraseña de admin está en `.env.example` como placeholder

---

¡Tu proyecto GANJAH TEAM ya está en GitHub! 🎉⚽🌿

**Siguiente paso:** Considera desplegarlo en Vercel o Netlify (ver `DEPLOYMENT.md`)
