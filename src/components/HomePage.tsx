import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Match, Player, UserRole } from '../types';
import { Calendar, MapPin, Clock, Sparkles, Users, Trophy, Zap, Trash2 } from 'lucide-react';
import { DrawFlow } from './DrawFlow';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';
import { parseLocalDate } from '../utils/dateUtils';
import { SoccerField } from './SoccerField';
import { StatsCard } from './StatsCard';
import { GanjahLogo } from './GanjahLogo';
import { motion } from 'motion/react';

interface HomePageProps {
  nextMatch?: Match;
  lastDraw?: { teamA: Player[]; teamB: Player[] };
  userRole: UserRole;
  allPlayers: Player[];
  allMatches?: Match[];
  onDrawComplete: (teamA: Player[], teamB: Player[]) => void;
  onDeleteDraw?: () => void;
  theme?: Theme;
}

export function HomePage({ nextMatch, lastDraw, userRole, allPlayers, allMatches = [], onDrawComplete, onDeleteDraw, theme = 'fire' }: HomePageProps) {
  const [showDrawFlow, setShowDrawFlow] = useState(false);
  const styles = getThemeStyles(theme);

  if (showDrawFlow) {
    return (
      <DrawFlow
        allPlayers={allPlayers}
        onComplete={(teamA, teamB) => {
          onDrawComplete(teamA, teamB);
          setShowDrawFlow(false);
        }}
        onCancel={() => setShowDrawFlow(false)}
        theme={theme}
      />
    );
  }

  const totalPlayers = allPlayers.length;
  const completedMatches = allMatches.filter(m => m.isCompleted);

  return (
    <div className="safe-bottom">
      <div className="max-w-4xl mx-auto p-4 pt-6 space-y-6 w-full">
        {/* Header con animación y logo */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <GanjahLogo size="lg" animated theme={theme} />
            <div>
              <h1 className={`${styles.textBright} tracking-wider text-3xl`}>GANJAH TEAM</h1>
              <p className="text-zinc-400 text-sm">Sistema de Gestión Deportiva</p>
            </div>
          </div>
        </motion.div>

        {/* Cancha de fútbol principal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SoccerField 
            theme={theme} 
            showTeams={!!lastDraw}
            teamACount={lastDraw?.teamA.length || 0}
            teamBCount={lastDraw?.teamB.length || 0}
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatsCard
            icon={Users}
            label="Jugadores"
            value={totalPlayers}
            theme={theme}
            delay={0.3}
          />
          <StatsCard
            icon={Trophy}
            label="Partidos Jugados"
            value={completedMatches.length.toString()}
            theme={theme}
            delay={0.4}
          />
          <StatsCard
            icon={Trophy}
            label="Sorteos"
            value={lastDraw ? '1' : '0'}
            theme={theme}
            delay={0.5}
          />
          <StatsCard
            icon={Zap}
            label="Activos"
            value={totalPlayers}
            theme={theme}
            delay={0.6}
          />
        </div>

        {/* Botón de Sorteo destacado */}
        {userRole === 'admin' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={() => setShowDrawFlow(true)}
              className={`w-full h-20 ${styles.buttonPrimary} text-lg relative overflow-hidden group`}
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <Sparkles className="w-6 h-6 mr-3" />
              <span>INICIAR SORTEO DE HOY</span>
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
          </motion.div>
        )}

        {/* Próximo Partido */}
        {nextMatch && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className={`${styles.card} p-5 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <Calendar className="w-full h-full" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className={`w-5 h-5 ${styles.textBright}`} />
                  <h3 className={styles.textBright}>Próximo Partido</h3>
                </div>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-zinc-500" />
                    <span className="flex-1">
                      {parseLocalDate(nextMatch.date).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                      <Clock className="w-5 h-5 text-zinc-500" />
                      <span>{nextMatch.time}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-zinc-500" />
                      <span className="truncate">{nextMatch.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Último Sorteo con diseño mejorado */}
        {lastDraw && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-zinc-400">Último Sorteo Realizado</h3>
              <div className={`${styles.textBright} text-sm flex items-center gap-1`}>
                <Trophy className="w-4 h-4" />
                <span>18 Jugadores</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Equipo A */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className={`${styles.teamA} p-5 h-full relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <Users className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`${styles.teamAText} text-xl`}>EQUIPO A</h4>
                      <div className={`w-10 h-10 rounded-full ${styles.teamA} border-2 flex items-center justify-center ${styles.teamAText}`}>
                        {lastDraw.teamA.length}
                      </div>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {lastDraw.teamA.map((player, idx) => (
                        <motion.div
                          key={player.id}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1 + idx * 0.05 }}
                          className="flex items-center gap-2 bg-black/20 p-2 rounded-lg text-white"
                        >
                          <span className="text-zinc-500 text-sm w-6">{idx + 1}.</span>
                          <span className="flex-1 truncate">{player.name}</span>
                          <span className="text-xs px-2 py-1 bg-black/30 rounded">
                            {player.primaryPosition}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Equipo B */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className={`${styles.teamB} p-5 h-full relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <Users className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`${styles.teamBText} text-xl`}>EQUIPO B</h4>
                      <div className={`w-10 h-10 rounded-full ${styles.teamB} border-2 flex items-center justify-center ${styles.teamBText}`}>
                        {lastDraw.teamB.length}
                      </div>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {lastDraw.teamB.map((player, idx) => (
                        <motion.div
                          key={player.id}
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1 + idx * 0.05 }}
                          className="flex items-center gap-2 bg-black/20 p-2 rounded-lg text-white"
                        >
                          <span className="text-zinc-500 text-sm w-6">{idx + 1}.</span>
                          <span className="flex-1 truncate">{player.name}</span>
                          <span className="text-xs px-2 py-1 bg-black/30 rounded">
                            {player.primaryPosition}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Botón de Eliminar Sorteo */}
            {userRole === 'admin' && onDeleteDraw && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <Button
                  onClick={onDeleteDraw}
                  className={`w-full h-10 ${styles.buttonDanger} text-sm relative overflow-hidden group`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  <Trash2 className="w-5 h-5 mr-3" />
                  <span>ELIMINAR SORTEO</span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {!lastDraw && userRole === 'guest' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className={`${styles.card} p-12 text-center`}>
              <Trophy className="w-16 h-16 mx-auto mb-4 text-zinc-700" />
              <p className="text-zinc-500 text-lg">No hay sorteos recientes</p>
              <p className="text-zinc-600 text-sm mt-2">Los sorteos aparecerán aquí una vez realizados</p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}