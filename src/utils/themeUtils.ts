import { cyberpunkStyles } from '../components/themes/CyberpunkTheme';
import { ganjahGreenStyles } from '../components/themes/GanjahGreenTheme';
import { retroArcadeStyles } from '../components/themes/RetroArcadeTheme';
import { premiumDarkStyles } from '../components/themes/PremiumDarkTheme';
import { fireIceStyles } from '../components/themes/FireIceTheme';
import { Theme } from '../components/ThemeSelector';

export function getThemeStyles(theme: Theme) {
  switch (theme) {
    case 'cyberpunk':
      return cyberpunkStyles;
    case 'ganjah':
      return ganjahGreenStyles;
    case 'retro':
      return retroArcadeStyles;
    case 'premium':
      return premiumDarkStyles;
    case 'fire':
      return fireIceStyles;
    default:
      return cyberpunkStyles;
  }
}

/**
 * Obtiene el tema automático basado en el día del año
 * Rota entre los 5 temas disponibles en un ciclo de 5 días
 */
export function getAutomaticTheme(): Theme {
  const themes: Theme[] = ['ganjah', 'cyberpunk', 'retro', 'premium', 'fire'];
  
  // Obtener el día del año (1-365/366)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Seleccionar tema basado en el día (módulo 5)
  const themeIndex = dayOfYear % themes.length;
  
  return themes[themeIndex];
}

/**
 * Verifica si el tema automático debe actualizarse
 * Retorna el tema automático si es necesario, o null si no hay cambios
 */
export function checkAutomaticThemeUpdate(currentTheme: Theme): Theme | null {
  const LAST_CHECK_KEY = 'ganjah_theme_last_check';
  const AUTO_THEME_ENABLED_KEY = 'ganjah_auto_theme_enabled';
  
  // Verificar si el tema automático está habilitado
  const autoThemeEnabled = localStorage.getItem(AUTO_THEME_ENABLED_KEY);
  if (autoThemeEnabled === 'false') {
    return null;
  }
  
  const today = new Date().toDateString();
  const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
  
  // Si es un día diferente o es la primera vez
  if (lastCheck !== today) {
    const automaticTheme = getAutomaticTheme();
    localStorage.setItem(LAST_CHECK_KEY, today);
    
    // Solo retornar el nuevo tema si es diferente al actual
    if (automaticTheme !== currentTheme) {
      return automaticTheme;
    }
  }
  
  return null;
}

/**
 * Activa o desactiva el cambio automático de tema
 */
export function setAutoThemeEnabled(enabled: boolean): void {
  const AUTO_THEME_ENABLED_KEY = 'ganjah_auto_theme_enabled';
  localStorage.setItem(AUTO_THEME_ENABLED_KEY, enabled.toString());
}

/**
 * Verifica si el cambio automático de tema está habilitado
 */
export function isAutoThemeEnabled(): boolean {
  const AUTO_THEME_ENABLED_KEY = 'ganjah_auto_theme_enabled';
  const value = localStorage.getItem(AUTO_THEME_ENABLED_KEY);
  // Por defecto está habilitado
  return value !== 'false';
}

/**
 * Obtiene el tema inicial (automático o el guardado manualmente)
 */
export function getInitialTheme(): Theme {
  const MANUAL_THEME_KEY = 'ganjah_manual_theme';
  
  // Si el tema automático está habilitado, usar el tema del día
  if (isAutoThemeEnabled()) {
    return getAutomaticTheme();
  }
  
  // Si está deshabilitado, usar el tema guardado manualmente
  const savedTheme = localStorage.getItem(MANUAL_THEME_KEY);
  return (savedTheme as Theme) || 'ganjah';
}

/**
 * Guarda el tema seleccionado manualmente y desactiva el tema automático
 */
export function saveManualTheme(theme: Theme): void {
  const MANUAL_THEME_KEY = 'ganjah_manual_theme';
  localStorage.setItem(MANUAL_THEME_KEY, theme);
  setAutoThemeEnabled(false);
}
