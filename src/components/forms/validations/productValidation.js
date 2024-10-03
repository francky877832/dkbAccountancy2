import * as Yup from 'yup';

const productValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Le nom doit contenir au moins 3 caractères')
        .required('Le nom est requis'),

    description: Yup.string()
        .min(50, 'La description doit contenir au moins 50 caractères')
        .required('La description est requise'),

    price: Yup.number()
        .typeError('Le prix doit être un nombre')
        .positive('Le prix doit être supérieur à zéro')
        .required('Le prix est requis'),

    newPrice: Yup.number()
        .typeError('Le nouveau prix doit être un nombre')
        .positive('Le nouveau prix doit être supérieur à zéro')
        .required('Le nouveau prix est requis'),

    minPrice: Yup.number()
        .typeError('Le prix minimum doit être un nombre')
        .positive('Le prix minimum doit être supérieur à zéro')
        .required('Le prix minimum est requis'),

    maxPrice: Yup.number()
        .typeError('Le prix maximum doit être un nombre')
        .required('Le prix maximum est requis'),

    condition: Yup.string()
        .oneOf(['new', 'used', "new used"], 'La condition n\'est pas reconnu')
        .required('La condition est requise'),

    seller: Yup.string()
        .required('L\'identifiant du vendeur est requis'),

    category: Yup.string()
        .required('La catégorie est requise'),

    brand: Yup.string()
        .required('La marque est requise'),

    color: Yup.string()
        .required('La couleur est requise'),

    feesBy: Yup.string()
        .required('Le mode de frais est requis'),

    garanti: Yup.number()
        .typeError('La garanti doit être un nombre')
        .integer('La garanti doit être un entier')
        .required('La garanti est requis'),

    stock: Yup.number()
        .typeError('Le stock doit être un nombre')
        .integer('Le stock doit être un entier')
        .positive('Le stock doit être supérieur à zéro')
        .required('Le stock est requis'),

    kargoPrice: Yup.number()
        .typeError('Le prix de kargo doit être un nombre')
        .positive('Le prix de kargo doit être supérieur à zéro')
        .required('Le prix de kargo est requis'),

    images: Yup.array()
        .min(3, 'Vous devez sélectionner au moins 3 images')
        .max(6, 'Vous ne pouvez pas sélectionner plus de 6 images')
        .required('Vous devez ajouter des images'),

});

export default productValidationSchema;
