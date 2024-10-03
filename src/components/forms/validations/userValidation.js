import * as Yup from 'yup';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userValidationSchema = Yup.object().shape({
    email: Yup.string()
    .matches(emailRegex, 'L\'adresse email n\'est pas valide')
    .required('L\'adresse email est requise'),

  password: Yup.string()
    .min(7, 'Le mot de passe doit contenir au moins 7 caractères') 
    .required('Le mot de passe est requis'),

  username: Yup.string()
    .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
    .required('Le nom d\'utilisateur est requis'),

});

export default userValidationSchema;
