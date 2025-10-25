import { useState, useEffect } from 'react';
import { Player } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Share2, RotateCw, Users, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RouletteWheel } from './RouletteWheel';
import { SoccerFieldWithPlayers } from './SoccerFieldWithPlayers';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';

interface DrawResultsProps {
  teamA: Player[];
  teamB: Player[];
  onRedraw: () => void;
  onBackToSelection: () => void;
  onFinish: () => void;
  theme?: Theme;
}

export function DrawResults({ teamA, teamB, onRedraw, onBackToSelection, onFinish, theme = 'fire' }: DrawResultsProps) {
  const [showWheel, setShowWheel] = useState(true);
  const [isRedrawing, setIsRedrawing] = useState(false);
  const styles = getThemeStyles(theme);
  const perTeam = teamA.length;

  useEffect(() => {
    // Resetear estado al montar
    setShowWheel(true);
    setIsRedrawing(false);
    
    // Mostrar la ruleta por 3 segundos
    const timer = setTimeout(() => {
      setShowWheel(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []); // Solo al montar, ya que el componente se re-monta con la nueva key

  const handleRedraw = () => {
    setIsRedrawing(true);
    setTimeout(() => {
      onRedraw();
    }, 300);
  };

  const handleShare = () => {
    const message = `🏆 SORTEO GANJAH TEAM 🏆\n\n` +
      `🔴 EQUIPO A:\n${teamA.map(p => `• ${p.name}`).join('\n')}\n\n` +
      `🔵 EQUIPO B:\n${teamB.map(p => `• ${p.name}`).join('\n')}`;
    
    if (navigator.share) {
      navigator.share({ text: message });
    } else {
      navigator.clipboard.writeText(message);
      alert('¡Resultado copiado al portapapeles!');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <AnimatePresence>
        {showWheel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
          >
            <RouletteWheel players={[...teamA, ...teamB]} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className={styles.textBright}>¡Sorteo Completado!</h2>
          <p className="text-sm text-zinc-500">Equipos {perTeam} vs {perTeam} • Paso 3 de 3</p>
        </div>
      </div>

      {/* Teams - Con scroll habilitado */}
      <div className="flex-1 overflow-y-auto pb-80 safe-bottom scroll-smooth">
        <div className="max-w-md mx-auto p-4 pb-4 space-y-4 w-full">
          {/* Resumen de distribución - NUEVO */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-lg border-2 ${
              teamA.length === teamB.length 
                ? 'bg-green-500/10 border-green-500/50' 
                : 'bg-orange-500/10 border-orange-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-500/30 border-2 border-red-500 flex items-center justify-center">
                  <span className="text-red-400 text-sm">{teamA.length}</span>
                </div>
                <span className="text-sm text-zinc-400">jugadores</span>
              </div>
              
              <div className={`px-3 py-1 rounded-full ${
                teamA.length === teamB.length 
                  ? 'bg-green-500/30 text-green-400' 
                  : 'bg-orange-500/30 text-orange-400'
              }`}>
                <span className="text-sm">
                  {teamA.length === teamB.length ? '✓ Equilibrado' : '⚠ Desequilibrado'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">jugadores</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/30 border-2 border-blue-500 flex items-center justify-center">
                  <span className="text-blue-400 text-sm">{teamB.length}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cancha de fútbol con jugadores organizados - NUEVO */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SoccerFieldWithPlayers teamA={teamA} teamB={teamB} theme={theme} />
          </motion.div>

          {/* Equipo A */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-red-950/50 to-zinc-900 border-red-800/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-red-400">EQUIPO A</h3>
                  <p className="text-xs text-zinc-600 mt-0.5">{perTeam} Jugadores</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-white text-sm">A</span>
                </div>
              </div>
              <div className="space-y-2">
                {teamA.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="text-zinc-500 text-sm w-6">{index + 1}.</span>
                    <span className="flex-1">{player.name}</span>
                    <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                      {player.primaryPosition}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* VS Divider */}
          <div className="text-center py-2">
            <span className={`${styles.textBright} text-xl tracking-wider`}>VS</span>
          </div>

          {/* Equipo B */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className={`${styles.teamB} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={styles.teamBText}>EQUIPO B</h3>
                  <p className="text-xs text-zinc-600 mt-0.5">{perTeam} Jugadores</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white text-sm">B</span>
                </div>
              </div>
              <div className="space-y-2">
                {teamB.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="text-zinc-500 text-sm w-6">{index + 1}.</span>
                    <span className="flex-1">{player.name}</span>
                    <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                      {player.primaryPosition}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-zinc-900 border-t-2 border-orange-500/30 p-4 shadow-2xl shadow-orange-500/10">
        <div className="max-w-md mx-auto space-y-3">
          {/* Botones secundarios - compactos */}
          <div className="grid grid-cols-3 gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleRedraw}
                disabled={isRedrawing}
                className="w-full h-10 text-xs bg-orange-600/20 border border-orange-500/40 text-orange-400 hover:bg-orange-600/30"
              >
                <RotateCw className={`w-4 h-4 mr-1 ${isRedrawing ? 'animate-spin' : ''}`} />
                Repetir
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onBackToSelection}
                variant="outline"
                className="w-full h-10 text-xs border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Users className="w-4 h-4 mr-1" />
                Cambiar
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full h-10 text-xs border-zinc-700 text-zinc-400 hover:bg-zinc-800"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Compartir
              </Button>
            </motion.div>
          </div>

          {/* Separador visual */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full"
            >
              <span className="text-xs text-green-400 tracking-wider">GUARDAR SORTEO</span>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
          </div>

          {/* Botón finalizar - MEGA VISIBLE Y FIJO */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onFinish}
              className="w-full h-20 text-xl bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white border-4 border-green-400/60 shadow-2xl shadow-green-500/60 hover:shadow-green-500/80 transition-all relative overflow-hidden group rounded-xl"
            >
              {/* Efecto de brillo continuo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Pulso de fondo */}
              <motion.div
                className="absolute inset-0 bg-green-400/20 rounded-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.98, 1, 0.98],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <span className="relative z-10 flex items-center justify-center gap-3 tracking-wider">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Check className="w-7 h-7" />
                </motion.div>
                <span className="drop-shadow-lg">FINALIZAR Y GUARDAR</span>
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Check className="w-7 h-7" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
          
          {/* Indicador visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-xs text-green-400/80 flex items-center justify-center gap-2">
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✓
              </motion.span>
              Toca el botón para guardar el sorteo
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}