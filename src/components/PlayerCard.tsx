import { Player, Position } from '../types';
import { Badge } from './ui/badge';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';
import { Edit, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
  isSelected?: boolean;
  showCheckbox?: boolean;
  onEdit?: () => void;
  theme?: Theme;
}

export function PlayerCard({ player, onClick, isSelected, showCheckbox, onEdit, theme = 'fire' }: PlayerCardProps) {
  const styles = getThemeStyles(theme);
  const positionColors = styles.positionColors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      className={`
        flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
        ${isSelected 
          ? `${styles.accent}/10 ${styles.border.replace('border-', 'border-')}` 
          : `${styles.card} ${styles.cardHover}`
        }
      `}
    >
      {showCheckbox && (
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center shrink-0
          ${isSelected ? `${styles.accent} ${styles.border.replace('border-', 'border-')}` : 'border-zinc-600'}
        `}>
          {isSelected && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      )}
      
      <div 
        onClick={onClick}
        className={`flex-1 min-w-0 ${onClick ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-white truncate">{player.name}</span>
          <Badge variant="outline" className={`shrink-0 ${positionColors[player.primaryPosition]}`}>
            {player.primaryPosition}
          </Badge>
          {player.phone && (
            <Phone className="w-3 h-3 text-[#39FF14] shrink-0" />
          )}
        </div>
        {player.phone && (
          <div className="text-xs text-zinc-500 mt-0.5 truncate">
            {player.phone}
          </div>
        )}
      </div>

      {onEdit && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-[#39FF14] transition-colors"
        >
          <Edit className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
}
