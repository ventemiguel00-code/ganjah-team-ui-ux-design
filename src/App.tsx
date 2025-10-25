import { useState, useEffect } from 'react';
import { Player, Match, UserRole } from './types';
import { MOCK_PLAYERS } from './data/mockData';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/HomePage';
import { PlayersPage } from './components/PlayersPage';
import { MatchesPage } from './components/MatchesPage';
import { ProfilePage } from './components/ProfilePage';
import { PageTransition } from './components/PageTransition';
import { Theme } from './components/ThemeSelector';
import { getThemeStyles, getInitialTheme, checkAutomaticThemeUpdate } from './utils/themeUtils';
import { 
  getAllPlayers, 
  getAllMatches, 
  insertPlayers, 
  insertMatch, 
  updateMatch, 
  deleteMatch,
  saveDraw,
  getLastDraw,
  updatePlayer,
  deleteDraw,
  type DrawRecord
} from './utils/supabaseService';
import { initDatabase, isSupabaseConfigured } from './utils/supabaseClient';
import { getAuthSession, saveAuthSession, clearAuthSession } from './utils/authUtils';

type Page = 'home' | 'players' | 'matches' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [lastDraw, setLastDraw] = useState<{ teamA: Player[]; teamB: Player[] } | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => getInitialTheme());
  const [isLoading, setIsLoading] = useState(true);
  
  // ============================================================
  // 🔧 SUPABASE DATABASE ACTIVADO ✅
  // ============================================================
  // Base de datos: osptacxbwmmptkuzynym (PostgreSQL en la nube)
  // URL: https://osptacxbwmmptkuzynym.supabase.co
  // ============================================================
  const [useSupabase, setUseSupabase] = useState(true); // ✅ ACTIVADO

  // ============================================================
  // 🔐 RESTAURAR SESIÓN DE AUTENTICACIÓN
  // ============================================================
  // Cargar sesión guardada al iniciar la aplicación
  useEffect(() => {
    const savedRole = getAuthSession();
    setUserRole(savedRole);
    
    if (savedRole === 'admin') {
      console.log('✅ Sesión de administrador restaurada');
    }
  }, []);

  // ============================================================
  // 🎨 CAMBIO AUTOMÁTICO DE TEMA DIARIO
  // ============================================================
  // Verificar y actualizar el tema automáticamente cada día
  useEffect(() => {
    const checkTheme = () => {
      const newTheme = checkAutomaticThemeUpdate(currentTheme);
      if (newTheme) {
        setCurrentTheme(newTheme);
        console.log(`🎨 Tema actualizado automáticamente a: ${newTheme}`);
      }
    };

    // Verificar al montar el componente
    checkTheme();

    // Verificar cada hora por si cambia el día
    const interval = setInterval(checkTheme, 60 * 60 * 1000); // 1 hora

    return () => clearInterval(interval);
  }, [currentTheme]);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Mostrar información sobre el modo actual
      if (!useSupabase) {
        console.log('💾 Modo: LocalStorage (datos locales)');
        console.log('📖 Para activar Supabase Database, lee: supabase-schema.sql');
      }
      
      // Verificar si Supabase está configurado y el flag está activado
      const shouldUseSupabase = useSupabase && isSupabaseConfigured();
      
      if (shouldUseSupabase) {
        try {
          // Inicializar base de datos (verificar conexión)
          await initDatabase();
          
          // Cargar jugadores desde Supabase
          const dbPlayers = await getAllPlayers();
          
          // Si no hay jugadores, insertar los datos mock
          if (dbPlayers.length === 0) {
            console.log('🌱 Insertando jugadores iniciales...');
            await insertPlayers(MOCK_PLAYERS);
            setPlayers(MOCK_PLAYERS);
          } else {
            setPlayers(dbPlayers);
          }
          
          // Cargar partidos desde Supabase
          const dbMatches = await getAllMatches();
          setMatches(dbMatches);
          
          // Cargar último sorteo
          const lastDrawRecord = await getLastDraw();
          if (lastDrawRecord) {
            setLastDraw({
              teamA: lastDrawRecord.teamA,
              teamB: lastDrawRecord.teamB
            });
          }
          
          console.log('✅ Datos cargados desde Supabase');
        } catch (error) {
          console.error('❌ Error conectando a Supabase, usando datos locales:', error);
          // Fallback a datos mock si falla Supabase
          setPlayers(MOCK_PLAYERS);
          setMatches([]);
        }
      } else {
        // Usar datos mock locales (LocalStorage)
        setPlayers(MOCK_PLAYERS);
        setMatches([]);
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [useSupabase]);

  // Gestión de jugadores
  const handleAddPlayer = async (newPlayer: Omit<Player, 'id'>) => {
    const player: Player = {
      ...newPlayer,
      id: `p${Date.now()}`
    };
    setPlayers([...players, player]);
    
    if (useSupabase && isSupabaseConfigured()) {
      await insertPlayers([player]);
    }
  };

  const handleUpdatePlayer = async (id: string, updates: Partial<Player>) => {
    const updatedPlayers = players.map(p => p.id === id ? { ...p, ...updates } : p);
    setPlayers(updatedPlayers);
    
    if (useSupabase && isSupabaseConfigured()) {
      const updatedPlayer = updatedPlayers.find(p => p.id === id);
      if (updatedPlayer) {
        await updatePlayer(updatedPlayer);
      }
    }
  };

  const handleDeletePlayer = async (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
    
    if (useSupabase && isSupabaseConfigured()) {
      // Nota: deletePlayer requiere implementación si quieres eliminar de la BD
      console.log('⚠️ Eliminar jugador de Supabase requiere implementación adicional');
    }
  };

  // Gestión de partidos
  const handleAddMatch = async (newMatch: Omit<Match, 'id'>) => {
    const match: Match = {
      ...newMatch,
      id: `m${Date.now()}`
    };
    setMatches([...matches, match]);
    
    if (useSupabase && isSupabaseConfigured()) {
      await insertMatch(match);
    }
  };

  const handleUpdateMatch = async (id: string, updates: Partial<Match>) => {
    const updatedMatches = matches.map(m => m.id === id ? { ...m, ...updates } : m);
    setMatches(updatedMatches);
    
    if (useSupabase && isSupabaseConfigured()) {
      const updatedMatch = updatedMatches.find(m => m.id === id);
      if (updatedMatch) {
        await updateMatch(updatedMatch);
      }
    }
  };

  const handleDeleteMatch = async (id: string) => {
    setMatches(matches.filter(m => m.id !== id));
    
    if (useSupabase && isSupabaseConfigured()) {
      await deleteMatch(id);
    }
  };

  // Sorteo
  const handleDrawComplete = async (teamA: Player[], teamB: Player[]) => {
    setLastDraw({ teamA, teamB });
    
    if (useSupabase && isSupabaseConfigured()) {
      const drawRecord: DrawRecord = {
        id: `d${Date.now()}`,
        teamA,
        teamB,
        createdAt: new Date()
      };
      await saveDraw(drawRecord);
    }
  };

  const handleDeleteLastDraw = async () => {
    if (confirm('¿Estás seguro de que deseas eliminar el último sorteo?')) {
      setLastDraw(null);
      
      if (useSupabase && isSupabaseConfigured()) {
        const lastDrawRecord = await getLastDraw();
        if (lastDrawRecord) {
          await deleteDraw(lastDrawRecord.id);
        }
      }
    }
  };

  // Autenticación
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    saveAuthSession(role); // ✅ Guardar sesión en localStorage
  };

  const handleLogout = () => {
    setUserRole('guest');
    clearAuthSession(); // ✅ Limpiar sesión de localStorage
  };

  // Obtener el próximo partido
  const upcomingMatches = matches
    .filter(m => !m.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextMatch = upcomingMatches[0];

  const themeStyles = getThemeStyles(currentTheme);

  // Mostrar pantalla de carga
  if (isLoading) {
    return (
      <div className={`h-screen flex items-center justify-center ${themeStyles.background} text-white`}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400">Cargando GANJAH TEAM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container ${themeStyles.background} text-white dark`}>
      {/* Área de contenido con scroll */}
      <div className="content-area" data-scroll-container>
        
        {/* Contenido de la página actual con transiciones */}
        <PageTransition pageKey={currentPage}>
          {currentPage === 'home' && (
            <HomePage
              nextMatch={nextMatch}
              lastDraw={lastDraw}
              userRole={userRole}
              allPlayers={players}
              allMatches={matches}
              onDrawComplete={handleDrawComplete}
              onDeleteDraw={handleDeleteLastDraw}
              theme={currentTheme}
            />
          )}

          {currentPage === 'players' && (
            <PlayersPage
              players={players}
              userRole={userRole}
              onAddPlayer={handleAddPlayer}
              onUpdatePlayer={handleUpdatePlayer}
              onDeletePlayer={handleDeletePlayer}
            />
          )}

          {currentPage === 'matches' && (
            <MatchesPage
              matches={matches}
              players={players}
              userRole={userRole}
              onAddMatch={handleAddMatch}
              onUpdateMatch={handleUpdateMatch}
              onDeleteMatch={handleDeleteMatch}
            />
          )}

          {currentPage === 'profile' && (
            <ProfilePage
              userRole={userRole}
              onLogin={handleLogin}
              onLogout={handleLogout}
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
              useNeon={useSupabase}
            />
          )}
        </PageTransition>
      </div>

      {/* Navegación inferior */}
      <div className="bottom-navigation">
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} theme={currentTheme} />
      </div>
    </div>
  );
}