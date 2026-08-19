import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import productPlaceholder from '../../assets/product-placeholder.svg';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image: productPlaceholder,
    featured: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.category || !formData.price) {
      setError('Completa los campos requeridos');
      return;
    }

    try {
      if (editingId) {
        const docRef = doc(db, 'productos', editingId);
        await updateDoc(docRef, formData);
        setSuccess('Producto actualizado exitosamente');
      } else {
        await addDoc(collection(db, 'productos'), formData);
        setSuccess('Producto agregado exitosamente');
      }

      setFormData({
        title: '',
        category: '',
        price: '',
        description: '',
        image: productPlaceholder,
        featured: false
      });
      setEditingId(null);
      setShowForm(false);
      loadProductos();
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleEdit = (producto) => {
    setFormData(producto);
    setEditingId(producto.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      await deleteDoc(doc(db, 'productos', id));
      setSuccess('Producto eliminado exitosamente');
      loadProductos();
    } catch (err) {
      setError('Error al eliminar: ' + err.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Gestión de Productos</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: '',
              category: '',
              price: '',
              description: '',
              image: productPlaceholder,
              featured: false
            });
          }}
          className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Nuevo Producto
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      {showForm && (
        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Nombre del producto"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Categoría"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Precio (ej: $12.990)"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="URL de imagen"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <textarea
              name="description"
              placeholder="Descripción del producto"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              rows="4"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Destacado</span>
            </label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map(producto => (
            <div key={producto.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <img
                src={producto.image}
                alt={producto.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg text-primary mb-2">{producto.title}</h3>
              <p className="text-sm text-on-surface-variant mb-2">{producto.category}</p>
              <p className="text-lg font-bold text-secondary mb-2">{producto.price}</p>
              <p className="text-sm mb-4 line-clamp-2">{producto.description}</p>
              {producto.featured && <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mb-4 inline-block">Destacado</span>}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(producto)}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:opacity-90 transition text-sm font-medium flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto.id)}
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

export default AdminProductos;
