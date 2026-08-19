import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const openWhatsApp = () => {
        const number = import.meta.env.VITE_WHATSAPP_NUMBER || '56900000000';
        const message = encodeURIComponent('Hola, quisiera información sobre productos, horarios y atención en la farmacia.');
        window.open(`https://wa.me/${number}?text=${message}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="pt-24">
            <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[716px]">
                <div className="lg:col-span-6 flex flex-col gap-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md w-fit">
                        <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>health_and_safety</span>
                        Cuidado Cercano
                    </span>
                    <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-tight">
                        Tu farmacia de <span className="text-primary">confianza</span>
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                        Atención personalizada y soluciones de salud accesibles diseñadas para el bienestar de usted y su familia. Experimente un servicio de farmacia con un toque humano.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button onClick={() => navigate('/productos')} className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md flex items-center gap-2 hover:shadow-xl transition-shadow">
                            Ver productos
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                        <button onClick={openWhatsApp} className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-secondary-container transition-colors">
                            Contactar por WhatsApp
                        </button>
                    </div>
                </div>
                <div className="lg:col-span-6 relative h-full min-h-[400px]">
                    <div className="absolute inset-0 bg-secondary-container/30 rounded-[40px] -rotate-3"></div>
                    <img alt="Farmacéutica amable" className="relative z-10 w-full h-full object-cover rounded-[40px] shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGU7_WL6ML1qQOb6fv_mzwtqKF9q2xlkhc1IIHg85Ijk84ehN9C6XLoP36YbY8JZA0WjapzyAVFk_Ku0RplUX0lN-GtQQi68a0QMq_S07AnySMOxMFaFGdCpm_syqvtpfRtw3DGCtYqYSGSLDUasjyuw8k4uqcaAq2qmZTpmYSypwrKm_NDmpXG-Tkk5rK92048rTMRU9b4bv2fEThpfyYRKnN4RWRVlN_YW4VXrYw1OmPeskqgl9k4baUyZd035ui0QgHpqyb7o"/>
                    <div className="absolute bottom-0 left-0 sm:-bottom-8 sm:-left-8 glass-card p-6 rounded-2xl shadow-lg z-20 flex items-center gap-4 bg-white/70 backdrop-blur-md">
                        <div className="bg-primary text-on-primary p-3 rounded-full">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                        <div>
                            <p className="font-bold text-on-surface">100% Certificados</p>
                            <p className="text-on-surface-variant text-sm">Productos de calidad</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
                <div className="text-center mb-10">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Servicios destacados</h2>
                    <p className="text-on-surface-variant">Atención cercana, productos de confianza y apoyo farmacéutico en cada visita.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {[
                        {
                            title: 'Asesoría farmacéutica',
                            text: 'Recibe orientación personalizada para tus tratamientos, cuidados y consultas de salud.',
                            icon: 'medical_services'
                        },
                        {
                            title: 'Productos de calidad',
                            text: 'Contamos con opciones seleccionadas para el cuidado diario de tu familia.',
                            icon: 'shopping_bag'
                        },
                        {
                            title: 'Atención cercana',
                            text: 'Nuestro equipo está listo para ayudarte con una experiencia amable y cercana.',
                            icon: 'favorite'
                        }
                    ].map((service) => (
                        <div key={service.title} className="bg-surface-container-low rounded-[28px] p-8 shadow-sm border border-outline-variant/30 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-primary-container/30 text-primary flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{service.title}</h3>
                            <p className="text-on-surface-variant font-body-md">{service.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-surface-container-low py-section-gap mb-section-gap">
                <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-headline-md text-headline-md text-on-surface">¿Por qué elegirnos?</h2>
                        <p className="text-on-surface-variant">Estamos aquí para cuidarte en cada paso.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        {[
                            { icon: 'support_agent', title: 'Atención personalizada', color: 'bg-primary-container/20', iconColor: 'text-primary' },
                            { icon: 'payments', title: 'Precios accesibles', color: 'bg-secondary-container/30', iconColor: 'text-secondary' },
                            { icon: 'local_shipping', title: 'Delivery disponible', color: 'bg-tertiary-container/30', iconColor: 'text-tertiary' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col gap-4 group">
                                <div className={`${item.color} ${item.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h3>
                                <p className="text-on-surface-variant font-body-md text-body-md">Nuestro equipo farmacéutico te asesora de forma cercana y profesional en cada una de tus consultas.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;