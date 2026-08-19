import img from '../assets/2025-05-05.png'
const SobreNosotrosPage = () => {
    return (
        <div className="pt-24">
            <section className="relative px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
                    <div className="z-10">
                        <span className="inline-block px-4 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md mb-6">Nuestra Historia</span>
                        <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">Cuidado Cercano, Directo al Corazón de Ñuble.</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
                            Más que una farmacia, somos parte de tu familia. Desde San Carlos hasta Chillán, Farmacias Bonita nació con un propósito: humanizar la salud en nuestra región.
                        </p>
                    </div>
                    <div className="relative h-[420px] md:h-[500px] rounded-[40px] overflow-hidden soft-shadow">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD92GvftixHyFIKdSutDw39eb3XeYPoQG9CSXeRtzy7vSXw81TIiZnCHDWf0hbCT1qw8d85jhN0d7RYcORShdVq64mRUeASfw4s5yETtyH9927FCZ5EfLuMZcFstowtyruVOqGhNAGYUFyhITVXpck5C10-dI4xi7gVELX9iCZigaGQLXz2OfuOLW033E7lJhnKssZTGh8dOgcQ0keQiTm6SUDwiq7oo8OHtoO0eYdSGKfoRvgrKI3rlMqMQuJb3FcC1TiiGcSuYs4"/>
                    </div>
                </div>
            </section>
            
            <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:min-h-[600px]">
                    <div className="md:col-span-2 md:row-span-2 bg-surface-container rounded-[32px] p-10 flex flex-col justify-between border border-outline-variant/30">
                        <div>
                            <span className="material-symbols-outlined text-primary text-4xl mb-6">local_pharmacy</span>
                            <h3 className="font-headline-sm text-headline-sm text-primary mb-4">El Origen: San Carlos</h3>
                            <p className="font-body-md text-on-surface-variant">Fundada por farmacéuticos locales que veían la necesidad de un servicio que no solo vendiera medicamentos, sino que ofreciera orientación y empatía.</p>
                        </div>
                        <div className="mt-8 rounded-2xl overflow-hidden h-48">
                            <img className="w-full h-full object-cover" src={img}/>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white rounded-[32px] p-8 flex items-center gap-6 border border-outline-variant/30 soft-shadow">
                        <div className="bg-secondary-container w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary text-3xl">handshake</span>
                        </div>
                        <div>
                            <h4 className="font-headline-sm text-primary mb-2">Comunidad</h4>
                            <p className="font-body-md text-on-surface-variant">Apoyamos a juntas de vecinos y operativos de salud rurales.</p>
                        </div>
                    </div>
                    <div className="md:col-span-1 bg-primary text-on-primary rounded-[32px] p-8 flex flex-col justify-center text-center">
                        <p className="text-xl font-bold mb-2">Lunes a Viernes de 9:00apm a 12:00am</p>
                        <p className="font-label-md opacity-90">Sábados de 10:00apm a 12:00pm</p>
                        <p className="font-label-md opacity-90">Domingos de 4:00apm a 12:00pm</p>
                        <p className="font-label-md opacity-90">Atención telefónica.</p>
                    </div>
                    <div className="md:col-span-1 bg-surface-container-high rounded-[32px] p-8 flex flex-col justify-center items-center text-center gap-4">
                        <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                        <p className="font-label-md text-primary font-bold">Calidad Certificada</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SobreNosotrosPage;