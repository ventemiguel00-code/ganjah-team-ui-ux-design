/**
 * Convierte una fecha en formato YYYY-MM-DD a un objeto Date en zona horaria local
 * Esto evita problemas de conversión UTC que pueden hacer que las fechas se muestren 
 * con un día de diferencia en zonas horarias negativas (como Colombia UTC-5)
 * 
 * @param dateString - Fecha en formato "YYYY-MM-DD"
 * @returns Date object en hora local
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formatea una fecha para mostrar en español con día de semana completo
 * 
 * @param dateString - Fecha en formato "YYYY-MM-DD"
 * @returns Fecha formateada. Ej: "domingo, 19 de octubre de 2025"
 */
export function formatFullDate(dateString: string): string {
  return parseLocalDate(dateString).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatea una fecha para mostrar en español formato corto
 * 
 * @param dateString - Fecha en formato "YYYY-MM-DD"
 * @returns Fecha formateada. Ej: "19/10/2025"
 */
export function formatShortDate(dateString: string): string {
  return parseLocalDate(dateString).toLocaleDateString('es-ES');
}
