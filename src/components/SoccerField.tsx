import { motion } from 'motion/react';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';

interface SoccerFieldProps {
  theme?: Theme;
  showTeams?: boolean;
  teamACount?: number;
  teamBCount?: number;
}

export function SoccerField({ theme = 'fire', showTeams = false, teamACount = 0, teamBCount = 0 }: SoccerFieldProps) {
  const styles = getThemeStyles(theme);

  return (
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
        
        {/* Arcos del área de penales - izquierda */}
        <path d="M 110 187.5 Q 110 312.5 110 437.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
        
        {/* Arcos del área de penales - derecha */}
        <path d="M 890 187.5 Q 890 312.5 890 437.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
      </svg>

      {/* Portería izquierda - Equipo A */}
      {showTeams && (
        <motion.div
          initial={{ scale: 0, x: -50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
          <div className={`${styles.teamA} px-6 py-3 rounded-xl backdrop-blur-sm border-2`}>
            <div className={`text-center ${styles.teamAText}`}>
              <div className="text-xs opacity-80 mb-1">EQUIPO A</div>
              <div className="text-2xl font-bold">{teamACount}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Portería derecha - Equipo B */}
      {showTeams && (
        <motion.div
          initial={{ scale: 0, x: 50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
        >
          <div className={`${styles.teamB} px-6 py-3 rounded-xl backdrop-blur-sm border-2`}>
            <div className={`text-center ${styles.teamBText}`}>
              <div className="text-xs opacity-80 mb-1">EQUIPO B</div>
              <div className="text-2xl font-bold">{teamBCount}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pelota en el centro */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg z-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.2)'
        }}
      />

      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
