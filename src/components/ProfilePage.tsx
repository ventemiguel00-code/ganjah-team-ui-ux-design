import { UserRole } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LogOut, Shield, User, Palette, Database, Cloud, Sparkles, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeSelector, Theme } from './ThemeSelector';
import { GanjahLogo } from './GanjahLogo';
import { validateAdminPassword } from '../utils/authUtils';
import { isAutoThemeEnabled, setAutoThemeEnabled, saveManualTheme, getAutomaticTheme } from '../utils/themeUtils';
import { Switch } from './ui/switch';

interface ProfilePageProps {
  userRole: UserRole;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  useNeon?: boolean;
}

export function ProfilePage({ userRole, onLogin, onLogout, currentTheme, onThemeChange, useNeon = false }: ProfilePageProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [autoTheme, setAutoTheme] = useState(() => isAutoThemeEnabled());

  const handleAdminLogin = async () => {
    setIsValidating(true);
    setError('');
    
    try {
      const isValid = await validateAdminPassword(password);
      
      if (isValid) {
        onLogin('admin');
        setShowLoginDialog(false);
        setPassword('');
        setError('');
      } else {
        setError('Contraseña incorrecta');
      }
    } catch (err) {
      setError('Error al validar credenciales');
    } finally {
      setIsValidating(false);
    }
  };

  const handleAutoThemeToggle = (enabled: boolean) => {
    setAutoTheme(enabled);
    setAutoThemeEnabled(enabled);
    
    if (enabled) {
      // Activar tema automático y cambiar al tema del día
      const automaticTheme = getAutomaticTheme();
      onThemeChange(automaticTheme);
    }
  };

  const handleManualThemeChange = (theme: Theme) => {
    saveManualTheme(theme);
    setAutoTheme(false);
    onThemeChange(theme);
  };

  // Mapeo de temas a días para mostrar información
  const getThemeSchedule = () => {
    const themes: Theme[] = ['ganjah', 'cyberpunk', 'retro', 'premium', 'fire'];
    const themeNames = {
      ganjah: 'Ganjah Green',
      cyberpunk: 'Cyberpunk Sport',
      retro: 'Retro Arcade',
      premium: 'Premium Dark',
      fire: 'Fire & Ice'
    };
    
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const todayIndex = dayOfYear % themes.length;
    
    return themes.map((theme, index) => {
      const daysUntil = (index - todayIndex + themes.length) % themes.length;
      let label = '';
      if (daysUntil === 0) label = 'HOY';
      else if (daysUntil === 1) label = 'Mañana';
      else label = `En ${daysUntil} días`;
      
      return {
        theme,
        name: themeNames[theme],
        label,
        isToday: daysUntil === 0
      };
    });
  };

  return (
    <>
      <div className="safe-bottom bg-black">
        <div className="max-w-md mx-auto p-4 pt-8 space-y-6 w-full">
        {/* Header con Logo */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GanjahLogo size="xl" animated theme={currentTheme} />
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
              {userRole === 'admin' ? (
                <Shield className="w-6 h-6 text-[#39FF14]" />
              ) : (
                <User className="w-6 h-6 text-zinc-500" />
              )}
            </div>
            <div className="text-left">
              <h2 className="text-white">
                {userRole === 'admin' ? 'Administrador' : 'Invitado'}
              </h2>
              <p className="text-zinc-500 text-sm">
                {userRole === 'admin' 
                  ? 'Acceso completo' 
                  : 'Solo lectura'}
              </p>
            </div>
          </div>
        </div>

        {/* Información de Rol */}
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <h3 className="text-[#39FF14] mb-3">Permisos</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
              Ver jugadores y partidos
            </li>
            {userRole === 'admin' && (
              <>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                  Gestionar jugadores (CRUD)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                  Programar partidos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                  Realizar sorteos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                  Asignar MVP
                </li>
              </>
            )}
          </ul>
        </Card>

        {/* Estado de Base de Datos */}
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-[#39FF14]" />
            <h3 className="text-white">Base de Datos</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {useNeon ? (
                <>
                  <Cloud className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-zinc-300">Supabase PostgreSQL</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-300">LocalStorage</span>
                </>
              )}
            </div>
            <span className={`px-2 py-1 rounded text-xs ${useNeon ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'}`}>
              {useNeon ? 'En la nube' : 'Local'}
            </span>
          </div>
          {!useNeon && (
            <p className="text-zinc-500 text-xs mt-3">
              💡 Para habilitar persistencia en la nube con Supabase, consulta <span className="text-[#39FF14]">supabase-schema.sql</span>
            </p>
          )}
          {useNeon && (
            <p className="text-zinc-500 text-xs mt-3">
              ℹ️ Los datos se sincronizan automáticamente con Supabase Database
            </p>
          )}
        </Card>

        {/* Selector de Tema */}
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-[#39FF14]" />
            <h3 className="text-white">Personalización</h3>
            {userRole === 'guest' && (
              <Shield className="w-4 h-4 text-zinc-500 ml-auto" />
            )}
          </div>

          {/* Solo Administrador: Toggle de Tema Automático */}
          {userRole === 'admin' ? (
            <>
              <div className="mb-6 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-white">Tema Automático Diario</span>
                  </div>
                  <Switch
                    checked={autoTheme}
                    onCheckedChange={handleAutoThemeToggle}
                  />
                </div>
                <p className="text-sm text-zinc-400 mb-3">
                  {autoTheme 
                    ? 'El tema cambia automáticamente cada día en un ciclo de 5 días' 
                    : 'Selecciona manualmente tu tema favorito'}
                </p>
                
                {autoTheme && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs text-zinc-400">Programación de temas:</span>
                    </div>
                    {getThemeSchedule().map((item) => (
                      <div 
                        key={item.theme} 
                        className={`flex items-center justify-between text-xs p-2 rounded ${
                          item.isToday ? 'bg-[#39FF14]/10 border border-[#39FF14]/30' : 'bg-zinc-800/50'
                        }`}
                      >
                        <span className={item.isToday ? 'text-[#39FF14]' : 'text-zinc-300'}>
                          {item.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${
                          item.isToday 
                            ? 'bg-[#39FF14] text-black' 
                            : 'bg-zinc-700 text-zinc-400'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selector Manual de Tema - Solo Admin */}
              <ThemeSelector 
                currentTheme={currentTheme} 
                onThemeChange={handleManualThemeChange}
              />
              {!autoTheme && (
                <p className="text-xs text-zinc-500 mt-3 text-center">
                  💡 Selecciona un tema para desactivar el cambio automático
                </p>
              )}
            </>
          ) : (
            /* Solo Invitado: Vista de solo lectura */
            <>
              {autoTheme ? (
                <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-white">Tema Automático Activo</span>
                    <span className="ml-auto px-2 py-1 rounded text-xs bg-[#39FF14]/20 text-[#39FF14]">
                      Solo lectura
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">
                    El administrador ha activado el cambio automático de tema cada día
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs text-zinc-400">Programación de temas:</span>
                    </div>
                    {getThemeSchedule().map((item) => (
                      <div 
                        key={item.theme} 
                        className={`flex items-center justify-between text-xs p-2 rounded ${
                          item.isToday ? 'bg-[#39FF14]/10 border border-[#39FF14]/30' : 'bg-zinc-800/50'
                        }`}
                      >
                        <span className={item.isToday ? 'text-[#39FF14]' : 'text-zinc-300'}>
                          {item.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${
                          item.isToday 
                            ? 'bg-[#39FF14] text-black' 
                            : 'bg-zinc-700 text-zinc-400'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-zinc-400" />
                    <span className="text-white">Tema Actual</span>
                    <span className="ml-auto px-2 py-1 rounded text-xs bg-zinc-700 text-zinc-400">
                      Solo lectura
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">
                    El administrador ha seleccionado un tema manual para la aplicación
                  </p>
                  
                  {/* Mostrar el tema actual sin permitir cambios */}
                  <div className="p-3 rounded-lg bg-zinc-800 border-2 border-[#39FF14]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-xl shrink-0 border-2 border-zinc-700 shadow-lg"
                        style={{ 
                          background: currentTheme === 'cyberpunk' 
                            ? 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)'
                            : currentTheme === 'ganjah'
                            ? 'linear-gradient(135deg, #059669 0%, #84cc16 100%)'
                            : currentTheme === 'retro'
                            ? 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)'
                            : currentTheme === 'premium'
                            ? 'linear-gradient(135deg, #000000 0%, #f59e0b 100%)'
                            : 'linear-gradient(135deg, #f97316 0%, #000000 50%, #06b6d4 100%)'
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-white mb-1">
                          {currentTheme === 'cyberpunk' ? 'Cyberpunk Sport'
                            : currentTheme === 'ganjah' ? 'Ganjah Green'
                            : currentTheme === 'retro' ? 'Retro Arcade'
                            : currentTheme === 'premium' ? 'Premium Dark'
                            : 'Fire & Ice'}
                        </h4>
                        <p className="text-sm text-zinc-400">Tema activo</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
                <p className="text-xs text-zinc-400 text-center">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Solo el administrador puede cambiar temas
                </p>
              </div>
            </>
          )}
        </Card>

        {/* Acciones */}
        <div className="space-y-3">
          {userRole === 'guest' ? (
            <Button
              onClick={() => setShowLoginDialog(true)}
              className="w-full bg-[#39FF14] hover:bg-[#32E010] text-black"
            >
              <Shield className="w-4 h-4 mr-2" />
              Acceder como Administrador
            </Button>
          ) : (
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          )}
        </div>

        {/* Información de la App */}
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <h3 className="text-zinc-400 mb-2">Acerca de GANJAH TEAM</h3>
          <p className="text-zinc-500 text-sm">
            Sistema de gestión y sorteo de equipos deportivos. 
            Versión 1.0.0
          </p>
        </Card>
        </div>
      </div>

      {/* Dialog de Login Admin - FUERA del contenedor scrollable */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#39FF14]">Acceso de Administrador</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Ingresa la contraseña de administrador para acceder a funciones avanzadas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Contraseña de Administrador</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Ingrese la contraseña"
                onKeyPress={(e) => e.key === 'Enter' && !isValidating && handleAdminLogin()}
                disabled={isValidating}
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              {isValidating && (
                <p className="text-zinc-400 text-xs">Validando...</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowLoginDialog(false);
                setPassword('');
                setError('');
              }}
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              disabled={isValidating}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAdminLogin}
              className="flex-1 bg-[#39FF14] hover:bg-[#32E010] text-black"
              disabled={isValidating}
            >
              {isValidating ? 'Validando...' : 'Acceder'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
