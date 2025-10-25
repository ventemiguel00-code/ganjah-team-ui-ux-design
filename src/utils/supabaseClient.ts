import { createClient } from '@supabase/supabase-js';

// ============================================================
// 🔧 CONFIGURACIÓN DE SUPABASE DATABASE
// ============================================================
// 
// ✅ CONFIGURADO Y LISTO PARA USAR
// Base de datos: osptacxbwmmptkuzynym
// URL: https://osptacxbwmmptkuzynym.supabase.co
//
// ============================================================

const SUPABASE_URL = 'https://osptacxbwmmptkuzynym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcHRhY3hid21tcHRrdXp5bnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTU4MjYsImV4cCI6MjA3NjYzMTgyNn0.Lb5nskAxyw0SKiTaTaS6rQvL5YlY2SRyBgpjdSN-6mY';

// Cliente de Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Verifica si Supabase está configurado correctamente
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Inicializa las tablas en la base de datos Supabase
 * Este script crea todas las tablas y los índices necesarios
 */
export async function initDatabase() {
  if (!isSupabaseConfigured()) {
    console.error('❌ Supabase no está configurado');
    return false;
  }

  try {
    console.log('🚀 Verificando base de datos Supabase...');

    // Verificar la conexión y si las tablas existen
    const { data, error } = await supabase.from('players').select('count', { count: 'exact', head: true });
    
    if (error) {
      // Error PGRST205 o 42P01 significa que las tablas no existen
      if (error.code === 'PGRST205' || error.code === '42P01' || error.message?.includes('Could not find the table')) {
        console.log('%c', 'font-size: 1px;');
        console.log('%c⚠️ ¡ACCIÓN REQUERIDA! ⚠️', 'background: #ef4444; color: white; font-size: 20px; padding: 10px 20px; font-weight: bold; border-radius: 5px;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c📋 Las tablas de la base de datos NO EXISTEN aún', 'font-size: 16px; color: #fbbf24; font-weight: bold;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c🔧 SIGUE ESTOS PASOS AHORA:', 'font-size: 14px; color: #10b981; font-weight: bold;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c1️⃣ Haz clic aquí → https://supabase.com/dashboard/project/osptacxbwmmptkuzynym/sql/new', 'font-size: 13px; color: #60a5fa;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c2️⃣ Abre el archivo "supabase-schema.sql" de tu proyecto', 'font-size: 13px; color: #60a5fa;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c3️⃣ Copia TODO el contenido del archivo (Ctrl+A, Ctrl+C)', 'font-size: 13px; color: #60a5fa;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c4️⃣ Pega el contenido en el SQL Editor de Supabase', 'font-size: 13px; color: #60a5fa;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c5️⃣ Haz clic en el botón "Run" o presiona Ctrl+Enter', 'font-size: 13px; color: #60a5fa;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c6️⃣ Recarga esta página (F5)', 'font-size: 13px; color: #60a5fa;');
        console.log('%c', 'font-size: 1px;');
        console.log('%c📚 Lee el archivo INICIO_RAPIDO.md para más detalles', 'font-size: 12px; color: #a855f7;');
        console.log('%c', 'font-size: 1px;');
        
        // Retornar un objeto especial indicando que las tablas no existen
        return { tablesExist: false };
      }
      
      console.error('❌ Error verificando base de datos:', error);
      return false;
    }

    console.log('✅ Base de datos Supabase conectada y lista');
    console.log('✅ Tablas verificadas correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    return false;
  }
}

// Esquema SQL para crear en Supabase
export const SUPABASE_SCHEMA = `
-- =====================================================
-- GANJAH TEAM - SUPABASE DATABASE SCHEMA
-- =====================================================
-- Este script crea todas las tablas necesarias para
-- la aplicación de gestión deportiva GANJAH TEAM
-- =====================================================

-- 1. TABLA DE JUGADORES
-- Almacena información de todos los jugadores del equipo
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('Portero', 'Defensa', 'Medio', 'Delantero')),
  phone TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE PARTIDOS
-- Guarda la programación de partidos (próximos e historial)
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  team_a_score INTEGER,
  team_b_score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA DE SORTEOS
-- Historial de sorteos realizados con los equipos generados
CREATE TABLE IF NOT EXISTS draws (
  id TEXT PRIMARY KEY,
  match_id TEXT REFERENCES matches(id) ON DELETE CASCADE,
  team_a_players JSONB NOT NULL,
  team_b_players JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZAR CONSULTAS
-- =====================================================

-- Índice por posición para filtrar jugadores
CREATE INDEX IF NOT EXISTS idx_players_position ON players(position);

-- Índice por fecha para ordenar partidos
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date);

-- Índice por estado de partido (completado/próximo)
CREATE INDEX IF NOT EXISTS idx_matches_completed ON matches(is_completed);

-- Índice para relacionar sorteos con partidos
CREATE INDEX IF NOT EXISTS idx_draws_match_id ON draws(match_id);

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =====================================================

-- Habilitar Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública (para invitados)
CREATE POLICY "Permitir lectura pública de jugadores"
  ON players FOR SELECT
  USING (true);

CREATE POLICY "Permitir lectura pública de partidos"
  ON matches FOR SELECT
  USING (true);

CREATE POLICY "Permitir lectura pública de sorteos"
  ON draws FOR SELECT
  USING (true);

-- Permitir escritura pública (para administradores vía app)
CREATE POLICY "Permitir inserción de jugadores"
  ON players FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir actualización de jugadores"
  ON players FOR UPDATE
  USING (true);

CREATE POLICY "Permitir eliminación de jugadores"
  ON players FOR DELETE
  USING (true);

CREATE POLICY "Permitir inserción de partidos"
  ON matches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir actualización de partidos"
  ON matches FOR UPDATE
  USING (true);

CREATE POLICY "Permitir eliminación de partidos"
  ON matches FOR DELETE
  USING (true);

CREATE POLICY "Permitir inserción de sorteos"
  ON draws FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir actualización de sorteos"
  ON draws FOR UPDATE
  USING (true);

CREATE POLICY "Permitir eliminación de sorteos"
  ON draws FOR DELETE
  USING (true);

-- =====================================================
-- DATOS INICIALES - 22 JUGADORES
-- =====================================================
-- Estos son los jugadores oficiales de GANJAH TEAM

-- PORTEROS (2)
INSERT INTO players (id, name, position) VALUES
('p1', 'Carlos "El Muro" Vargas', 'Portero'),
('p2', 'Diego "Gato" Ramírez', 'Portero')
ON CONFLICT (id) DO NOTHING;

-- DEFENSAS (6)
INSERT INTO players (id, name, position) VALUES
('p3', 'Juan "Tanque" Pérez', 'Defensa'),
('p4', 'Luis "Roca" Martínez', 'Defensa'),
('p5', 'Miguel "Muro" González', 'Defensa'),
('p6', 'Pedro "Hierro" López', 'Defensa'),
('p7', 'Andrés "Escudo" Ruiz', 'Defensa'),
('p8', 'Roberto "Barrera" Torres', 'Defensa')
ON CONFLICT (id) DO NOTHING;

-- MEDIOS (8)
INSERT INTO players (id, name, position) VALUES
('p9', 'David "Maestro" Silva', 'Medio'),
('p10', 'Javier "Motor" Hernández', 'Medio'),
('p11', 'Fernando "Volante" Castro', 'Medio'),
('p12', 'Ricardo "Cerebro" Morales', 'Medio'),
('p13', 'Alberto "Pulmón" Sánchez', 'Medio'),
('p14', 'Sergio "Timón" Jiménez', 'Medio'),
('p15', 'Pablo "Enganche" Romero', 'Medio'),
('p16', 'Mario "Pivote" Díaz', 'Medio')
ON CONFLICT (id) DO NOTHING;

-- DELANTEROS (6)
INSERT INTO players (id, name, position) VALUES
('p17', 'Carlos "Goleador" Mendoza', 'Delantero'),
('p18', 'Eduardo "Killer" Ortiz', 'Delantero'),
('p19', 'Daniel "Rayo" Herrera', 'Delantero'),
('p20', 'José "Depredador" Vega', 'Delantero'),
('p21', 'Antonio "Bala" Reyes', 'Delantero'),
('p22', 'Francisco "Nueve" Paredes', 'Delantero')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- ¡Base de datos lista para GANJAH TEAM! ⚽🌿
-- =====================================================
`;
