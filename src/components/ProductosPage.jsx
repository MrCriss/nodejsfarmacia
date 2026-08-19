import useProductos from '../hooks/useProductos';

const ProductosPage = () => {
    const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredProducts, categories } = useProductos();

    return (
        <div className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <section className="mb-12">
                <h1 className="font-display-lg text-display-lg text-primary mb-4">Nuestro Catálogo</h1>
                <p className="text-on-surface-variant max-w-2xl font-body-lg">Explora nuestra selección de productos farmacéuticos y de cuidado personal. Brindamos cuidado cercano con la calidad que tu salud merece.</p>
            </section>
            
            <section className="mb-gutter flex flex-col md:flex-row gap-gutter items-start md:items-center justify-between">
                <div className="relative w-full md:max-w-md">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input 
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-secondary-fixed-dim shadow-sm font-body-md text-on-surface" 
                        placeholder="Buscar medicamentos o productos..." 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            className={`px-6 py-2 rounded-full font-label-md whitespace-nowrap shadow-md transition-colors ${
                                selectedCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {filteredProducts.map((product) => (
                    <div key={product.id} className={`group bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all duration-500 flex flex-col h-full ${product.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                        <div className="relative rounded-lg overflow-hidden mb-6 aspect-video bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={product.image}/>
                            {product.featured && <span className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-md">Destacado</span>}
                        </div>
                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-headline-sm text-headline-sm text-primary">{product.title}</h3>
                                <span className="font-bold text-headline-sm text-secondary">{product.price}</span>
                            </div>
                            <p className="text-on-surface-variant mb-6 font-body-md line-clamp-2">{product.description || 'Producto de calidad para tu bienestar.'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosPage;