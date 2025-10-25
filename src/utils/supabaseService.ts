import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Player, Match, Position } from '../types';

// ==================== HELPERS ====================

/**
 * Convierte posición abreviada (PO, DF, MC, DL) a formato completo para DB
 */
function positionToDbFormat(position: Position): string {
  const mapping: Record<Position, string> = {
    'PO': 'Portero',
    'DF': 'Defensa',
    'MC': 'Medio',
    'DL': 'Delantero'
  };
  return mapping[position];
}

/**
 * Convierte posición de DB a formato abreviado de la app
 */
function dbFormatToPosition(dbPosition: string): Position {
  const mapping: Record<string, Position> = {
    'Portero': 'PO',
    'Defensa': 'DF',
    'Medio': 'MC',
    'Delantero': 'DL'
  };
  return mapping[dbPosition] || 'MC';
}

// ==================== JUGADORES ====================

/**
 * Obtiene todos los jugadores de la base de datos
 */
export async function getAllPlayers(): Promise<Player[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('position')
      .order('name');

    if (error) {
      // No mostrar error si las tablas no existen (ya se maneja en initDatabase)
      if (error.code !== 'PGRST205' && !error.message?.includes('Could not find the table')) {
        console.error('Error obteniendo jugadores:', error);
      }
      return [];
    }

    // Convertir formato de DB a formato de la app
    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      primaryPosition: dbFormatToPosition(row.position),
      phone: row.phone || undefined
    }));
  } catch (error) {
    console.error('Error obteniendo jugadores:', error);
    return [];
  }
}

/**
 * Inserta múltiples jugadores en la base de datos
 */
export async function insertPlayers(players: Player[]): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const dbPlayers = players.map(player => ({
      id: player.id,
      name: player.name,
      position: positionToDbFormat(player.primaryPosition),
      phone: player.phone || null
    }));

    const { error } = await supabase
      .from('players')
      .upsert(dbPlayers, { onConflict: 'id' });

    if (error) {
      // No mostrar error si las tablas no existen (ya se maneja en initDatabase)
      if (error.code !== 'PGRST205' && !error.message?.includes('Could not find the table')) {
        console.error('Error insertando jugadores:', error);
      }
      return false;
    }

    console.log(`✅ ${players.length} jugadores insertados/actualizados`);
    return true;
  } catch (error) {
    console.error('Error insertando jugadores:', error);
    return false;
  }
}

/**
 * Actualiza un jugador existente
 */
export async function updatePlayer(player: Player): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('players')
      .update({
        name: player.name,
        position: positionToDbFormat(player.primaryPosition),
        phone: player.phone || null
      })
      .eq('id', player.id);

    if (error) {
      console.error('Error actualizando jugador:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error actualizando jugador:', error);
    return false;
  }
}

/**
 * Elimina un jugador
 */
export async function deletePlayer(playerId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', playerId);

    if (error) {
      console.error('Error eliminando jugador:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error eliminando jugador:', error);
    return false;
  }
}

// ==================== PARTIDOS ====================

/**
 * Obtiene todos los partidos de la base de datos
 */
export async function getAllMatches(): Promise<Match[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: false })
      .order('time', { ascending: false });

    if (error) {
      // No mostrar error si las tablas no existen (ya se maneja en initDatabase)
      if (error.code !== 'PGRST205' && !error.message?.includes('Could not find the table')) {
        console.error('Error obteniendo partidos:', error);
      }
      return [];
    }

    // Convertir nombres de columnas
    return (data || []).map((row: any) => ({
      id: row.id,
      date: row.date,
      time: row.time,
      location: row.location,
      isCompleted: row.is_completed,
      teamAScore: row.team_a_score,
      teamBScore: row.team_b_score
    }));
  } catch (error) {
    console.error('Error obteniendo partidos:', error);
    return [];
  }
}

/**
 * Inserta un nuevo partido
 */
export async function insertMatch(match: Match): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('matches')
      .insert({
        id: match.id,
        date: match.date,
        time: match.time,
        location: match.location,
        is_completed: match.isCompleted || false,
        team_a_score: match.teamAScore || null,
        team_b_score: match.teamBScore || null
      });

    if (error) {
      console.error('Error insertando partido:', error);
      return false;
    }

    console.log('✅ Partido insertado:', match.id);
    return true;
  } catch (error) {
    console.error('Error insertando partido:', error);
    return false;
  }
}

/**
 * Actualiza un partido existente
 */
export async function updateMatch(match: Match): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('matches')
      .update({
        date: match.date,
        time: match.time,
        location: match.location,
        is_completed: match.isCompleted || false,
        team_a_score: match.teamAScore || null,
        team_b_score: match.teamBScore || null
      })
      .eq('id', match.id);

    if (error) {
      console.error('Error actualizando partido:', error);
      return false;
    }

    console.log('✅ Partido actualizado:', match.id);

    // Auto-limpieza: si el partido se completó, limpiar partidos antiguos
    if (match.isCompleted) {
      await deleteOldCompletedMatches(20);
    }

    return true;
  } catch (error) {
    console.error('Error actualizando partido:', error);
    return false;
  }
}

/**
 * Elimina un partido
 */
export async function deleteMatch(matchId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', matchId);

    if (error) {
      console.error('Error eliminando partido:', error);
      return false;
    }

    console.log('✅ Partido eliminado:', matchId);
    return true;
  } catch (error) {
    console.error('Error eliminando partido:', error);
    return false;
  }
}

