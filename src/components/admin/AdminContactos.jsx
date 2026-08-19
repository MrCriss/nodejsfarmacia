import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminContactos = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedContacto, setSelectedContacto] = useState(null);

  useEffect(() => {
    loadContactos();
  }, []);

  const loadContactos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'contactos'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toLocaleString?.() || 'Sin fecha'
      }));
      setContactos(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError('Error al cargar contactos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

    try {
      await deleteDoc(doc(db, 'contactos', id));
      setSuccess('Contacto eliminado exitosamente');
      setSelectedContacto(null);
      loadContactos();
    } catch (err) {
      setError('Error al eliminar: ' + err.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Consultas de Contacto</h1>
        <button
          onClick={loadContactos}
          className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <span className="material-symbols-outlined">refresh</span>
          Actualizar
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de contactos */}
        <div className="lg:col-span-1">
          {loading ? (
            <div className="text-center py-8">Cargando...</div>
          ) : contactos.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">No hay contactos</div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {contactos.map(contacto => (
                <button
                  key={contacto.id}
                  onClick={() => setSelectedContacto(contacto)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedContacto?.id === contacto.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary/50'
                  }`}
                >
                  <h3 className="font-bold text-sm text-primary">{contacto.name}</h3>
                  <p className="text-xs text-on-surface-variant truncate">{contacto.email}</p>
                  <p className="text-xs text-gray-500 mt-1">{contacto.createdAt}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalles del contacto */}
        <div className="lg:col-span-2">
          {selectedContacto ? (
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{selectedContacto.name}</h2>
                  <p className="text-on-surface-variant">{selectedContacto.email}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedContacto.createdAt}</p>
                </div>
                <button
                  onClick={() => handleDelete(selectedContacto.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">delete</span>
                  Eliminar
                </button>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-3 text-primary">Mensaje</h3>
                <p className="text-on-surface whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-300">
                  {selectedContacto.message}
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                <a
                  href={`mailto:${selectedContacto.email}`}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:opacity-90 transition flex items-center justify-center gap-2 font-medium"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Responder por Email
                </a>
                <a
                  href={`https://wa.me/?text=Hola%20${encodeURIComponent(selectedContacto.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:opacity-90 transition flex items-center justify-center gap-2 font-medium"
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl text-gray-300 block mb-4">mail</span>
              Selecciona un contacto para ver los detalles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactos;
