import { useState } from 'react';
import { Player } from '../types';
import { Button } from './ui/button';
import { PlayerCard } from './PlayerCard';
import { ScrollArea } from './ui/scroll-area';
import { ChevronLeft, Users, Check, Zap, Filter, Search, ArrowRight } from 'lucide-react';
import { FIXED_ROSTER_IDS } from '../data/mockData';
import { DrawPreview } from './DrawPreview';
import { DrawResults } from './DrawResults';
import { generateBalancedTeams } from '../utils/sorteo';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface DrawFlowProps {
  allPlayers: Player[];
  onComplete: (teamA: Player[], teamB: Player[]) => void;
  onCancel: () => void;
  theme?: Theme;
}

type DrawStep = 'select' | 'preview' | 'results';
type PositionFilter = 'ALL' | 'PO' | 'DF' | 'MC' | 'DL';

export function DrawFlow({ allPlayers, onComplete, onCancel, theme = 'fire' }: DrawFlowProps) {
  const [step, setStep] = useState<DrawStep>('select');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [teams, setTeams] = useState<{ teamA: Player[]; teamB: Player[] } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<PositionFilter>('ALL');
  const [drawKey, setDrawKey] = useState(0); // Key para forzar re-render de la animación
  const [targetPlayerCount, setTargetPlayerCount] = useState(18); // Número de jugadores deseados

  const selectedPlayers = allPlayers.filter(p => selectedIds.has(p.id));
  const canContinue = selectedIds.size === targetPlayerCount && selectedIds.size >= 2 && selectedIds.size % 2 === 0;
  const styles = getThemeStyles(theme);

  // Filtrar jugadores
  const filteredPlayers = allPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = positionFilter === 'ALL' || player.primaryPosition === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const togglePlayer = (playerId: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(playerId)) {
      newSet.delete(playerId);
    } else {
      if (newSet.size < targetPlayerCount) {
        newSet.add(playerId);
      }
    }
    setSelectedIds(newSet);
  };

  const loadFixedRoster = () => {
    setSelectedIds(new Set(FIXED_ROSTER_IDS));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleGenerateTeams = () => {
    try {
      const result = generateBalancedTeams(selectedPlayers);
      
      // Verificar distribución
      console.log('🎯 Sorteo Generado:', {
        total: selectedPlayers.length,
        equipoA: result.teamA.length,
        equipoB: result.teamB.length,
        equilibrado: result.teamA.length === result.teamB.length,
        objetivo: `${targetPlayerCount / 2} vs ${targetPlayerCount / 2}`
      });
      
      // Validación adicional
      if (result.teamA.length !== result.teamB.length) {
        console.warn('⚠️ Los equipos no tienen la misma cantidad de jugadores');
      } else {
        console.log('✅ Equipos perfectamente balanceados en cantidad');
      }
      
      setTeams(result);
      setStep('preview');
    } catch (error) {
      console.error('Error al generar equipos:', error);
      alert('Error al generar equipos. Por favor intenta nuevamente.');
    }
  };

  const handleConfirmDraw = () => {
    setStep('results');
  };

  const handleFinish = () => {
    if (teams) {
      console.log('💾 Guardando sorteo:', {
        equipoA: teams.teamA.length,
        equipoB: teams.teamB.length,
        total: teams.teamA.length + teams.teamB.length
      });
      onComplete(teams.teamA, teams.teamB);
    }
  };

  const handleRedraw = () => {
    try {
      const result = generateBalancedTeams(selectedPlayers);
      
      // Verificar distribución al repetir sorteo
      console.log('🔄 Sorteo Repetido:', {
        total: selectedPlayers.length,
        equipoA: result.teamA.length,
        equipoB: result.teamB.length,
        equilibrado: result.teamA.length === result.teamB.length
      });
      
      setTeams(result);
      setDrawKey(prev => prev + 1); // Incrementar key para forzar reset de animación
    } catch (error) {
      console.error('Error al repetir sorteo:', error);
      alert('Error al repetir el sorteo. Por favor intenta nuevamente.');
    }
  };

  const handleBackToSelection = () => {
    setStep('select');
    setTeams(null);
  };

  // Contar jugadores por posición seleccionados
  const selectedByPosition = {
    PO: selectedPlayers.filter(p => p.primaryPosition === 'PO').length,
    DF: selectedPlayers.filter(p => p.primaryPosition === 'DF').length,
    MC: selectedPlayers.filter(p => p.primaryPosition === 'MC').length,
    DL: selectedPlayers.filter(p => p.primaryPosition === 'DL').length,
  };

  // Paso 1: Selección de jugadores - DISEÑO MEJORADO
  if (step === 'select') {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 relative">
        {/* Fondo decorativo permanente - fijo */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-br from-orange-500/3 to-cyan-500/3 rounded-full blur-3xl" />
        </div>

        {/* Header Mejorado */}
        <div className="relative border-b border-zinc-800/50 backdrop-blur-xl bg-black/40 z-10 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-cyan-500/5" />
          
          <div className="relative max-w-md mx-auto p-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={onCancel} 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Volver</span>
              </button>
              
              <Badge variant="outline" className={`${styles.badge} border-2`}>
                Paso 1/3
              </Badge>
            </div>

            {/* Title */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <h2 className="text-2xl mb-1 bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
                Selección de Jugadores
              </h2>
              <p className="text-sm text-zinc-500">
                Selecciona jugadores para el sorteo (número par)
              </p>
            </motion.div>

            {/* Selector de cantidad de jugadores */}
            <div className="mb-4 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
              <label className="text-xs text-zinc-400 mb-2 block">Jugadores para el sorteo:</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="2"
                  value={targetPlayerCount}
                  onChange={(e) => {
                    const newCount = parseInt(e.target.value);
                    setTargetPlayerCount(newCount);
                    // Ajustar selección si excede el nuevo límite
                    if (selectedIds.size > newCount) {
                      const idsArray = Array.from(selectedIds);
                      setSelectedIds(new Set(idsArray.slice(0, newCount)));
                    }
                  }}
                  className="flex-1 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 min-w-[100px]">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span className={styles.textBright}>{targetPlayerCount}</span>
                  <span className="text-xs text-zinc-500">({targetPlayerCount / 2} vs {targetPlayerCount / 2})</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`flex items-center gap-2 ${canContinue ? 'text-green-400' : styles.textBright}`}>
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {selectedIds.size} / {targetPlayerCount} jugadores
                  </span>
                </div>
                <span className="text-xs text-zinc-600">
                  {Math.round((selectedIds.size / targetPlayerCount) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedIds.size / targetPlayerCount) * 100}%` }}
                  className={`h-full ${canContinue ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-orange-400'} rounded-full`}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={loadFixedRoster}
                size="sm"
                variant="outline"
                className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all hover:border-orange-500/50"
              >
                <Zap className="w-4 h-4 mr-2" />
                Plantilla Fija
              </Button>
              <Button
                onClick={clearSelection}
                size="sm"
                variant="outline"
                disabled={selectedIds.size === 0}
                className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all hover:border-red-500/50 disabled:opacity-30"
              >
                Limpiar
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar jugador..."
                className="pl-10 bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500/50"
              />
            </div>

            {/* Position Filters */}
            <div className="flex gap-2">
              {(['ALL', 'PO', 'DF', 'MC', 'DL'] as PositionFilter[]).map((pos) => {
                const isActive = positionFilter === pos;
                const count = pos === 'ALL' ? allPlayers.length : allPlayers.filter(p => p.primaryPosition === pos).length;
                const selectedCount = pos === 'ALL' ? selectedIds.size : selectedByPosition[pos as keyof typeof selectedByPosition] || 0;
                
                return (
                  <button
                    key={pos}
                    onClick={() => setPositionFilter(pos)}
                    className={`
                      flex-1 px-3 py-2 rounded-lg text-xs transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' 
                        : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/80 border border-zinc-800'
                      }
                    `}
                  >
                    <div className="font-medium">{pos}</div>
                    {selectedCount > 0 && (
                      <div className="text-[10px] mt-0.5 opacity-80">
                        {selectedCount}/{count}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stats Mini Cards */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {Object.entries(selectedByPosition).map(([pos, count]) => (
                <motion.div
                  key={pos}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-2 text-center"
                >
                  <div className={`text-xs ${styles.textAccent} opacity-70`}>{pos}</div>
                  <div className="text-lg mt-1">
                    {count > 0 ? (
                      <span className={styles.textBright}>{count}</span>
                    ) : (
                      <span className="text-zinc-700">0</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de jugadores - Grid mejorado */}
        <div className="flex-1 overflow-y-auto relative z-10">
          <div className="max-w-md mx-auto p-4 pb-32 safe-bottom w-full">
            <AnimatePresence mode="popLayout">
              {filteredPlayers.length > 0 ? (
                <motion.div 
                  layout
                  className="space-y-2"
                >
                  {filteredPlayers.map((player, index) => (
                    <motion.div
                      key={player.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                      className="relative"
                    >
                      <PlayerCard
                        player={player}
                        isSelected={selectedIds.has(player.id)}
                        showCheckbox
                        onClick={() => togglePlayer(player.id)}
                        theme={theme}
                      />
                      
                      {/* Indicador de selección flotante */}
                      <AnimatePresence>
                        {selectedIds.has(player.id) && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 z-10"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Users className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500 text-sm">No se encontraron jugadores</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setPositionFilter('ALL');
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-4 border-zinc-700 text-zinc-400"
                  >
                    Limpiar filtros
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Button - SÚPER VISIBLE */}
        <div className="relative border-t-2 border-orange-500/30 backdrop-blur-xl bg-gradient-to-t from-black via-zinc-900/90 to-zinc-900/60 z-10 flex-shrink-0 shadow-2xl shadow-orange-500/20">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-orange-500/5 to-transparent" />
          
          {/* Efecto de brillo superior */}
          {canContinue && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          
          <div className="relative max-w-md mx-auto p-5">
            {/* Contador grande cuando está listo */}
            {canContinue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-3"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 border-2 border-green-500/50 rounded-full px-6 py-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-500/50"
                    />
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
                    {targetPlayerCount} JUGADORES LISTOS
                  </span>
                  <div className="flex items-center gap-1 text-green-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{targetPlayerCount / 2} vs {targetPlayerCount / 2}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: canContinue ? 1.03 : 1 }}
              whileTap={{ scale: canContinue ? 0.97 : 1 }}
            >
              <Button
                onClick={handleGenerateTeams}
                disabled={!canContinue}
                className={`
                  w-full h-16 text-lg relative overflow-hidden group border-2
                  ${canContinue 
                    ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 text-white shadow-2xl shadow-orange-500/50 border-orange-400/50 hover:shadow-orange-500/70' 
                    : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed border-zinc-700/50'
                  }
                  transition-all duration-300
                `}
              >
                {canContinue && (
                  <>
                    {/* Efecto de brillo animado */}
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
                    
                    {/* Partículas flotantes */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${15 + i * 15}%`,
                            top: '50%',
                          }}
                          animate={{
                            y: [-10, -30, -10],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </motion.div>
                  </>
                )}
                
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Zap className={`w-6 h-6 ${canContinue ? 'group-hover:rotate-12 animate-pulse' : ''} transition-transform`} />
                  <span className="tracking-wider">
                    {canContinue ? `GENERAR SORTEO ${targetPlayerCount / 2} vs ${targetPlayerCount / 2}` : `SELECCIONA ${targetPlayerCount} JUGADORES`}
                  </span>
                  <ArrowRight className={`w-6 h-6 ${canContinue ? 'group-hover:translate-x-2' : ''} transition-transform`} />
                </span>
              </Button>
            </motion.div>

            {!canContinue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-3"
              >
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700 rounded-full px-4 py-2">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className={styles.textBright}>
                      {selectedIds.size}/{targetPlayerCount}
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm">
                    {selectedIds.size < targetPlayerCount 
                      ? `Faltan ${targetPlayerCount - selectedIds.size} jugador${targetPlayerCount - selectedIds.size !== 1 ? 'es' : ''}`
                      : 'Debe ser número par'
                    }
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Paso 2: Vista previa del equilibrio
  if (step === 'preview' && teams) {
    return (
      <DrawPreview
        teamA={teams.teamA}
        teamB={teams.teamB}
        onBack={() => setStep('select')}
        onConfirm={handleConfirmDraw}
        theme={theme}
      />
    );
  }

  // Paso 3: Resultados
  if (step === 'results' && teams) {
    return (
      <DrawResults
        key={drawKey} // Key única para resetear la animación
        teamA={teams.teamA}
        teamB={teams.teamB}
        onRedraw={handleRedraw}
        onBackToSelection={handleBackToSelection}
        onFinish={handleFinish}
        theme={theme}
      />
    );
  }

  return null;
}
