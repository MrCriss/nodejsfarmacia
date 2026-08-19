import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'medical_services',
    tiempo: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadServicios();
  }, []);

  const loadServicios = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'servicios'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServicios(data);
    } catch (err) {
      setError('Error al cargar servicios: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description) {
      setError('Completa los campos requeridos');
      return;
    }

    try {
      if (editingId) {
        const docRef = doc(db, 'servicios', editingId);
        await updateDoc(docRef, formData);
        setSuccess('Servicio actualizado exitosamente');
      } else {
        await addDoc(collection(db, 'servicios'), formData);
        setSuccess('Servicio agregado exitosamente');
      }

      setFormData({
        title: '',
        description: '',
        icon: 'medical_services',
        tiempo: ''
      });
      setEditingId(null);
      setShowForm(false);
      loadServicios();
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleEdit = (servicio) => {
    setFormData(servicio);
    setEditingId(servicio.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    try {
      await deleteDoc(doc(db, 'servicios', id));
      setSuccess('Servicio eliminado exitosamente');
      loadServicios();
    } catch (err) {
      setError('Error al eliminar: ' + err.message);
    }
  };

  const iconOptions = [
    'medical_services',
    'clinical_notes',
    'local_shipping',
    'assignment_ind',
    'schedule',
    'pharmacy_2'
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Gestión de Servicios</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              icon: 'medical_services',
              tiempo: ''
            });
          }}
          className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Nuevo Servicio
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      {showForm && (
        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Nombre del servicio"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Descripción del servicio"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              rows="4"
              required
            />
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <input
              type="text"
              name="tiempo"
              placeholder="Tiempo (ej: 60 - 90 Minutos)"
              value={formData.tiempo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map(servicio => (
            <div key={servicio.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <span className="material-symbols-outlined text-4xl text-primary">{servicio.icon}</span>
                {servicio.tiempo && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">{servicio.tiempo}</span>}
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">{servicio.title}</h3>
              <p className="text-on-surface-variant mb-4">{servicio.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(servicio)}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:opacity-90 transition text-sm font-medium flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(servicio.id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:opacity-90 transition text-sm font-medium flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServicios;
