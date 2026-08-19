import { servicios } from '../models/data';

const ServiciosPage = () => {
    return (
        <div className="pt-24">
            <header className="pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md mb-6">Expertos en Salud</span>
                    <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">Servicios de Salud Pensados para Ti</h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg">
                        Combinamos la precisión clínica con la calidez del cuidado cercano para brindarte una experiencia integral en farmacia.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-[16px] hover:translate-y-[-2px] transition-all">
                            Ver Todos los Servicios
                        </button>
                        <button className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-label-md text-[16px] hover:bg-secondary/5 transition-all">
                            Agendar Cita
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-primary-container/20 rounded-[40px] rotate-3 -z-10"></div>
                    <img alt="Personal de farmacia profesional" className="rounded-[40px] w-full object-cover h-[500px] soft-card-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsPmOFY4rCoEH4bfJ_zFj4c3NgMUm3qQEarCG4q5RthKvMuMHmj-KhewUg5IxkTUauWxXW-2wYFpGx45_uV4t9p9lkn1srTQE_lJUzZxw2f1huc09i4dkcA0rXmXtrDTK9Kmvuk7GqVShDIyhqadvDiWRF198g76gIZ0u39NzUFvf1TpOtaeLMJ3bI7ud7LTh5SrXM5pWnI5MQq-Gsjzh9sqlJLPqMLbXS65eoSzraIxJVWNfPPExRNIFOXcgLMvBQwJWNfbnBNVw"/>
                </div>
            </header>

            <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                    {servicios.map((servicio) => (
                        <div key={servicio.id} className={`bg-surface-container-lowest p-8 rounded-[32px] border border-outline-variant/30 soft-card-shadow group hover:border-primary/30 transition-all flex flex-col ${servicio.id === 1 ? 'md:col-span-8 md:flex-row gap-8' : 'md:col-span-4 justify-between'}`}>
                            {servicio.id === 1 && (
                                <div className="flex-1">
                                    <div className="w-16 h-16 bg-primary-container/30 text-primary rounded-2xl flex items-center justify-center mb-6">
                                        <span className="material-symbols-outlined text-[32px]">{servicio.icon}</span>
                                    </div>
                                    <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{servicio.title}</h3>
                                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                        {servicio.description}
                                    </p>
                                    <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Saber más <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            )}
                            {servicio.id === 1 && (
                                <div className="flex-1 min-h-[250px]">
                                    <img alt={servicio.title} className="w-full h-full object-cover rounded-2xl" src={servicio.image}/>
                                </div>
                            )}
                            {servicio.id === 2 && (
                                <div>
                                    <div className="w-16 h-16 bg-white text-secondary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                        <span className="material-symbols-outlined text-[32px]">{servicio.icon}</span>
                                    </div>
                                    <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{servicio.title}</h3>
                                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">{servicio.description}</p>
                                </div>
                            )}
                            {servicio.id === 2 && (
                                <div className="bg-white/60 backdrop-blur p-4 rounded-2xl border border-white/40">
                                    <p className="font-label-md text-primary mb-1">Tiempo promedio</p>
                                    <p className="font-headline-sm text-primary font-bold">{servicio.tiempo}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ServiciosPage;