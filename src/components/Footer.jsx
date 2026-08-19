import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const footerLinks = [
    {
        to: '/terminos',
        label: 'Términos de Uso'
    },
    {
        to: '/privacidad',
        label: 'Política de Privacidad'
    },
    {
        to: '/preguntas-frecuentes',
        label: 'Preguntas Frecuentes'
    },
    {
        to: '/trabaja-con-nosotros',
        label: 'Trabaja con Nosotros'
    }
];

const Footer = () => (
    <footer className="full-width bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant/30 dark:border-outline/20">
        <div className="w-full px-margin-mobile md:px-margin-desktop py-12 flex flex-col md:flex-row justify-between items-center gap-gutter max-w-container-max mx-auto">
            <div className="flex flex-col gap-2 text-center md:text-left">
                <div className="h-10 w-32 rounded-2xl overflow-hidden mb-2 mx-auto md:mx-0 border border-outline-variant/30 bg-white/80 shadow-sm">
                    <img alt="Farmacias Bonita Logo" className="h-full w-full object-contain p-1" src={logo} />
                </div>
                <p className="text-on-surface-variant font-body-md">© 2024 Farmacias Bonita. Cuidado Cercano para tu bienestar.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {footerLinks.map((link) => (
                    <Link
                        key={link.to}
                        className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary underline transition-all"
                        to={link.to}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    </footer>
);

export default Footer;