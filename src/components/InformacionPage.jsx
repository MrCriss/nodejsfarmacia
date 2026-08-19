import { Link } from 'react-router-dom';

const InformacionPage = ({ title, description, items }) => {
    return (
        <main className="pt-24 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="max-w-3xl mx-auto">
                <header className="mb-10">
                    <h1 className="font-display-lg text-display-lg text-primary mb-4">{title}</h1>
                    <p className="text-on-surface-variant font-body-lg text-body-lg">{description}</p>
                </header>

                <section className="bg-surface-container-low rounded-2xl p-8 shadow-sm border border-outline-variant/30">
                    <ul className="space-y-6">
                        {items.map((item, index) => (
                            <li key={`${item.title}-${index}`} className="border-b border-outline-variant/20 pb-5 last:border-b-0 last:pb-0">
                                <h2 className="font-headline-sm text-headline-sm text-primary mb-2">{item.title}</h2>
                                <p className="text-on-surface-variant font-body-md">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-on-primary font-label-md hover:opacity-90 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default InformacionPage;
