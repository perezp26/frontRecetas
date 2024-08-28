import * as Yup from 'yup';

export const  validacionReceta  = () => (
    Yup.object().shape({
        diagnostico: Yup.string().required('campo obligatorio'),
        expediente: Yup.string().required('campo obligatorio'),
    })
)