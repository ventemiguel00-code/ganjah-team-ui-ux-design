import { motion } from 'motion/react';
import { Player } from '../types';
import { Sparkles } from 'lucide-react';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';

interface RouletteWheelProps {
  players: Player[];
  theme?: Theme;
}

export function RouletteWheel({ players, theme = 'fire' }: RouletteWheelProps) {
  const styles = getThemeStyles(theme);
  const borderColor = theme === 'cyberpunk' ? '#06b6d4' : 
                      theme === 'ganjah' ? '#10b981' :
                      theme === 'retro' ? '#ec4899' :
                      theme === 'premium' ? '#f59e0b' :
                      '#f97316';
  
  return (
    <div className="flex flex-col items-center justify-center gap-12 p-8 min-h-[100dvh]">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Logo GANJAH grande */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="relative z-10"
      >
        <div className="text-center">
          <h2 className="text-4xl tracking-wider bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent mb-2">
            GANJAH TEAM
          </h2>
          <p className="text-sm text-zinc-500">Sorteo en progreso...</p>
        </div>
      </motion.div>

      {/* Ruleta GIGANTE y más visible */}
      <div className="relative z-10">
        {/* Anillos exteriores animados */}
        <motion.div
          className="absolute -inset-8 rounded-full border-4 border-orange-500/30"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -inset-12 rounded-full border-2 border-cyan-500/20"
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {/* Ruleta principal - MÁS GRANDE */}
        <motion.div
          className="w-72 h-72 rounded-full border-[12px] relative shadow-2xl"
          style={{ 
            borderColor,
            boxShadow: `0 0 60px ${borderColor}80, 0 0 100px ${borderColor}40`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: 0,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          {/* Segmentos visuales - MÁS BRILLANTES */}
          {players.slice(0, 8).map((_, index) => {
            const angle = (360 / 8) * index;
            const color = index % 2 === 0 ? '#EF4444' : '#3B82F6';
            return (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${angle}deg)`,
                  clipPath: 'polygon(50% 50%, 100% 0%, 100% 50%)',
                  backgroundColor: color,
                  opacity: 0.6
                }}
              />
            );
          })}

          {/* Centro brillante - MÁS GRANDE */}
          <motion.div
            className={`absolute inset-0 m-auto w-32 h-32 rounded-full ${styles.accent} flex items-center justify-center shadow-2xl`}
            style={{
              boxShadow: `0 0 40px ${borderColor}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            }}
          >
            <Sparkles className="w-16 h-16 text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Indicador - MÁS GRANDE */}
        <motion.div 
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-t-[24px] border-transparent border-t-white drop-shadow-2xl"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Texto animado - MÁS GRANDE Y VISIBLE */}
      <motion.div
        className="text-center space-y-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h3 
          className="text-3xl tracking-widest bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          GENERANDO EQUIPOS
        </motion.h3>
        
        <div className="flex items-center gap-3 justify-center">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/50"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [1, 0.4, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.25
              }}
            />
          ))}
        </div>

        <motion.p
          className="text-lg text-zinc-400 mt-4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Distribuyendo jugadores...
        </motion.p>
      </motion.div>
    </div>
  );
}
