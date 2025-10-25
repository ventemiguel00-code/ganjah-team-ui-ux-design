import { useState } from 'react';
import { Player, Match } from '../types';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card } from './ui/card';
import { MessageCircle, Send, Users, CheckCircle2, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface WhatsAppRemindersProps {
  match: Match;
  open: boolean;
  onClose: () => void;
}

interface PlayerWithStatus extends Player {
  sent: boolean;
}

export function WhatsAppReminders({ match, open, onClose }: WhatsAppRemindersProps) {
  const [playersStatus, setPlayersStatus] = useState<Map<string, boolean>>(new Map());

  // Obtener todos los jugadores del partido que tienen teléfono
  const allPlayers = [...(match.teamA || []), ...(match.teamB || [])];
  const playersWithPhone = allPlayers.filter(p => p.phone);
  const playersWithoutPhone = allPlayers.filter(p => !p.phone);

  // Generar mensaje personalizado
  const generateMessage = (player: Player): string => {
    const date = new Date(match.date).toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `¡Hola ${player.name.split(' ')[0]}! 👋⚽\n\n` +
           `🌿 *GANJAH TEAM - Recordatorio de Partido*\n\n` +
           `📅 *Fecha:* ${date}\n` +
           `🕐 *Hora:* ${match.time}\n` +
           `📍 *Lugar:* ${match.location}\n\n` +
           `¡Nos vemos en la cancha! 💪🔥`;
  };

  // Generar enlace de WhatsApp Web
  const generateWhatsAppLink = (player: Player): string => {
    if (!player.phone) return '';
    
    const phone = player.phone.replace(/[^0-9]/g, ''); // Limpiar formato
    const message = encodeURIComponent(generateMessage(player));
    
    return `https://wa.me/${phone}?text=${message}`;
  };

  // Enviar mensaje individual
  const sendIndividualMessage = (player: Player) => {
    const link = generateWhatsAppLink(player);
    if (link) {
      window.open(link, '_blank');
      setPlayersStatus(prev => new Map(prev).set(player.id, true));
    }
  };

  // Enviar mensajes masivos (abre pestañas secuencialmente)
  const sendMassMessages = () => {
    playersWithPhone.forEach((player, index) => {
      setTimeout(() => {
        sendIndividualMessage(player);
      }, index * 1000); // Espera 1 segundo entre cada mensaje para no saturar
    });
  };

  const sentCount = Array.from(playersStatus.values()).filter(Boolean).length;
  const totalWithPhone = playersWithPhone.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-[#39FF14] flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Recordatorios de WhatsApp
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Envía recordatorios personalizados a los jugadores del partido
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-zinc-800 border-zinc-700 p-3">
              <div className="text-center">
                <Users className="w-5 h-5 text-[#39FF14] mx-auto mb-1" />
                <div className="text-2xl font-bold">{totalWithPhone}</div>
                <div className="text-xs text-zinc-400">Con teléfono</div>
              </div>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700 p-3">
              <div className="text-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-2xl font-bold">{sentCount}</div>
                <div className="text-xs text-zinc-400">Enviados</div>
              </div>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700 p-3">
              <div className="text-center">
                <MessageCircle className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-2xl font-bold">{totalWithPhone - sentCount}</div>
                <div className="text-xs text-zinc-400">Pendientes</div>
              </div>
            </Card>
          </div>

          {/* Botón de envío masivo */}
          {totalWithPhone > 0 && (
            <Button
              onClick={sendMassMessages}
              className="w-full bg-[#39FF14] hover:bg-[#32E010] text-black"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar a Todos ({totalWithPhone} mensajes)
            </Button>
          )}

          {/* Lista de jugadores con teléfono */}
          {playersWithPhone.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm text-zinc-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Jugadores Convocados
              </h3>
              <ScrollArea className="h-64 pr-4">
                <div className="space-y-2">
                  {playersWithPhone.map(player => {
                    const isSent = playersStatus.get(player.id) || false;
                    const team = match.teamA?.some(p => p.id === player.id) ? 'A' : 'B';
                    
                    return (
                      <Card
                        key={player.id}
                        className="bg-zinc-800 border-zinc-700 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{player.name}</span>
                              <Badge variant="outline" className="text-xs">
                                Equipo {team}
                              </Badge>
                              {isSent && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">
                              {player.phone}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => sendIndividualMessage(player)}
                            className={
                              isSent
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-[#39FF14] hover:bg-[#32E010] text-black"
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Jugadores sin teléfono */}
          {playersWithoutPhone.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm text-zinc-400">
                ⚠️ Jugadores sin teléfono ({playersWithoutPhone.length})
              </h3>
              <Card className="bg-zinc-800 border-zinc-700 p-3">
                <div className="text-sm text-zinc-400 space-y-1">
                  {playersWithoutPhone.map(player => (
                    <div key={player.id} className="flex items-center justify-between">
                      <span>{player.name}</span>
                      <Badge variant="outline" className="text-xs text-yellow-500">
                        Sin teléfono
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Vista previa del mensaje */}
          <div className="space-y-2">
            <h3 className="text-sm text-zinc-400">📱 Vista previa del mensaje</h3>
            <Card className="bg-zinc-800 border-zinc-700 p-4">
              <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-sans">
                {playersWithPhone.length > 0 
                  ? generateMessage(playersWithPhone[0])
                  : "No hay jugadores con teléfono"}
              </pre>
            </Card>
          </div>

          {/* Nota informativa */}
          <div className="text-xs text-zinc-500 bg-zinc-800 border border-zinc-700 rounded p-3">
            <p className="mb-1">💡 <strong>Cómo funciona:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Los mensajes se abren en WhatsApp Web</li>
              <li>Debes hacer clic en "Enviar" en cada ventana</li>
              <li>El envío masivo abre las ventanas automáticamente</li>
              <li>Se recomienda tener WhatsApp Web conectado</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
