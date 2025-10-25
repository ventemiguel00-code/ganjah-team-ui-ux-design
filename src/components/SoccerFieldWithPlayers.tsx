import { motion } from 'motion/react';
import { Player, Position } from '../types';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';
import { GanjahLogo } from './GanjahLogo';

interface SoccerFieldWithPlayersProps {
  teamA: Player[];
  teamB: Player[];
  theme?: Theme;
}

// Función para obtener las posiciones en la cancha según la posición del jugador
function getFieldPosition(position: Position, index: number, total: number, isTeamA: boolean): { x: number; y: number } {
  // Coordenadas base para cada posición (en porcentaje de la cancha)
  const baseY = 50; // Centro vertical
  const spacing = 80 / Math.max(total, 1); // Espaciado vertical dinámico
  const yOffset = (index - (total - 1) / 2) * spacing;
  
  let baseX = 0;
  
  switch (position) {
    case 'PO': // Portero
      baseX = isTeamA ? 8 : 92;
      return { x: baseX, y: baseY };
    
    case 'DF': // Defensa
      baseX = isTeamA ? 22 : 78;
      return { x: baseX, y: baseY + yOffset };
    
    case 'MC': // Mediocampo
      baseX = isTeamA ? 38 : 62;
      return { x: baseX, y: baseY + yOffset };
    
    case 'DL': // Delantero
      baseX = isTeamA ? 48 : 52;
      return { x: baseX, y: baseY + yOffset };
    
    default:
      return { x: 50, y: 50 };
  }
}

// Agrupar jugadores por posición
function groupPlayersByPosition(players: Player[]): Record<Position, Player[]> {
  return players.reduce((acc, player) => {
    const pos = player.primaryPosition;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    acc[pos].push(player);
    return acc;
  }, {} as Record<Position, Player[]>);
}

export function SoccerFieldWithPlayers({ teamA, teamB, theme = 'fire' }: SoccerFieldWithPlayersProps) {
  const styles = getThemeStyles(theme);

  // Agrupar jugadores por posición
  const teamAByPosition = groupPlayersByPosition(teamA);
  const teamBByPosition = groupPlayersByPosition(teamB);

  // Calcular posiciones para todos los jugadores
  const teamAPositions = teamA.map((player, idx) => {
    const positionGroup = teamAByPosition[player.primaryPosition];
    const indexInPosition = positionGroup.indexOf(player);
    const totalInPosition = positionGroup.length;
    return {
      player,
      ...getFieldPosition(player.primaryPosition, indexInPosition, totalInPosition, true)
    };
  });

  const teamBPositions = teamB.map((player, idx) => {
    const positionGroup = teamBByPosition[player.primaryPosition];
    const indexInPosition = positionGroup.indexOf(player);
    const totalInPosition = positionGroup.length;
    return {
      player,
      ...getFieldPosition(player.primaryPosition, indexInPosition, totalInPosition, false)
    };
  });

  return (
    <div className="w-full space-y-4">
      {/* Título */}
      <div className="text-center">
        <h3 className={`${styles.textBright} text-xl mb-1`}>Formación en Cancha</h3>
        <p className="text-zinc-500 text-sm">Jugadores organizados por posición</p>
      </div>

      {/* Cancha de fútbol con jugadores */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-green-900 to-green-950 rounded-2xl overflow-hidden shadow-2xl">
        {/* Patrón de césped */}
        <div className="absolute inset-0">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.03) 0px,
              transparent 2px,
              transparent 40px,
              rgba(0, 0, 0, 0.03) 42px
            )`,
          }} />
        </div>

        {/* Líneas de la cancha */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 625" preserveAspectRatio="none">
          {/* Línea exterior */}
          <rect x="50" y="50" width="900" height="525" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          
          {/* Línea central */}
          <line x1="500" y1="50" x2="500" y2="575" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          
          {/* Círculo central */}
          <circle cx="500" cy="312.5" r="80" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          <circle cx="500" cy="312.5" r="6" fill="rgba(255,255,255,0.6)"/>
          
          {/* Área izquierda */}
          <rect x="50" y="187.5" width="140" height="250" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          <rect x="50" y="237.5" width="60" height="150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          
          {/* Área derecha */}
          <rect x="810" y="187.5" width="140" height="250" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          <rect x="890" y="237.5" width="60" height="150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
          
          {/* Punto penal izquierdo */}
          <circle cx="140" cy="312.5" r="6" fill="rgba(255,255,255,0.6)"/>
          
          {/* Punto penal derecho */}
          <circle cx="860" cy="312.5" r="6" fill="rgba(255,255,255,0.6)"/>
        </svg>

        {/* Etiquetas de equipos */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 z-10"
        >
          <div className="px-4 py-2 rounded-lg bg-red-600/90 border-2 border-red-400 backdrop-blur-sm">
            <span className="text-white text-sm font-bold">EQUIPO A</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="px-4 py-2 rounded-lg bg-blue-600/90 border-2 border-blue-400 backdrop-blur-sm">
            <span className="text-white text-sm font-bold">EQUIPO B</span>
          </div>
        </motion.div>

        {/* Jugadores del Equipo A (Rojo - Izquierda) */}
        {teamAPositions.map(({ player, x, y }, index) => (
          <motion.div
            key={`teamA-${player.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
            className="absolute z-20 group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Círculo del jugador */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-red-600 border-3 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {player.primaryPosition}
                </span>
              </div>
              
              {/* Tooltip con nombre */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-black/90 text-white px-2 py-1 rounded text-xs">
                  {player.name}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Jugadores del Equipo B (Azul - Derecha) */}
        {teamBPositions.map(({ player, x, y }, index) => (
          <motion.div
            key={`teamB-${player.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
            className="absolute z-20 group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Círculo del jugador */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 border-3 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {player.primaryPosition}
                </span>
              </div>
              
              {/* Tooltip con nombre */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-black/90 text-white px-2 py-1 rounded text-xs">
                  {player.name}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Pelota en el centro con logo de Ganjah */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <GanjahLogo size="sm" theme={theme} />
          </div>
        </motion.div>

        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Leyenda de posiciones */}
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center p-2 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-xs text-zinc-500 mb-1">Portero</div>
          <div className="text-[#39FF14] font-bold">PO</div>
        </div>
        <div className="text-center p-2 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-xs text-zinc-500 mb-1">Defensa</div>
          <div className="text-[#39FF14] font-bold">DF</div>
        </div>
        <div className="text-center p-2 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-xs text-zinc-500 mb-1">Mediocampo</div>
          <div className="text-[#39FF14] font-bold">MC</div>
        </div>
        <div className="text-center p-2 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-xs text-zinc-500 mb-1">Delantero</div>
          <div className="text-[#39FF14] font-bold">DL</div>
        </div>
      </div>
    </div>
  );
}
