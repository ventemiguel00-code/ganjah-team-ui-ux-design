# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar GANJAH TEAM en diferentes plataformas.

---

## 📦 Opciones de Despliegue

### 1. Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Pasos:

1. **Conecta tu repositorio de GitHub**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub

2. **Configura las variables de entorno**
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-publica
   VITE_ADMIN_PASSWORD=jpgtsoccer
   ```

3. **Despliega**
   - Haz clic en "Deploy"
   - Espera 2-3 minutos
   - ¡Listo! Tu app está en línea

#### Comandos de Build:
```bash
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

### 2. Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

#### Pasos:

1. **Conecta tu repositorio**
   - Ve a [netlify.com](https://netlify.com)
   - Haz clic en "Add new site"
   - Importa desde GitHub

2. **Configuración de Build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Variables de Entorno**
   - Ve a Site settings > Environment variables
   - Agrega las mismas variables que en Vercel

4. **Despliega**
   - Guarda y despliega

---

### 3. GitHub Pages

#### Paso 1: Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

#### Paso 2: Modificar package.json

Agrega estos scripts:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://tu-usuario.github.io/ganjah-team"
}
```

#### Paso 3: Configurar vite.config.ts

Agrega la base:

```typescript
export default defineConfig({
  base: '/ganjah-team/',
  // resto de la configuración
});
```

#### Paso 4: Desplegar

```bash
npm run deploy
```

#### Paso 5: Configurar GitHub Pages

1. Ve a Settings > Pages en tu repositorio
2. Selecciona la rama `gh-pages`
3. Guarda

Tu sitio estará en: `https://tu-usuario.github.io/ganjah-team`

---

### 4. Render

1. **Crear Web Service**
   - Ve a [render.com](https://render.com)
   - Haz clic en "New +" > "Static Site"
   - Conecta tu repositorio

2. **Configuración**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

3. **Variables de Entorno**
   - Agrega tus variables de Supabase

---

## 🔒 Seguridad en Producción

### Variables de Entorno

**NUNCA** subas tu archivo `.env` a GitHub. El archivo `.gitignore` ya lo está excluyendo.

### Cambiar Contraseña de Admin

Antes de desplegar en producción, cambia la contraseña de admin:

```env
VITE_ADMIN_PASSWORD=tu-nueva-contraseña-segura
```

### Configurar Supabase RLS

Activa Row Level Security en tus tablas:

```sql
-- Activar RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;

-- Permitir lectura a todos
CREATE POLICY "Allow read access to all" ON players FOR SELECT USING (true);
CREATE POLICY "Allow read access to all" ON matches FOR SELECT USING (true);
CREATE POLICY "Allow read access to all" ON draws FOR SELECT USING (true);

-- Permitir escritura a todos (ajusta según necesites)
CREATE POLICY "Allow insert for all" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for all" ON players FOR UPDATE USING (true);
CREATE POLICY "Allow delete for all" ON players FOR DELETE USING (true);
```

---

## 📊 Monitoreo

### Vercel Analytics

Habilita Analytics en tu dashboard de Vercel para ver:
- Visitantes únicos
- Páginas más visitadas
- Rendimiento

### Supabase Dashboard

Monitorea tu base de datos:
- Número de queries
- Latencia
- Uso de storage

---

## 🔄 CI/CD

### Deploy Automático

Al usar Vercel o Netlify, cada `git push` a tu rama principal desplegará automáticamente.

### Preview Deployments

Cada Pull Request generará una preview URL para probar cambios antes de mergear.

---

## 🐛 Debugging en Producción

### Ver Logs

**Vercel:**
```bash
vercel logs tu-proyecto-url
```

**Netlify:**
- Ve a Deploys > Functions > Ver logs

### Common Issues

**Error 404 al refrescar:**
- Asegúrate de tener configurado SPA fallback
- En Vercel, crea `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Variables de entorno no funcionan:**
- Reinicia el despliegue después de agregar variables
- Verifica que empiecen con `VITE_`

---

## 📱 PWA (Próximamente)

Para convertir la app en PWA:

1. Instalar vite-plugin-pwa
2. Configurar manifest.json
3. Agregar service worker

---

## ✅ Checklist Pre-Despliegue

- [ ] Variables de entorno configuradas
- [ ] Contraseña de admin cambiada
- [ ] Build local exitoso (`npm run build`)
- [ ] Pruebas en diferentes navegadores
- [ ] Supabase RLS configurado
- [ ] README actualizado con URL de producción

---

¿Problemas al desplegar? Abre un Issue en GitHub. 🚀