/**
 * Elimina partidos completados antiguos, manteniendo solo los últimos N registros
 */
export async function deleteOldCompletedMatches(keepCount: number = 20): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    // Contar cuántos partidos completados hay
    const { count, error: countError } = await supabase
      .from('matches')
      .select('*', { count: 'exact', head: true })
      .eq('is_completed', true);

    if (countError) {
      console.error('Error contando partidos:', countError);
      return false;
    }

    const totalMatches = count || 0;

    if (totalMatches <= keepCount) {
      return true; // No hay nada que eliminar
    }

    // Obtener los IDs de los partidos a eliminar
    const { data: matchesToKeep, error: selectError } = await supabase
      .from('matches')
      .select('id')
      .eq('is_completed', true)
      .order('date', { ascending: false })
      .order('time', { ascending: false })
      .limit(keepCount);

    if (selectError) {
      console.error('Error seleccionando partidos:', selectError);
      return false;
    }

    const idsToKeep = (matchesToKeep || []).map((m: any) => m.id);

    // Eliminar los partidos que no están en la lista de IDs a mantener
    const { error: deleteError } = await supabase
      .from('matches')
      .delete()
      .eq('is_completed', true)
      .not('id', 'in', `(${idsToKeep.map(id => `'${id}'`).join(',')})`);

    if (deleteError) {
      console.error('Error eliminando partidos antiguos:', deleteError);
      return false;
    }

    const deleted = totalMatches - keepCount;
    console.log(`🗑️ ${deleted} partidos completados antiguos eliminados (manteniendo ${keepCount})`);
    return true;
  } catch (error) {
    console.error('Error eliminando partidos completados antiguos:', error);
    return false;
  }
}

// ==================== SORTEOS ====================

export interface DrawRecord {
  id: string;
  matchId?: string;
  teamA: Player[];
  teamB: Player[];
  createdAt: Date;
}

/**
 * Guarda un sorteo en la base de datos
 */
export async function saveDraw(draw: DrawRecord): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('draws')
      .insert({
        id: draw.id,
        match_id: draw.matchId || null,
        team_a_players: draw.teamA,
        team_b_players: draw.teamB
      });

    if (error) {
      console.error('Error guardando sorteo:', error);
      return false;
    }

    console.log('✅ Sorteo guardado:', draw.id);

    // Auto-limpieza: mantener solo los últimos 20 sorteos
    await deleteOldDraws(20);

    return true;
  } catch (error) {
    console.error('Error guardando sorteo:', error);
    return false;
  }
}

/**
 * Elimina un sorteo específico
 */
export async function deleteDraw(drawId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('draws')
      .delete()
      .eq('id', drawId);

    if (error) {
      console.error('Error eliminando sorteo:', error);
      return false;
    }

    console.log('✅ Sorteo eliminado:', drawId);
    return true;
  } catch (error) {
    console.error('Error eliminando sorteo:', error);
    return false;
  }
}

/**
 * Elimina sorteos antiguos, manteniendo solo los últimos N registros
 */
export async function deleteOldDraws(keepCount: number = 20): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    // Contar cuántos sorteos hay
    const { count, error: countError } = await supabase
      .from('draws')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error contando sorteos:', countError);
      return false;
    }

    const totalDraws = count || 0;

    if (totalDraws <= keepCount) {
      return true; // No hay nada que eliminar
    }

    // Obtener los IDs de los sorteos a mantener
    const { data: drawsToKeep, error: selectError } = await supabase
      .from('draws')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(keepCount);

    if (selectError) {
      console.error('Error seleccionando sorteos:', selectError);
      return false;
    }

    const idsToKeep = (drawsToKeep || []).map((d: any) => d.id);

    // Eliminar los sorteos que no están en la lista de IDs a mantener
    if (idsToKeep.length > 0) {
      const { error: deleteError } = await supabase
        .from('draws')
        .delete()
        .not('id', 'in', `(${idsToKeep.map(id => `'${id}'`).join(',')})`);

      if (deleteError) {
        console.error('Error eliminando sorteos antiguos:', deleteError);
        return false;
      }
    }

    const deleted = totalDraws - keepCount;
    console.log(`🗑️ ${deleted} sorteos antiguos eliminados (manteniendo ${keepCount})`);
    return true;
  } catch (error) {
    console.error('Error eliminando sorteos antiguos:', error);
    return false;
  }
}

/**
 * Obtiene el último sorteo realizado
 */
export async function getLastDraw(): Promise<DrawRecord | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('draws')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      // No mostrar error si las tablas no existen (ya se maneja en initDatabase)
      if (error.code !== 'PGRST205' && !error.message?.includes('Could not find the table')) {
        console.error('Error obteniendo último sorteo:', error);
      }
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    const record = data[0];
    return {
      id: record.id,
      matchId: record.match_id,
      teamA: record.team_a_players,
      teamB: record.team_b_players,
      createdAt: new Date(record.created_at)
    };
  } catch (error) {
    console.error('Error obteniendo último sorteo:', error);
    return null;
  }
}

/**
 * Obtiene todos los sorteos
 */
export async function getAllDraws(): Promise<DrawRecord[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('draws')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo sorteos:', error);
      return [];
    }

    return (data || []).map((record: any) => ({
      id: record.id,
      matchId: record.match_id,
      teamA: record.team_a_players,
      teamB: record.team_b_players,
      createdAt: new Date(record.created_at)
    }));
  } catch (error) {
    console.error('Error obteniendo sorteos:', error);
    return [];
  }
}
