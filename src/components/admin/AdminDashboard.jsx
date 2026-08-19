import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminProductos from './AdminProductos';
import AdminServicios from './AdminServicios';
import AdminContactos from './AdminContactos';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const menuItems = [
    { path: '/admin/productos', label: 'Productos', icon: 'inventory_2' },
    { path: '/admin/servicios', label: 'Servicios', icon: 'wellness_center' },
    { path: '/admin/contactos', label: 'Contactos', icon: 'mail' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary text-on-primary transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Farmacia Admin</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary-container rounded-lg transition"
          >
            <span className="material-symbols-outlined">{sidebarOpen ? 'menu_open' : 'menu'}</span>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-on-primary/20'
                  : 'hover:bg-on-primary/10'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="border-t border-on-primary/20 p-4 space-y-4">
          {sidebarOpen && (
            <div className="text-xs bg-on-primary/10 rounded p-2">
              <p className="font-semibold">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-on-primary/20 hover:bg-on-primary/30 transition text-sm font-medium"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/productos" element={<AdminProductos />} />
          <Route path="/servicios" element={<AdminServicios />} />
          <Route path="/contactos" element={<AdminContactos />} />
          <Route path="/" element={
            <div className="p-8">
              <h1 className="text-4xl font-bold text-primary mb-4">Bienvenido al Panel Admin</h1>
              <p className="text-on-surface-variant mb-8">Selecciona una opción del menú para comenzar.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-left"
                  >
                    <span className="material-symbols-outlined text-4xl text-primary mb-2 block">{item.icon}</span>
                    <h2 className="text-xl font-bold text-primary">{item.label}</h2>
                    <p className="text-on-surface-variant text-sm mt-2">Gestiona {item.label.toLowerCase()}</p>
                  </button>
                ))}
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
