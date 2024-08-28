import { Formik } from "formik"
import 'animate.css'
import { validacionLogin } from "../validations/validationLogin";

import { FormularioLogin } from '../components/login/FormularioLogin'
import { useDispatch } from "react-redux";
import { authGetLogin } from "../store/slices/auth/thunks";


export const Login = () => {
  
  const dispatch = useDispatch();
  const loginSchema = validacionLogin();

  const handlesSubmit = ( values ) => {
    dispatch( authGetLogin({ rfc: values.usuario, cedulaProfesional: values.password }) )
}
  return (
    
    <div className=" w-full headerImg h-full animate__animated animate__fadeIn">
          <Formik 
              initialValues={{ usuario:'', password:'' }} 
              //validationSchema = { loginSchema }
              onSubmit={ ( values ) =>{ handlesSubmit( values ) } } 
          >
          {
              ({ errors, setFieldValue, values, touched }) => {
                return( 

                      <FormularioLogin errors={ errors } setFieldValue={ setFieldValue } values ={ values } touched={ touched } />
                ) 

              }
          }

          </Formik>

    </div>
  )
}
