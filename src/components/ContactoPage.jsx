import { useState } from 'react';

const pharmacyEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contacto@farmaciabonita.cl';
const MAX_NAME_LENGTH = 60;
const MAX_EMAIL_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_MS = 15000;
const STORAGE_KEY = 'farmacia-contact-last-submit';

const sanitizeValue = (value) => value.replace(/[<>{}]/g, '').trim();

const ContactoPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ text: '', type: 'info' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = sanitizeValue(formData.name);
        const email = sanitizeValue(formData.email);
        const message = sanitizeValue(formData.message);

        if (!name || !email || !message) {
            setStatus({ text: 'Completa tu nombre, correo y mensaje para continuar.', type: 'error' });
            return;
        }

        if (name.length > MAX_NAME_LENGTH) {
            setStatus({ text: 'El nombre es demasiado largo.', type: 'error' });
            return;
        }

        if (email.length > MAX_EMAIL_LENGTH) {
            setStatus({ text: 'El correo es demasiado largo.', type: 'error' });
            return;
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            setStatus({ text: 'El mensaje es demasiado largo. Reduce el texto.', type: 'error' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setStatus({ text: 'Ingresa un correo electrónico válido.', type: 'error' });
            return;
        }

        try {
            const lastSubmit = Number(window.localStorage.getItem(STORAGE_KEY) || '0');
            const now = Date.now();

            if (now - lastSubmit < RATE_LIMIT_MS) {
                setStatus({ text: 'Espera unos segundos antes de enviar otra consulta.', type: 'error' });
                return;
            }

            window.localStorage.setItem(STORAGE_KEY, String(now));
        } catch (error) {
            console.warn('No se pudo guardar el límite de envío:', error);
        }

        const subject = encodeURIComponent(`Consulta desde la web - ${name}`);
        const body = encodeURIComponent(
            `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
        );

        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(pharmacyEmail)}&su=${subject}&body=${body}`,
            '_blank',
            'noopener,noreferrer'
        );

        setStatus({ text: 'Se abrió Gmail con tu mensaje preparado. Solo debes enviarlo desde allí.', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main className="pt-24 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <header className="mb-16 text-center md:text-left">
                <h1 className="font-display-lg text-display-lg text-primary mb-4">Cuidado Cercano para tu Bienestar</h1>
                <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">Estamos aquí para escucharte. Nuestro equipo en Ñuble está listo para ayudarte.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/30">
                    <h2 className="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined">mail</span>
                        Envíanos un mensaje
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface-variant ml-2">Nombre Completo</label>
                                <input
                                    autoComplete="name"
                                    className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary-fixed-dim transition-all font-body-md"
                                    maxLength={MAX_NAME_LENGTH}
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Pérez"
                                    type="text"
                                    value={formData.name}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface-variant ml-2">Correo Electrónico</label>
                                <input
                                    autoComplete="email"
                                    className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary-fixed-dim transition-all font-body-md"
                                    maxLength={MAX_EMAIL_LENGTH}
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="juan@ejemplo.cl"
                                    type="email"
                                    value={formData.email}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface-variant ml-2">Mensaje</label>
                            <textarea
                                className="w-full min-h-32 bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary-fixed-dim transition-all font-body-md"
                                maxLength={MAX_MESSAGE_LENGTH}
                                name="message"
                                onChange={handleChange}
                                placeholder="Escribe tu consulta breve..."
                                value={formData.message}
                            />
                        </div>
                        {status.text ? (
                            <p className={`text-sm font-medium ${status.type === 'error' ? 'text-red-600' : 'text-primary'}`}>
                                {status.text}
                            </p>
                        ) : null}
                        <button className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 rounded-full font-headline-sm text-headline-sm hover:opacity-90 active:scale-95 transition-all shadow-md" type="submit">
                            Enviar Consulta
                        </button>
                    </form>
                </section>
                <aside className="lg:col-span-5 flex flex-col gap-gutter">
                    <div className="bg-primary-container/10 border border-primary-container/30 rounded-xl p-8">
                        <h2 className="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined">schedule</span>
                            Horarios
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                                <span className="font-label-md text-on-surface">Lunes a Viernes</span>
                                <span className="font-body-md text-primary font-bold">09:00 - 21:00</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default ContactoPage;