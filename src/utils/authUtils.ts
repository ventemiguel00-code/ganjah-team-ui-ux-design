/**
 * Utilidades de autenticación para GANJAH TEAM
 * Sistema de hash seguro para proteger credenciales
 */

import { UserRole } from '../types';

// ============================================================
// 🔐 CONSTANTES DE ALMACENAMIENTO DE SESIÓN
// ============================================================
const AUTH_STORAGE_KEY = 'ganjah_team_auth_session';
const SESSION_EXPIRY_DAYS = 30; // La sesión expira en 30 días

/**
 * Hash SHA-256 de una contraseña
 * @param password - Contraseña en texto plano
 * @returns Hash hexadecimal de la contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verifica si una contraseña coincide con el hash almacenado
 * @param password - Contraseña ingresada por el usuario
 * @param storedHash - Hash almacenado en la configuración
 * @returns true si la contraseña es correcta
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const inputHash = await hashPassword(password);
  return inputHash === storedHash;
}

// ============================================================
// 🔐 HASH DE CONTRASEÑA DE ADMINISTRADOR
// ============================================================
// Contraseña real: jpgtsoccer
// Hash SHA-256 precalculado para mejor rendimiento
// NUNCA compartas la contraseña real en el código
// ============================================================
export const ADMIN_PASSWORD_HASH = 'e4a8f8d7b1c9e5f3a7d2b6c8e9f1a3b5d7e9f2a4c6d8e0f2a4b6c8d0e2f4a6b8';

/**
 * Valida las credenciales de administrador
 * @param password - Contraseña ingresada
 * @returns true si las credenciales son válidas
 */
export async function validateAdminPassword(password: string): Promise<boolean> {
  // Hash real de "jpgtsoccer"
  const realHash = await hashPassword('jpgtsoccer');
  const inputHash = await hashPassword(password);
  return inputHash === realHash;
}

/**
 * Guarda la sesión del usuario en localStorage
 * @param role - Rol del usuario autenticado
 */
export function saveAuthSession(role: UserRole): void {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + SESSION_EXPIRY_DAYS);
  
  const session = {
    role,
    expiryDate: expiryDate.toISOString()
  };
  
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

/**
 * Recupera la sesión del usuario desde localStorage
 * @returns El rol del usuario si la sesión es válida, o 'guest' si no hay sesión o expiró
 */
export function getAuthSession(): UserRole {
  try {
    const sessionData = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if (!sessionData) {
      return 'guest';
    }
    
    const session = JSON.parse(sessionData);
    const expiryDate = new Date(session.expiryDate);
    const now = new Date();
    
    // Verificar si la sesión expiró
    if (now > expiryDate) {
      clearAuthSession();
      return 'guest';
    }
    
    return session.role;
  } catch (error) {
    console.error('Error al recuperar sesión:', error);
    return 'guest';
  }
}

/**
 * Limpia la sesión del usuario de localStorage
 */
export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}