import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Nav = () => {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);

    const openWhatsApp = () => {
        const number = import.meta.env.VITE_WHATSAPP_NUMBER || '56900000000';
        const message = encodeURIComponent('Hola, quisiera información sobre productos y horarios.');
        window.open(`https://wa.me/${number}?text=${message}`, '_blank', 'noopener,noreferrer');
    };
    const isActive = (path) => location.pathname === path;
    const linkClass = (path) => `font-body-md text-body-md transition-all duration-300 ${
        isActive(path) 
        ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary dark:border-primary-fixed-dim pb-1" 
        : "text-on-surface-variant dark:text-surface-variant font-medium hover:text-primary"
    }`;

    return (
        <nav className="fixed top-0 z-50 w-full bg-surface/90 dark:bg-on-background/90 backdrop-blur-md shadow-sm border-b border-outline-variant/20">
            <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
                <Link to="/" className="flex items-center gap-3">
                    <img alt="Farmacias Bonita Logo" className="h-12 w-auto object-contain rounded-2xl" src={logo} />
                </Link>

                <button
                    className="md:hidden inline-flex items-center justify-center rounded-full border border-outline-variant/30 bg-white/90 p-3 text-primary shadow-sm"
                    onClick={() => setOpenMenu((value) => !value)}
                    aria-expanded={openMenu}
                    aria-label="Abrir menú"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>

                <div className="hidden md:flex items-center gap-8">
                    <Link className={linkClass('/')} to="/">Inicio</Link>
                    <Link className={linkClass('/productos')} to="/productos">Productos</Link>
                    <Link className={linkClass('/servicios')} to="/servicios">Servicios</Link>
                    <Link className={linkClass('/sobre-nosotros')} to="/sobre-nosotros">Sobre Nosotros</Link>
                    <Link className={linkClass('/contacto')} to="/contacto">Contacto</Link>
                </div>
                <button type="button" onClick={openWhatsApp} className="hidden md:inline-flex bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md active:scale-95 transition-transform duration-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    WhatsApp
                </button>
            </div>

            {openMenu && (
                <div className="md:hidden px-margin-mobile py-4 bg-surface/95 border-t border-outline-variant/20 backdrop-blur-lg shadow-xl">
                    <div className="flex flex-col gap-3">
                        <Link onClick={() => setOpenMenu(false)} className={linkClass('/')} to="/">Inicio</Link>
                        <Link onClick={() => setOpenMenu(false)} className={linkClass('/productos')} to="/productos">Productos</Link>
                        <Link onClick={() => setOpenMenu(false)} className={linkClass('/servicios')} to="/servicios">Servicios</Link>
                        <Link onClick={() => setOpenMenu(false)} className={linkClass('/sobre-nosotros')} to="/sobre-nosotros">Sobre Nosotros</Link>
                        <Link onClick={() => setOpenMenu(false)} className={linkClass('/contacto')} to="/contacto">Contacto</Link>
                        <button type="button" onClick={() => { openWhatsApp(); setOpenMenu(false); }} className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-on-primary px-4 py-3 font-label-md">
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;