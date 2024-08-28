import { Form } from 'formik';
import { useSelector } from 'react-redux';
import 'animate.css'

import { MyTextInput } from '../controlsForm'

import logoHrae from '../../imgs/logo_hraepy.png'
import { Spinner } from '../controlsForm/Spinner';

export const FormularioLogin = ({ errors, setFieldValue, values, touched }) => {

    const { loading } = useSelector( (state) => state.ui )

  return (
    <Form>
    
    <div className='grid place-items-center h-screen animate__animated animate__fadeIn '>

        <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 w-96 ">
            
            <img className='mx-auto' src={ logoHrae } alt="logoHrae" width={150} />

            <div className='mb-4 mt-7'>
                    <MyTextInput label="Usuario" name="usuario" type="text" placeholder="Rfc" textCenter={ true } />
            </div>    
            <div className='mb-4 mt-7'>
                    <MyTextInput label="Cédula Profesional" name="password" type="password" placeholder="*****" textCenter= { true } />
            </div>    
            
            <hr/>
            <div className='mb-4 mt-7'>
                {
                    !loading ? 
                    
                    <button type="submit" className=" transition duration-300  bg-slate-500 text-white hover:bg-slate-600 w-full py-2 
                                                    focus:border-rose-300 focus:outline-0 focus:shadow focus:shadow-slate-600 focus:bg-slate-600
                                                     hover:outline-0 hover:border-slate-600" > 
                    Ingresar 
                    </button>
                    :
                    <Spinner />
                }
                
            </div>
        </div>

    </div>
    </Form>
  )
}
