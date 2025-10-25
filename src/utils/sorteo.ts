import { Player, Position } from '../types';

export interface BalanceInfo {
  positions: {
    PO: { teamA: number; teamB: number };
    DF: { teamA: number; teamB: number };
    MC: { teamA: number; teamB: number };
    DL: { teamA: number; teamB: number };
  };
  power: {
    teamA: number;
    teamB: number;
  };
}

export function generateBalancedTeams(players: Player[]): { teamA: Player[]; teamB: Player[] } {
  // Validar que el número de jugadores sea par
  if (players.length % 2 !== 0) {
    throw new Error('El número de jugadores debe ser par');
  }

  // Agrupar jugadores por posición
  const byPosition: Record<Position, Player[]> = {
    PO: [],
    DF: [],
    MC: [],
    DL: []
  };

  players.forEach(player => {
    byPosition[player.primaryPosition].push(player);
  });

  // Mezclar aleatoriamente los jugadores de cada posición para distribución justa
  Object.keys(byPosition).forEach(pos => {
    const players = byPosition[pos as Position];
    // Shuffle usando algoritmo Fisher-Yates
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
  });

  const teamA: Player[] = [];
  const teamB: Player[] = [];
  
  // REGLA ESPECIAL: Los porteros SIEMPRE deben ir a equipos diferentes
  const goalkeepers = byPosition['PO'];
  goalkeepers.forEach((gk, index) => {
    if (index % 2 === 0) {
      teamA.push(gk);
    } else {
      teamB.push(gk);
    }
  });
  
  // Contador global para el resto de posiciones (empieza después de los porteros)
  let globalCounter = goalkeepers.length;

  // Distribuir el resto de jugadores (DF, MC, DL)
  const otherPositions: Position[] = ['DF', 'MC', 'DL'];
  
  otherPositions.forEach(pos => {
    const positionPlayers = byPosition[pos];
    positionPlayers.forEach(player => {
      // Usar contador global para alternar entre equipos
      if (globalCounter % 2 === 0) {
        teamA.push(player);
      } else {
        teamB.push(player);
      }
      globalCounter++;
    });
  });

  // Verificación final: asegurar que ambos equipos tengan exactamente la misma cantidad
  const targetSize = players.length / 2;
  
  if (teamA.length !== targetSize || teamB.length !== targetSize) {
    console.error('Error en distribución:', {
      total: players.length,
      teamA: teamA.length,
      teamB: teamB.length,
      expected: targetSize
    });
    
    // Si hay desbalance, redistribuir manualmente
    return redistributePlayers(players, targetSize);
  }

  console.log('✅ Distribución exitosa:', {
    total: players.length,
    equipoA: teamA.length,
    equipoB: teamB.length,
    porteros: {
      equipoA: teamA.filter(p => p.primaryPosition === 'PO').map(p => p.name),
      equipoB: teamB.filter(p => p.primaryPosition === 'PO').map(p => p.name)
    },
    porPosición: {
      PO: { A: teamA.filter(p => p.primaryPosition === 'PO').length, B: teamB.filter(p => p.primaryPosition === 'PO').length },
      DF: { A: teamA.filter(p => p.primaryPosition === 'DF').length, B: teamB.filter(p => p.primaryPosition === 'DF').length },
      MC: { A: teamA.filter(p => p.primaryPosition === 'MC').length, B: teamB.filter(p => p.primaryPosition === 'MC').length },
      DL: { A: teamA.filter(p => p.primaryPosition === 'DL').length, B: teamB.filter(p => p.primaryPosition === 'DL').length }
    }
  });

  return { teamA, teamB };
}

// Función auxiliar para redistribuir en caso de error
function redistributePlayers(players: Player[], targetSize: number): { teamA: Player[]; teamB: Player[] } {
  const teamA: Player[] = [];
  const teamB: Player[] = [];
  
  // Separar porteros del resto
  const goalkeepers = players.filter(p => p.primaryPosition === 'PO');
  const otherPlayers = players.filter(p => p.primaryPosition !== 'PO');
  
  // Distribuir porteros alternadamente (SIEMPRE en equipos diferentes)
  goalkeepers.forEach((gk, index) => {
    if (index % 2 === 0) {
      teamA.push(gk);
    } else {
      teamB.push(gk);
    }
  });
  
  // Mezclar el resto de jugadores
  for (let i = otherPlayers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherPlayers[i], otherPlayers[j]] = [otherPlayers[j], otherPlayers[i]];
  }
  
  // Distribuir el resto alternadamente comenzando desde donde quedaron los porteros
  let counter = goalkeepers.length;
  otherPlayers.forEach((player) => {
    if (counter % 2 === 0) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
    counter++;
  });
  
  return { teamA, teamB };
}

export function calculateBalance(teamA: Player[], teamB: Player[]): BalanceInfo {
  const countByPosition = (team: Player[], pos: Position) => 
    team.filter(p => p.primaryPosition === pos).length;

  return {
    positions: {
      PO: { teamA: countByPosition(teamA, 'PO'), teamB: countByPosition(teamB, 'PO') },
      DF: { teamA: countByPosition(teamA, 'DF'), teamB: countByPosition(teamB, 'DF') },
      MC: { teamA: countByPosition(teamA, 'MC'), teamB: countByPosition(teamB, 'MC') },
      DL: { teamA: countByPosition(teamA, 'DL'), teamB: countByPosition(teamB, 'DL') }
    },
    power: {
      teamA: teamA.length,
      teamB: teamB.length
    }
  };
}
