import { Player } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import { calculateBalance } from '../utils/sorteo';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';
import { motion } from 'motion/react';

interface DrawPreviewProps {
  teamA: Player[];
  teamB: Player[];
  onBack: () => void;
  onConfirm: () => void;
  theme?: Theme;
}

const playersPerTeam = (teamA: Player[]) => teamA.length;

export function DrawPreview({ teamA, teamB, onBack, onConfirm, theme = 'fire' }: DrawPreviewProps) {
  const balance = calculateBalance(teamA, teamB);
  const styles = getThemeStyles(theme);
  const perTeam = teamA.length;

  const positions = [
    { key: 'PO', label: 'Porteros' },
    { key: 'DF', label: 'Defensas' },
    { key: 'MC', label: 'Mediocampistas' },
    { key: 'DL', label: 'Delanteros' }
  ] as const;

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-zinc-400 hover:text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="text-white">Vista Previa del Equilibrio</h2>
              <p className="text-sm text-zinc-500">Equipos {perTeam} vs {perTeam} • Paso 2 de 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-28 safe-bottom">
        <div className="max-w-md mx-auto p-4 space-y-6 w-full">
          {/* Contador de Jugadores - NUEVO */}
          <Card className={`${styles.card} p-4 border-2 ${teamA.length === teamB.length ? 'border-green-500/50' : 'border-orange-500/50'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={styles.textBright}>Distribución de Jugadores</h3>
              {teamA.length === teamB.length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/50 rounded-full px-2 py-1"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Perfecto</span>
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                  <span className={`${styles.teamAText} text-lg`}>{teamA.length}</span>
                </div>
                <span className="text-sm text-zinc-400">Equipo A</span>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                teamA.length === teamB.length 
                  ? 'bg-green-500/20 border-2 border-green-500/50' 
                  : 'bg-orange-500/20 border-2 border-orange-500/50'
              }`}>
                <span className={`${teamA.length === teamB.length ? 'text-green-400' : 'text-orange-400'}`}>
                  {teamA.length} vs {teamB.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">Equipo B</span>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                  <span className={`${styles.teamBText} text-lg`}>{teamB.length}</span>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-center mt-3 ${teamA.length === teamB.length ? 'text-green-400' : 'text-orange-400'}">
              {teamA.length === teamB.length 
                ? '✓ Los equipos tienen la misma cantidad de jugadores' 
                : '⚠ Los equipos no están balanceados en cantidad'}
            </p>
          </Card>

          {/* Balance de Posiciones */}
          <Card className={`${styles.card} p-4`}>
            <h3 className={`${styles.textBright} mb-4`}>Balance de Posiciones</h3>
            <div className="space-y-3">
              {positions.map(({ key, label }) => {
                const teamACount = balance.positions[key].teamA;
                const teamBCount = balance.positions[key].teamB;
                const isBalanced = teamACount === teamBCount;
                
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-zinc-300">{label}:</span>
                    <div className="flex items-center gap-2">
                      <span className={isBalanced ? 'text-[#39FF14]' : 'text-yellow-400'}>
                        {teamACount} / {teamBCount}
                      </span>
                      {isBalanced && (
                        <span className="text-[#39FF14] text-xs">✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Balance de Jugadores */}
          <Card className={`${styles.card} p-4`}>
            <h3 className={`${styles.textBright} mb-4`}>Total de Jugadores por Equipo</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-zinc-400 text-sm mb-2">Equipo A</p>
                <p className={styles.teamAText}>{balance.power.teamA} jugadores</p>
              </div>
              <div className="text-center">
                <p className="text-zinc-400 text-sm mb-2">Equipo B</p>
                <p className={styles.teamBText}>{balance.power.teamB} jugadores</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
              <p className="text-sm text-zinc-500">
                {balance.power.teamA === balance.power.teamB ? (
                  <span className="text-green-400">✓ Equipos equilibrados perfectamente</span>
                ) : (
                  <span className="text-orange-400">⚠ Diferencia: {Math.abs(balance.power.teamA - balance.power.teamB)} jugadores</span>
                )}
              </p>
            </div>
          </Card>

          {/* Información */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-400 text-sm text-center">
              El algoritmo ha distribuido los jugadores de forma equilibrada.
              Presiona el botón para confirmar y ver la asignación final.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button - MEJORADO */}
      <div className="bg-zinc-900 border-t-2 border-orange-500/30 p-5 shadow-2xl shadow-orange-500/10">
        <div className="max-w-md mx-auto space-y-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onConfirm}
              className="w-full h-16 text-lg bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 text-white border-2 border-orange-400/50 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3 tracking-wider">
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                GIRAR RULETA Y CONFIRMAR
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </motion.div>
          <p className="text-center text-xs text-zinc-500">
            Se mostrará la ruleta con la distribución final
          </p>
        </div>
      </div>
    </div>
  );
}
