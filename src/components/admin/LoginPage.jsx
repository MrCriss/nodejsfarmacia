import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin()) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // El useEffect arriba verificará isAdmin() y redirigirá si es necesario
      // Si no es admin, mostraremos error abajo
      setTimeout(() => {
        if (!isAdmin()) {
          setError('Error al iniciar sesión. Asegúrate de que tu rol es admin.');
        }
      }, 500);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Usuario no encontrado.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido.');
      } else {
        setError(err.message || 'Error al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Farmacia</h1>
          <p className="text-on-surface-variant">Inicia sesión para acceder al panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="admin@farmaciabonita.cl"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Contraseña
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-on-surface-variant mb-3">¿No tienes cuenta admin?</p>
          <a
            href="/admin/setup"
            className="inline-block bg-secondary text-on-secondary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Crear Nueva Cuenta
          </a>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900 font-medium mb-2">📝 Flujo de autenticación:</p>
          <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
            <li>Ve a <a href="/admin/setup" className="underline font-semibold">Crear Nueva Cuenta</a></li>
            <li>Completa el formulario y crea el usuario</li>
            <li>Ve a <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Firebase Console</a></li>
            <li>Firestore Database → users → Edita el campo "role" a "admin"</li>
            <li>Vuelve aquí e inicia sesión</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
