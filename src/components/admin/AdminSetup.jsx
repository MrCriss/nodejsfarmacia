import { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AdminSetup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Habilitar persistencia
      await setPersistence(auth, browserLocalPersistence);

      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Crear documento en Firestore con el mismo UID
      await setDoc(doc(db, 'users', uid), {
        email: email,
        displayName: displayName || email.split('@')[0],
        role: 'admin',
        createdAt: new Date(),
        photoURL: null
      });

      setMessage(`✅ Usuario admin creado exitosamente!
      
UID: ${uid}
Email: ${email}
Nombre: ${displayName || email.split('@')[0]}

Ahora puedes ir a /admin/login e iniciar sesión con:
- Email: ${email}
- Contraseña: ${password}`);

      // Limpiar formulario
      setEmail('');
      setPassword('');
      setDisplayName('');
    } catch (err) {
      console.error('Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado. Usa otro email o inicia sesión si ya es admin.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Crear Admin</h1>
          <p className="text-on-surface-variant">Configura la primera cuenta de administrador</p>
        </div>

        <form onSubmit={handleCreateAdmin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Nombre (Opcional)
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="Cristóbal V"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="cristobal@gmail.com"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Contraseña * (mínimo 6 caracteres)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="••••••••"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-600 whitespace-pre-wrap font-mono text-xs">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Creando admin...' : 'Crear Admin'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-800">
          <p className="font-medium mb-2">⚠️ Importante:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Este formulario crea un usuario nuevo en Firebase</li>
            <li>Se crea automáticamente en Firestore con rol "admin"</li>
            <li>Guarda el email y contraseña en un lugar seguro</li>
            <li>Después ve a /admin/login para iniciar sesión</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
