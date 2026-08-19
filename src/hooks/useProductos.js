import { useState, useMemo } from 'react';
import { productos } from '../models/data';

// Controlador: Hook para manejar lógica de productos
const useProductos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todo');

    const filteredProducts = useMemo(() => {
        return productos.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todo' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const categories = ['Todo', 'Medicamentos', 'Cuidado Personal', 'Suplementos', 'Accesorios'];

    return {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        filteredProducts,
        categories
    };
};

export default useProductos;