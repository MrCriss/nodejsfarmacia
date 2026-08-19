import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// ⚠️ IMPORTANTE: Reemplaza estas credenciales con las de tu proyecto Firebase
// Las credenciales públicas de Firebase son seguras para apps cliente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyNotForProduction",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "farmacia-react.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "farmacia-react",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "farmacia-react.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Emulador para desarrollo (opcional)
if (import.meta.env.MODE === 'development' && !auth.app._deleted) {
  try {
    // Descomentar solo si estás usando emuladores locales
    // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    // Emulator ya está conectado o no disponible
    console.debug('Emulator info:', error.message);
  }
}

export default app;
