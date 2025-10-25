import { Card } from './ui/card';
import { Check } from 'lucide-react';

export type Theme = 'cyberpunk' | 'ganjah' | 'retro' | 'premium' | 'fire';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes = [
  {
    id: 'cyberpunk' as Theme,
    name: 'Cyberpunk Sport',
    description: 'Futurista con neones cyan y magenta',
    preview: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
    accent: '#06b6d4'
  },
  {
    id: 'ganjah' as Theme,
    name: 'Ganjah Green',
    description: 'Verde natural con detalles dorados',
    preview: 'linear-gradient(135deg, #059669 0%, #84cc16 100%)',
    accent: '#10b981'
  },
  {
    id: 'retro' as Theme,
    name: 'Retro Arcade',
    description: 'Estilo años 80/90 vibrante',
    preview: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
    accent: '#ec4899'
  },
  {
    id: 'premium' as Theme,
    name: 'Premium Dark',
    description: 'Elegancia en negro con oro',
    preview: 'linear-gradient(135deg, #000000 0%, #f59e0b 100%)',
    accent: '#f59e0b'
  },
  {
    id: 'fire' as Theme,
    name: 'Fire & Ice',
    description: 'Contraste dramático fuego vs hielo',
    preview: 'linear-gradient(135deg, #f97316 0%, #000000 50%, #06b6d4 100%)',
    accent: '#f97316'
  }
];

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-white mb-1">Tema de la Aplicación</h3>
        <p className="text-zinc-500 text-sm">Elige tu estilo favorito</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {themes.map(theme => (
          <Card
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`
              p-4 cursor-pointer transition-all
              ${currentTheme === theme.id 
                ? 'bg-zinc-800 border-2' 
                : 'bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-700'
              }
            `}
            style={currentTheme === theme.id ? { borderColor: theme.accent } : {}}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-20 h-20 rounded-xl shrink-0 border-2 border-zinc-700 shadow-lg"
                style={{ background: theme.preview }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white">{theme.name}</h4>
                  {currentTheme === theme.id && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.accent }}
                    >
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-zinc-400">{theme.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
