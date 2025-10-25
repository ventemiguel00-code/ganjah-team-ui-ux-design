export type Position = 'PO' | 'DF' | 'MC' | 'DL';

export interface Player {
  id: string;
  name: string;
  primaryPosition: Position;
  secondaryPositions?: Position[];
  phone?: string;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  location: string;
  teamA?: Player[];
  teamB?: Player[];
  mvp?: string; // player id
  isCompleted: boolean;
}

export interface DrawResult {
  teamA: Player[];
  teamB: Player[];
  matchId: string;
}

export type UserRole = 'guest' | 'admin';
