import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

/**
 * Hook para usar el contexto de autenticación
 * Debe usarse dentro de AuthProvider
 * @returns {object} Objeto con user, userRole, loading, error, register, login, logout, isAdmin, isAuthenticated
 * @throws {Error} Si se usa fuera de AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
};

export default useAuth;
