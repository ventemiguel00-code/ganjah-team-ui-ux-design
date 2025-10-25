import { Home, Users, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';
import { GanjahLogo } from './GanjahLogo';

type NavPage = 'home' | 'players' | 'matches' | 'profile';

interface BottomNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  theme?: Theme;
}

export function BottomNav({ currentPage, onNavigate, theme = 'fire' }: BottomNavProps) {
  const navItems: { page: NavPage; icon: typeof Home | 'logo'; label: string }[] = [
    { page: 'home', icon: 'logo', label: 'Inicio' },
    { page: 'players', icon: Users, label: 'Jugadores' },
    { page: 'matches', icon: Calendar, label: 'Partidos' },
    { page: 'profile', icon: User, label: 'Perfil' }
  ];

  const styles = getThemeStyles(theme);

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-zinc-950 border-t ${styles.border} safe-bottom z-50`}
         style={{ 
           paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
         }}>
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {navItems.map(({ page, icon, label }) => {
          const isActive = currentPage === page;
          const isLogo = icon === 'logo';
          
          return (
            <motion.button
              key={page}
              onClick={() => onNavigate(page)}
              className="relative flex flex-col items-center justify-center gap-1 px-2 sm:px-4 flex-1 h-full transition-colors"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              {/* Indicador activo */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className={`absolute inset-0 ${styles.cardBg} opacity-20 rounded-lg`}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              
              <motion.div
                animate={{
                  y: isActive ? -2 : 0,
                  scale: isActive ? 1.1 : 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="relative z-10"
              >
                {isLogo ? (
                  <div className={isActive ? styles.navActive : styles.navInactive}>
                    <GanjahLogo size="sm" animated={false} theme={theme} />
                  </div>
                ) : (
                  <>
                    {(() => {
                      const Icon = icon as typeof Home;
                      return (
                        <Icon 
                          className={`w-6 h-6 ${isActive ? styles.navActive : styles.navInactive}`}
                        />
                      );
                    })()}
                  </>
                )}
              </motion.div>
              
              <motion.span 
                className={`text-xs whitespace-nowrap relative z-10 ${isActive ? styles.navActive : styles.navInactive}`}
                animate={{
                  fontWeight: isActive ? 600 : 400
                }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
