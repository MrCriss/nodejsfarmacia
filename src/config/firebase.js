import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

export default app;
