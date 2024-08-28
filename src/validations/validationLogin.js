import * as Yup from 'yup';

export const  validacionLogin  = () => (
    Yup.object().shape({
        idSucursal: Yup.object().shape({ value: Yup.string().required('Debe seleccionar una sucursal') }),
        usuario: Yup.string().required('campo obligatorio'),
        password: Yup.string().required('campo obligatorio'),
    })
)