# 🗄️ Base de Datos - GANJAH TEAM

Esta carpeta contiene todos los scripts SQL necesarios para configurar la base de datos de Supabase.

---

## 📂 Archivos

### `setup.sql`
Script completo que incluye:
- ✅ Creación de tablas (players, matches, draws)
- ✅ Configuración de Row Level Security (RLS)
- ✅ Carga de 22 jugadores iniciales
- ✅ Scripts de verificación

---

## 🚀 Instalación Rápida

### Opción 1: Ejecutar Script Completo

1. Ve al **SQL Editor** de tu proyecto Supabase:
   ```
   https://supabase.com/dashboard/project/TU-PROYECTO-ID/sql/new
   ```

2. Copia y pega el contenido de `setup.sql`

3. Haz clic en **"RUN"**

4. Verifica que el resultado final muestre:
   ```
   Portero:    1
   Defensa:    5
   Medio:      6
   Delantero: 10
   TOTAL:     22 jugadores
   ```

### Opción 2: Paso a Paso

Si prefieres ejecutar en pasos separados:

#### 1️⃣ Crear Tablas
```sql
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT CHECK (position IN ('Portero', 'Defensa', 'Medio', 'Delantero')),
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

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

CREATE TABLE draws (
  id TEXT PRIMARY KEY,
  match_id TEXT REFERENCES matches(id) ON DELETE CASCADE,
  team_a_players JSONB,
  team_b_players JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2️⃣ Activar RLS
```sql
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;

-- Permitir acceso público de lectura
CREATE POLICY "Allow read access to all" ON players FOR SELECT USING (true);
CREATE POLICY "Allow read access to all" ON matches FOR SELECT USING (true);
CREATE POLICY "Allow read access to all" ON draws FOR SELECT USING (true);

-- Permitir acceso público de escritura
CREATE POLICY "Allow insert for all" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for all" ON players FOR UPDATE USING (true);
CREATE POLICY "Allow delete for all" ON players FOR DELETE USING (true);
```

#### 3️⃣ Cargar Jugadores

Ver sección de jugadores en `setup.sql` y ejecutar los INSERT statements.

---

## 🔍 Verificación

### Ver todos los jugadores
```sql
SELECT * FROM players ORDER BY 
  CASE position
    WHEN 'Portero' THEN 1
    WHEN 'Defensa' THEN 2
    WHEN 'Medio' THEN 3
    WHEN 'Delantero' THEN 4
  END,
  name;
```

### Contar por posición
```sql
SELECT position, COUNT(*) as total 
FROM players 
GROUP BY position;
```

### Ver partidos
```sql
SELECT * FROM matches ORDER BY date DESC, time DESC;
```

### Ver sorteos
```sql
SELECT 
  d.id,
  d.created_at,
  m.date,
  m.location
FROM draws d
LEFT JOIN matches m ON d.match_id = m.id
ORDER BY d.created_at DESC;
```

---

## 🧹 Limpiar Base de Datos

⚠️ **CUIDADO:** Esto eliminará todos los datos.

```sql
-- Borrar todos los datos
DELETE FROM draws;
DELETE FROM matches;
DELETE FROM players;
```

```sql
-- Borrar tablas completamente
DROP TABLE IF EXISTS draws;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS players;
```

---

## 📊 Estructura de Datos

### Tabla `players`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | TEXT | ID único del jugador |
| `name` | TEXT | Nombre del jugador |
| `position` | TEXT | Posición (Portero/Defensa/Medio/Delantero) |
| `phone` | TEXT | Teléfono (opcional) |
| `created_at` | TIMESTAMP | Fecha de creación |

### Tabla `matches`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | TEXT | ID único del partido |
| `date` | TEXT | Fecha del partido |
| `time` | TEXT | Hora del partido |
| `location` | TEXT | Ubicación |
| `is_completed` | BOOLEAN | Si está completado |
| `team_a_score` | INTEGER | Goles equipo A |
| `team_b_score` | INTEGER | Goles equipo B |
| `created_at` | TIMESTAMP | Fecha de creación |

### Tabla `draws`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | TEXT | ID único del sorteo |
| `match_id` | TEXT | FK a matches |
| `team_a_players` | JSONB | Array de jugadores equipo A |
| `team_b_players` | JSONB | Array de jugadores equipo B |
| `created_at` | TIMESTAMP | Fecha de creación |

---

## 🔐 Seguridad

### Row Level Security (RLS)

Las políticas actuales permiten acceso público. Para restringir:

```sql
-- Ejemplo: Solo permitir lectura
DROP POLICY IF EXISTS "Allow insert for all" ON players;
DROP POLICY IF EXISTS "Allow update for all" ON players;
DROP POLICY IF EXISTS "Allow delete for all" ON players;

-- Crear política solo de lectura
CREATE POLICY "Read only for all" ON players 
  FOR SELECT USING (true);
```

### Autenticación con Supabase Auth

Si quieres usar autenticación real de Supabase:

```sql
-- Solo el usuario autenticado puede modificar
CREATE POLICY "Authenticated users can modify" ON players
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## 🆘 Problemas Comunes

### Error: "permission denied for table players"

**Solución:** Asegúrate de que RLS esté configurado correctamente.

### Error: "relation players does not exist"

**Solución:** Ejecuta primero el script de creación de tablas.

### No aparecen los jugadores en la app

**Solución:** 
1. Verifica que las tablas existan
2. Verifica que los datos estén insertados
3. Revisa las variables de entorno de la app

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

¿Problemas? Abre un Issue en GitHub. 🚀
