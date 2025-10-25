import { useState } from 'react';
import { motion } from 'motion/react';
import { Player, UserRole } from '../types';
import { PlayerCard } from './PlayerCard';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Users } from 'lucide-react';

interface PlayersPageProps {
  players: Player[];
  userRole: UserRole;
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
  onUpdatePlayer: (id: string, player: Partial<Player>) => void;
  onDeletePlayer: (id: string) => void;
}

export function PlayersPage({ players, userRole, onAddPlayer, onUpdatePlayer }: PlayersPageProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    primaryPosition: 'DF' as Player['primaryPosition'],
    phone: ''
  });

  const handleSubmit = () => {
    if (newPlayer.name.trim()) {
      onAddPlayer({
        ...newPlayer,
        phone: newPlayer.phone.trim() || undefined
      });
      setNewPlayer({ name: '', primaryPosition: 'DF', phone: '' });
      setShowAddDialog(false);
    }
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setShowEditDialog(true);
  };

  const handleUpdateSubmit = () => {
    if (editingPlayer) {
      onUpdatePlayer(editingPlayer.id, {
        name: editingPlayer.name,
        primaryPosition: editingPlayer.primaryPosition,
        phone: editingPlayer.phone?.trim() || undefined
      });
      setShowEditDialog(false);
      setEditingPlayer(null);
    }
  };

  return (
    <>
      <div className="safe-bottom bg-black">
        <div className="max-w-md mx-auto p-4 pt-6 space-y-6 w-full">
          {/* Header */}
          <div>
            <h2 className="text-white mb-2">Jugadores</h2>
            <div className="flex items-center gap-2 text-[#39FF14]">
              <Users className="w-5 h-5" />
              <span>Total Jugadores: {players.length}</span>
            </div>
          </div>

          {/* Lista de jugadores con animación escalonada */}
          <motion.div 
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <PlayerCard 
                  player={player}
                  onEdit={userRole === 'admin' ? () => handleEdit(player) : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Botón Flotante con animación - FUERA del contenedor scrollable */}
      {userRole === 'admin' && (
        <motion.button
          onClick={() => setShowAddDialog(true)}
          className="fixed right-4 bottom-24 w-14 h-14 bg-[#39FF14] hover:bg-[#32E010] rounded-full shadow-lg shadow-[#39FF14]/30 flex items-center justify-center text-black transition-all z-10"
          style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
          aria-label="Añadir jugador"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}

      {/* Dialog para añadir jugador */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#39FF14]">Añadir Nuevo Jugador</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Completa los datos del nuevo jugador para agregarlo al equipo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Nombre</Label>
              <Input
                id="name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Nombre del jugador"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-zinc-300">Posición Principal</Label>
              <Select
                value={newPlayer.primaryPosition}
                onValueChange={(value) => setNewPlayer({ ...newPlayer, primaryPosition: value as Player['primaryPosition'] })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="PO">Portero (PO)</SelectItem>
                  <SelectItem value="DF">Defensa (DF)</SelectItem>
                  <SelectItem value="MC">Mediocampista (MC)</SelectItem>
                  <SelectItem value="DL">Delantero (DL)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-zinc-300">Teléfono (Opcional)</Label>
              <Input
                id="phone"
                type="tel"
                value={newPlayer.phone}
                onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="+57 300 123 4567"
              />
              <p className="text-xs text-zinc-500">
                Para recordatorios de WhatsApp
              </p>
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
              onClick={handleSubmit}
              disabled={!newPlayer.name.trim()}
              className="flex-1 bg-[#39FF14] hover:bg-[#32E010] text-black"
            >
              Añadir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar jugador */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#39FF14]">Editar Jugador</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Modifica los datos del jugador.
            </DialogDescription>
          </DialogHeader>
          
          {editingPlayer && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-zinc-300">Nombre</Label>
                <Input
                  id="edit-name"
                  value={editingPlayer.name}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Nombre del jugador"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-position" className="text-zinc-300">Posición Principal</Label>
                <Select
                  value={editingPlayer.primaryPosition}
                  onValueChange={(value) => setEditingPlayer({ ...editingPlayer, primaryPosition: value as Player['primaryPosition'] })}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="PO">Portero (PO)</SelectItem>
                    <SelectItem value="DF">Defensa (DF)</SelectItem>
                    <SelectItem value="MC">Mediocampista (MC)</SelectItem>
                    <SelectItem value="DL">Delantero (DL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-zinc-300">Teléfono (Opcional)</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editingPlayer.phone || ''}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, phone: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="+57 300 123 4567"
                />
                <p className="text-xs text-zinc-500">
                  Para recordatorios de WhatsApp
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false);
                setEditingPlayer(null);
              }}
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateSubmit}
              disabled={!editingPlayer?.name.trim()}
              className="flex-1 bg-[#39FF14] hover:bg-[#32E010] text-black"
            >
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
