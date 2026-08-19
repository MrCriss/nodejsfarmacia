import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Crear contexto de autenticación
const AuthContext = createContext(null);

/**
 * Proveedor de autenticación
 * Envuelve tu app con este componente para acceder a auth
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setError(null);

      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Obtener rol del usuario desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || 'user');
          }
        } catch (err) {
          console.error('Error obteniendo rol:', err);
          setUserRole('user');
        }
      } else {
        setUser(null);
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Registrar nuevo usuario
   */
  const register = async (email, password, displayName) => {
    try {
      setError(null);

      // Crear usuario en Authentication
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Actualizar perfil
      if (displayName) {
        await updateProfile(firebaseUser, { displayName });
      }

      // Crear documento de usuario en Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email: firebaseUser.email,
        displayName: displayName || firebaseUser.email.split('@')[0],
        role: 'user', // Rol por defecto
        createdAt: new Date(),
        photoURL: firebaseUser.photoURL || null
      });

      setUser(firebaseUser);
      setUserRole('user');
      return firebaseUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Iniciar sesión
   */
  const login = async (email, password) => {
    try {
      setError(null);
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Obtener rol del usuario
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role || 'user');
      }

      setUser(firebaseUser);
      return firebaseUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Verificar si el usuario es admin
   */
  const isAdmin = () => userRole === 'admin';

  /**
   * Verificar si está autenticado
   */
  const isAuthenticated = () => user !== null;

  const value = {
    user,
    userRole,
    loading,
    error,
    register,
    login,
    logout,
    isAdmin,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para usar el contexto de autenticación
 * Debe usarse dentro de AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
};

export default AuthContext;
