-- ============================================
-- GANJAH TEAM - Database Setup Script
-- ============================================
-- Descripción: Script completo para configurar
-- la base de datos en Supabase PostgreSQL
-- Fecha: 21 de Octubre, 2025
-- ============================================

-- ============================================
-- 1. CREAR TABLAS
-- ============================================

-- Tabla de jugadores
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT CHECK (position IN ('Portero', 'Defensa', 'Medio', 'Delantero')),
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de partidos
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  team_a_score INTEGER,
  team_b_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de sorteos
CREATE TABLE IF NOT EXISTS draws (
  id TEXT PRIMARY KEY,
  match_id TEXT REFERENCES matches(id) ON DELETE CASCADE,
  team_a_players JSONB,
  team_b_players JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. CONFIGURAR ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activar RLS en todas las tablas
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Allow read access to all" ON players 
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to all" ON matches 
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to all" ON draws 
  FOR SELECT USING (true);

-- Políticas de escritura pública (puedes restringir según necesites)
CREATE POLICY "Allow insert for all" ON players 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all" ON players 
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for all" ON players 
  FOR DELETE USING (true);

CREATE POLICY "Allow insert for all" ON matches 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all" ON matches 
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for all" ON matches 
  FOR DELETE USING (true);

CREATE POLICY "Allow insert for all" ON draws 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all" ON draws 
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for all" ON draws 
  FOR DELETE USING (true);

-- ============================================
-- 3. CARGAR DATOS INICIALES
-- ============================================

-- Limpiar datos existentes (CUIDADO: esto borra todo)
DELETE FROM draws;
DELETE FROM matches;
DELETE FROM players;

-- ============================================
-- PORTERO (1 jugador)
-- ============================================
INSERT INTO players (id, name, position) VALUES 
  ('15', 'ARTURO', 'Portero');

-- ============================================
-- DEFENSAS (5 jugadores)
-- ============================================
INSERT INTO players (id, name, position) VALUES 
  ('6', 'ALEX', 'Defensa'),
  ('7', 'GULLE', 'Defensa'),
  ('8', 'JEFF', 'Defensa'),
  ('9', 'SANMI', 'Defensa'),
  ('17', 'PAPO', 'Defensa');

-- ============================================
-- MEDIOCAMPISTAS (6 jugadores)
-- ============================================
INSERT INTO players (id, name, position) VALUES 
  ('1', 'JP', 'Medio'),
  ('2', 'ESTEBAN', 'Medio'),
  ('5', 'LERMA', 'Medio'),
  ('10', 'JUAN MA', 'Medio'),
  ('16', 'DAVID PRI', 'Medio'),
  ('20', 'MIKE', 'Medio');

-- ============================================
-- DELANTEROS (10 jugadores)
-- ============================================
INSERT INTO players (id, name, position) VALUES 
  ('3', 'CHAPA', 'Delantero'),
  ('4', 'MIGUELITO', 'Delantero'),
  ('11', 'JOSE', 'Delantero'),
  ('12', 'OLAVE', 'Delantero'),
  ('13', 'PITO', 'Delantero'),
  ('14', 'PERICO', 'Delantero'),
  ('18', 'LEO', 'Delantero'),
  ('19', 'NICOL', 'Delantero'),
  ('21', 'JASON', 'Delantero'),
  ('22', 'CIFU', 'Delantero');

-- ============================================
-- 4. VERIFICACIÓN
-- ============================================

-- Ver total de jugadores por posición
SELECT 
  position,
  COUNT(*) as total
FROM players
GROUP BY position
ORDER BY 
  CASE position
    WHEN 'Portero' THEN 1
    WHEN 'Defensa' THEN 2
    WHEN 'Medio' THEN 3
    WHEN 'Delantero' THEN 4
  END;

-- Resultado esperado:
-- Portero: 1
-- Defensa: 5
-- Medio: 6
-- Delantero: 10
-- TOTAL: 22 jugadores

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
