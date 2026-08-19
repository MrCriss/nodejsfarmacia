import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import HomePage from './components/HomePage';
import ProductosPage from './components/ProductosPage';
import ServiciosPage from './components/ServiciosPage';
import SobreNosotrosPage from './components/SobreNosotrosPage';
import ContactoPage from './components/ContactoPage';
import InformacionPage from './components/InformacionPage';
import LoginPage from './components/admin/LoginPage';
import AdminSetup from './components/admin/AdminSetup';
import AdminDashboard from './components/admin/AdminDashboard';

const terminosItems = [
  {
    title: 'Uso de la web',
    text: 'Al utilizar esta web, aceptas mantener un uso responsable, respetuoso y legal de los contenidos y servicios ofrecidos.'
  },
  {
    title: 'Propiedad intelectual',
    text: 'Todo el contenido publicado en la web es propiedad de Farmacias Bonita o de sus proveedores autorizados.'
  }
];

const privacidadItems = [
  {
    title: 'Información que recopilamos',
    text: 'Podemos recopilar datos de contacto y preferencias cuando utilizas nuestros formularios o servicios.'
  },
  {
    title: 'Uso de tus datos',
    text: 'Tus datos se utilizan para responder consultas, gestionar solicitudes y mejorar la experiencia de atención.'
  }
];

const faqItems = [
  {
    title: '¿Atención en línea?',
    text: 'Sí, puedes comunicarte con nosotros mediante WhatsApp o por nuestro formulario de contacto.'
  },
  {
    title: '¿Ofrecen delivery?',
    text: 'Contamos con información y servicios orientados a la atención cercana; consulta directamente con nuestro equipo.'
  }
];

const trabajoItems = [
  {
    title: 'Únete a nuestro equipo',
    text: 'Estamos siempre abiertos a recibir postulaciones de personas comprometidas con el cuidado y la atención.'
  },
  {
    title: 'Cómo postular',
    text: 'Puedes escribirnos a través del formulario de contacto o comunicarte con nuestra sucursal para recibir orientación.'
  }
];

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
      <AppContent showScrollTop={showScrollTop} />
    </AuthProvider>
  );
}

function AppContent({ showScrollTop }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <div className="animate-spin">
          <span className="material-symbols-outlined text-primary text-5xl">hourglass_empty</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-surface text-on-surface font-body-md overflow-x-hidden">
        {!user && <Nav />}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/terminos" element={<InformacionPage title="Términos de Uso" description="Conoce las condiciones generales de uso de nuestra web y servicios." items={terminosItems} />} />
          <Route path="/privacidad" element={<InformacionPage title="Política de Privacidad" description="Información sobre el tratamiento de tus datos y tus derechos como usuario." items={privacidadItems} />} />
          <Route path="/preguntas-frecuentes" element={<InformacionPage title="Preguntas Frecuentes" description="Respuestas rápidas a las dudas más comunes de nuestros usuarios." items={faqItems} />} />
          <Route path="/trabaja-con-nosotros" element={<InformacionPage title="Trabaja con Nosotros" description="Información para quienes desean formar parte de nuestro equipo." items={trabajoItems} />} />

          {/* Rutas de autenticación */}
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/login" element={user ? <Navigate to="/admin" /> : <LoginPage />} />

          {/* Rutas protegidas de admin */}
          <Route path="/admin/*" element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {!user && <Footer />}
        {!user && <WhatsAppFloating />}
        {!user && showScrollTop ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-transform hover:scale-105"
            aria-label="Volver arriba"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        ) : null}
      </div>
    </Router>
  );
}

export default App;
