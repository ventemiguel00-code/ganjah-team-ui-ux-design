import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  theme?: Theme;
  delay?: number;
}

export function StatsCard({ icon: Icon, label, value, theme = 'fire', delay = 0 }: StatsCardProps) {
  const styles = getThemeStyles(theme);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      className={`${styles.card} p-4 rounded-xl backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <div className={`${styles.accent} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-zinc-400 mb-0.5">{label}</div>
          <div className={`text-2xl ${styles.textBright}`}>{value}</div>
        </div>
      </div>
    </motion.div>
  );
}
