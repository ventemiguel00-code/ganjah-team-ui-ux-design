import { useState } from 'react';
import { Match, Player, UserRole } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, Clock, MapPin, Plus, Trophy, Trash2, Edit, MessageCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { parseLocalDate } from '../utils/dateUtils';
import { WhatsAppReminders } from './WhatsAppReminders';

interface MatchesPageProps {
  matches: Match[];
  players: Player[];
  userRole: UserRole;
  onAddMatch: (match: Omit<Match, 'id'>) => void;
  onUpdateMatch: (id: string, match: Partial<Match>) => void;
  onDeleteMatch: (id: string) => void;
}

export function MatchesPage({ matches, players, userRole, onAddMatch, onUpdateMatch, onDeleteMatch }: MatchesPageProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRemindersDialog, setShowRemindersDialog] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [reminderMatch, setReminderMatch] = useState<Match | null>(null);
  const [newMatch, setNewMatch] = useState({
    date: '',
    time: '19:00',
    location: 'Cancha Municipal Norte'
  });

  const upcomingMatches = matches.filter(m => !m.isCompleted);
  const completedMatches = matches.filter(m => m.isCompleted);

  const handleAddMatch = () => {
    if (newMatch.date && newMatch.time) {
      onAddMatch({
        ...newMatch,
        isCompleted: false
      });
      setNewMatch({ date: '', time: '19:00', location: 'Cancha Municipal Norte' });
      setShowAddDialog(false);
    }
  };

  const handleUpdateMVP = (matchId: string, playerId: string) => {
    onUpdateMatch(matchId, { mvp: playerId });
  };

  const handleEditMatch = (match: Match) => {
    setEditingMatch(match);
    setShowEditDialog(true);
  };

  const handleUpdateMatch = () => {
    if (editingMatch && editingMatch.date) {
      onUpdateMatch(editingMatch.id, {
        date: editingMatch.date,
        time: editingMatch.time,
        location: editingMatch.location
      });
      setShowEditDialog(false);
      setEditingMatch(null);
    }
  };

  return (
    <>
      <div className="safe-bottom bg-black">
        <div className="max-w-md mx-auto p-4 pt-6 space-y-6 w-full">
          {/* Header */}
          <h2 className="text-white">Partidos</h2>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full bg-zinc-900 border-zinc-800 h-12">
            <TabsTrigger 
              value="upcoming" 
              className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-[#39FF14] text-zinc-400"
            >
              Próximos
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-[#39FF14] text-zinc-400"
            >
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-3">
              {upcomingMatches.length === 0 ? (
                <Card className="bg-zinc-900 border-zinc-800 p-8 text-center">
                  <p className="text-zinc-500">No hay partidos programados</p>
                </Card>
              ) : (
                upcomingMatches.map(match => (
                  <Card key={match.id} className="bg-zinc-900 border-zinc-800 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-4 h-4 text-[#39FF14]" />
                          <span className="text-sm">
                            {parseLocalDate(match.date).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300">
                          <Clock className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm">{match.time} hrs</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300">
                          <MapPin className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm">{match.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {/* Botón de recordatorios (visible si hay equipos) */}
                        {match.teamA && match.teamB && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setReminderMatch(match);
                              setShowRemindersDialog(true);
                            }}
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-[#39FF14] transition-colors"
                            title="Enviar recordatorios"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        )}
                        {userRole === 'admin' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditMatch(match);
                              }}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-[#39FF14] transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('¿Estás seguro de que deseas eliminar este partido?')) {
                                  onDeleteMatch(match.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-3">
              {completedMatches.length === 0 ? (
                <Card className="bg-zinc-900 border-zinc-800 p-8 text-center">
                  <p className="text-zinc-500">No hay partidos en el historial</p>
                </Card>
              ) : (
                completedMatches.map(match => (
                  <Card
                    key={match.id}
                    className="bg-zinc-900 border-zinc-800 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="flex-1 space-y-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedMatch(match)}
                      >
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-4 h-4 text-[#39FF14]" />
                          <span className="text-sm">
                            {parseLocalDate(match.date).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        {match.mvp && (
                          <div className="flex items-center gap-2 text-[#39FF14]">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm">
                              MVP: {players.find(p => p.id === match.mvp)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                      {userRole === 'admin' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('¿Estás seguro de que deseas eliminar este partido del historial?')) {
                              onDeleteMatch(match.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      {/* Botón Flotante - FUERA del contenedor scrollable */}
      {userRole === 'admin' && (
        <button
          onClick={() => setShowAddDialog(true)}
          className="fixed right-4 bottom-24 w-14 h-14 bg-[#39FF14] hover:bg-[#32E010] active:scale-95 rounded-full shadow-lg shadow-[#39FF14]/30 flex items-center justify-center text-black transition-all z-10"
          style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
          aria-label="Añadir partido"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Dialog para añadir partido */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#39FF14]">Programar Nuevo Partido</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Programa un nuevo partido configurando la fecha, hora y ubicación.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-zinc-300">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={newMatch.date}
                onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-zinc-300">Hora</Label>
              <Input
                id="time"
                type="time"
                value={newMatch.time}
                onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-zinc-300">Cancha / Ubicación</Label>
              <Input
                id="location"
                value={newMatch.location}
                onChange={(e) => setNewMatch({ ...newMatch, location: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Ej: Cancha Municipal Norte"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddMatch}
              disabled={!newMatch.date}
              className="flex-1 bg-[#39FF14] hover:bg-[#32E010] text-black"
            >
              Programar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar partido */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#39FF14]">Editar Partido</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Modifica la información del partido programado.
            </DialogDescription>
          </DialogHeader>

          {editingMatch && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date" className="text-zinc-300">Fecha</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingMatch.date}
                  onChange={(e) => setEditingMatch({ ...editingMatch, date: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time" className="text-zinc-300">Hora</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editingMatch.time}
                  onChange={(e) => setEditingMatch({ ...editingMatch, time: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-location" className="text-zinc-300">Cancha / Ubicación</Label>
                <Input
                  id="edit-location"
                  value={editingMatch.location}
                  onChange={(e) => setEditingMatch({ ...editingMatch, location: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Ej: Cancha Municipal Norte"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false);
                setEditingMatch(null);
              }}
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateMatch}
              disabled={!editingMatch?.date}
              className="flex-1 bg-[#39FF14] hover:bg-[#32E010] text-black"
            >
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para ver detalle de partido completado */}
      {selectedMatch && (
        <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#39FF14]">Detalle del Partido</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Información completa del partido seleccionado.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-300">
                    {parseLocalDate(selectedMatch.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-300">{selectedMatch.location}</span>
                </div>
              </div>

              {selectedMatch.teamA && selectedMatch.teamB && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-3">
                    <h4 className="text-red-400 text-sm mb-2">Equipo A</h4>
                    <div className="space-y-1 text-xs text-zinc-300">
                      {selectedMatch.teamA.map(p => (
                        <div key={p.id}>{p.name}</div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-3">
                    <h4 className="text-blue-400 text-sm mb-2">Equipo B</h4>
                    <div className="space-y-1 text-xs text-zinc-300">
                      {selectedMatch.teamB.map(p => (
                        <div key={p.id}>{p.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {userRole === 'admin' && (
                <div className="space-y-2 pt-4 border-t border-zinc-800">
                  <Label className="text-zinc-300">Jugador de la Semana (MVP)</Label>
                  <Select
                    value={selectedMatch.mvp || ''}
                    onValueChange={(value) => handleUpdateMVP(selectedMatch.id, value)}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Seleccionar MVP" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {players.map(player => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog de Recordatorios de WhatsApp */}
      {reminderMatch && (
        <WhatsAppReminders
          match={reminderMatch}
          open={showRemindersDialog}
          onClose={() => {
            setShowRemindersDialog(false);
            setReminderMatch(null);
          }}
        />
      )}
    </>
  );
}
