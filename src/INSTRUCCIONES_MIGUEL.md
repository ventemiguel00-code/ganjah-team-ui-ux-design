# 🚀 Instrucciones Para Miguel - Subir a GitHub

## ⚠️ IMPORTANTE

**No puedo hacer push directamente a tu GitHub** porque:
- Este es un entorno de Figma Make (no tiene acceso a Git)
- Necesitas tu autenticación de GitHub
- Solo tú puedes hacer commits a tu repositorio

**PERO** he preparado todo para que sea super fácil 👇

---

## 📦 Paso 1: Descargar el Proyecto

Desde Figma Make:
1. Descarga todos los archivos del proyecto
2. Guárdalos en una carpeta en tu computadora
3. Ejemplo: `C:\Users\Miguel\Documents\ganjah-team\`

---

## 🔧 Paso 2: Abrir Terminal

### En Windows:
1. Abre la carpeta del proyecto
2. Haz **Shift + Click derecho** en la carpeta
3. Selecciona "Abrir PowerShell aquí" o "Abrir terminal aquí"

### En Mac/Linux:
1. Abre Terminal
2. Navega a la carpeta:
   ```bash
   cd ~/Documents/ganjah-team
   ```

---

## 🚀 Paso 3: Ejecutar el Script

Ya creé los scripts para ti. Solo elige según tu sistema operativo:

### 🪟 WINDOWS:
```bash
SUBIR_A_GITHUB.bat
```

### 🐧 MAC/LINUX:
```bash
chmod +x SUBIR_A_GITHUB.sh
./SUBIR_A_GITHUB.sh
```

El script hace TODO automáticamente:
- ✅ Configura Git
- ✅ Inicializa el repositorio
- ✅ Verifica que .env no se suba
- ✅ Hace el commit inicial
- ✅ Conecta con tu GitHub
- ✅ Sube el código

---

## 🔐 Autenticación de GitHub

Cuando el script intente subir el código, GitHub te pedirá autenticación:

### Opción 1: Personal Access Token (Recomendado)

1. Ve a: https://github.com/settings/tokens
2. Haz clic en "Generate new token (classic)"
3. Dale un nombre: "GANJAH TEAM"
4. Marca los permisos: `repo` (todos)
5. Genera el token
6. **COPIA EL TOKEN** (solo lo verás una vez)

Cuando el script pida contraseña:
- **Usuario:** ventemiguel00-code
- **Contraseña:** (pega tu token, no tu contraseña de GitHub)

### Opción 2: GitHub CLI (Más fácil)

Instala GitHub CLI primero:
- Windows: `winget install --id GitHub.cli`
- Mac: `brew install gh`

Luego autentica:
```bash
gh auth login
```

Sigue las instrucciones y después ejecuta el script.

---

## 📝 MÉTODO MANUAL (Si el script no funciona)

### Paso a paso:

```bash
# 1. Configurar Git
git config --global user.name "ventemiguel00-code"
git config --global user.email "ventemiguel00@gmail.com"

# 2. Inicializar repositorio
git init

# 3. Agregar archivos
git add .

# 4. Hacer commit
git commit -m "Initial commit: GANJAH TEAM v1.0"

# 5. Cambiar a main
git branch -M main

# 6. Conectar con GitHub
git remote add origin https://github.com/ventemiguel00-code/ganjah-team.git

# 7. Subir código
git push -u origin main
```

---

## ✅ Verificar que Funcionó

1. Ve a: https://github.com/ventemiguel00-code/ganjah-team
2. Deberías ver todos tus archivos
3. Verifica que NO veas el archivo `.env` (debe estar oculto)

---

## 🚨 Si Hay Problemas

### Error: "repository not found"

Tu repositorio no existe. Créalo:
1. Ve a https://github.com/new
2. Nombre: `ganjah-team`
3. **NO** marques "Initialize with README"
4. Haz clic en "Create repository"
5. Ejecuta el script de nuevo

### Error: "failed to push"

El repositorio ya tiene contenido. Usa force push:
```bash
git push -u origin main --force
```

### Error: "Permission denied"

Usa un Personal Access Token (ver arriba).

### El archivo .env se subió

¡URGENTE! Elimínalo:
```bash
git rm --cached .env
git commit -m "Remove .env file"
git push
```

Luego regenera tus claves de Supabase.

---

## 🎯 Después de Subir

### 1. Verifica el Repositorio

Checklist:
- [ ] Todos los archivos están
- [ ] `.env` NO está visible
- [ ] README.md se ve bien
- [ ] LICENSE.md existe

### 2. Despliega en Vercel

¡Ahora puedes desplegar en Vercel!

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Importa desde GitHub: `ventemiguel00-code/ganjah-team`
4. Agrega variables de entorno:
   ```
   VITE_SUPABASE_URL=https://osptacxbwmmptkuzynym.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-aqui
   VITE_ADMIN_PASSWORD=jpgtsoccer
   ```
5. Haz clic en "Deploy"

En 2 minutos tendrás tu app en línea: `ganjah-team.vercel.app`

### 3. Comparte con tu Equipo

Dale la URL a tus compañeros de equipo y empiecen a usarla.

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Lee el mensaje de error completo**
2. Búscalo en Google (muy probablemente ya tiene solución)
3. Abre un Issue en GitHub
4. O escríbeme y te ayudo

---

## 🎉 ¡Éxito!

Una vez que esté en GitHub y desplegado en Vercel:

✅ Tu código está respaldado en la nube  
✅ Puedes trabajar en equipo  
✅ Cada cambio se despliega automáticamente  
✅ Tienes una URL profesional para compartir  

---

**Tu repositorio:** https://github.com/ventemiguel00-code/ganjah-team

**¡Mucha suerte con GANJAH TEAM!** ⚽🌿✨
