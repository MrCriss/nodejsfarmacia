// Modelo: Datos de la aplicación
import productPlaceholder from '../assets/product-placeholder.svg';

export const productos = [
    {
        id: 1,
        title: 'Kit de Bienestar Familiar',
        category: 'Destacado',
        price: '$24.990',
        description: 'Una selección esencial de medicamentos básicos y elementos de primer auxilio para el hogar, garantizando la seguridad de los tuyos.',
        image: productPlaceholder,
        featured: true
    },
    {
        id: 2,
        title: 'Crema Hidratante Bio-Care',
        category: 'Cuidado Personal',
        price: '$12.500',
        description: 'Crema hidratante de alto desempeño con ingredientes naturales para mantener tu piel suave y protegida.',
        image: productPlaceholder
    },
    {
        id: 3,
        title: 'Complejo Vitamínico B12',
        category: 'Suplementos',
        price: '$8.990',
        description: 'Suplemento de vitamina B12 de alta biodisponibilidad para mejorar energía y bienestar general.',
        image: productPlaceholder
    },
    {
        id: 4,
        title: 'Analgésico Forte 500mg',
        category: 'Medicamentos',
        price: '$4.200',
        description: 'Analgésico efectivo para aliviar dolores moderados y malestares cotidianos de forma rápida.',
        image: productPlaceholder
    },
    {
        id: 5,
        title: 'Termómetro Digital',
        category: 'Accesorios',
        price: '$15.400',
        description: 'Termómetro digital con lectura rápida y precisa, ideal para el cuidado de toda la familia.',
        image: productPlaceholder
    }
];

export const servicios = [
    {
        id: 1,
        title: 'Consulta Farmacéutica',
        description: 'Accede a asesoría personalizada con nuestros expertos colegiados. Resolvemos tus dudas sobre síntomas menores, interpretación de recetas y bienestar general.',
        icon: 'clinical_notes',
        image: productPlaceholder
    },
    {
        id: 2,
        title: 'Despacho a Domicilio',
        description: 'Recibe tus medicamentos en la puerta de tu hogar. Envíos rápidos y seguros.',
        icon: 'local_shipping',
        tiempo: '60 - 90 Minutos'
    }
];