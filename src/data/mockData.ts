import { Player, Match } from '../types';

export const MOCK_PLAYERS: Player[] = [
  // Porteros (PO) - 1 jugador
  { id: '15', name: 'ARTURO', primaryPosition: 'PO' },
  
  // Defensas (DF) - 5 jugadores
  { id: '6', name: 'ALEX', primaryPosition: 'DF' },
  { id: '7', name: 'GULLE', primaryPosition: 'DF' },
  { id: '8', name: 'JEFF', primaryPosition: 'DF' },
  { id: '9', name: 'SANMI', primaryPosition: 'DF' },
  { id: '17', name: 'PAPO', primaryPosition: 'DF' },
  
  // Mediocampistas (MC) - 6 jugadores
  { id: '1', name: 'JP', primaryPosition: 'MC' },
  { id: '2', name: 'ESTEBAN', primaryPosition: 'MC' },
  { id: '5', name: 'LERMA', primaryPosition: 'MC' },
  { id: '10', name: 'JUAN MA', primaryPosition: 'MC' },
  { id: '16', name: 'DAVID PRI', primaryPosition: 'MC' },
  { id: '20', name: 'MIKE', primaryPosition: 'MC' },
  
  // Delanteros (DL) - 10 jugadores
  { id: '3', name: 'CHAPA', primaryPosition: 'DL' },
  { id: '4', name: 'MIGUELITO', primaryPosition: 'DL' },
  { id: '11', name: 'JOSE', primaryPosition: 'DL' },
  { id: '12', name: 'OLAVE', primaryPosition: 'DL' },
  { id: '13', name: 'PITO', primaryPosition: 'DL' },
  { id: '14', name: 'PERICO', primaryPosition: 'DL' },
  { id: '18', name: 'LEO', primaryPosition: 'DL' },
  { id: '19', name: 'NICOL', primaryPosition: 'DL' },
  { id: '21', name: 'JASON', primaryPosition: 'DL' },
  { id: '22', name: 'CIFU', primaryPosition: 'DL' }
];

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm3',
    date: '2025-10-11',
    time: '19:00',
    location: 'Cancha Municipal Norte',
    teamA: [
      MOCK_PLAYERS[0], // ARTURO (PO)
      MOCK_PLAYERS[1], // ALEX (DF)
      MOCK_PLAYERS[3], // JEFF (DF)
      MOCK_PLAYERS[6], // JP (MC)
      MOCK_PLAYERS[7], // ESTEBAN (MC)
      MOCK_PLAYERS[8], // LERMA (MC)
      MOCK_PLAYERS[11], // CHAPA (DL)
      MOCK_PLAYERS[13], // JOSE (DL)
      MOCK_PLAYERS[15], // PITO (DL)
    ],
    teamB: [
      MOCK_PLAYERS[2], // GULLE (DF)
      MOCK_PLAYERS[4], // SANMI (DF)
      MOCK_PLAYERS[5], // PAPO (DF)
      MOCK_PLAYERS[9], // JUAN MA (MC)
      MOCK_PLAYERS[10], // DAVID PRI (MC)
      MOCK_PLAYERS[12], // MIGUELITO (DL)
      MOCK_PLAYERS[14], // OLAVE (DL)
      MOCK_PLAYERS[17], // LEO (DL)
      MOCK_PLAYERS[19], // JASON (DL)
    ],
    mvp: '1',
    isCompleted: true
  }
];

export const FIXED_ROSTER_IDS = ['1', '2', '3', '6', '9', '10', '12', '15', '16', '21'];
