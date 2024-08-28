import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik'
import { format } from 'date-fns-tz';
import { FormDataReceta } from './FormDataReceta'
import logoImss from '../../imgs/logo_imssBienestar.png'
import logo_hraepy from '../../imgs/hraepyLogo.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { recetaSetInvalidDetalleReceta } from '../../store/slices/receta/recetaSlice';
import { pdfReceta } from './pdfReceta';
import { validacionReceta } from '../../validations/validationReceta';
import { recetaAddNewReceta } from '../../store/slices/receta/thunks';
import { useEffect } from 'react';
import { uiSetFilterProductos } from '../../store/slices/ui/uiSlice';
export const FormReceta = () => {

  const navigate = useNavigate();
  const { recetaDetalles } = useSelector( state => state.receta );
  const { dataPaciente } = useSelector( state => state.paciente );
  const { login } = useSelector( state => state.auth)
  const { idMedico, nombreMedico, cedulaProfesional, universidad } = login
  const { idPaciente, nombrePaciente, fechaNacimiento, curp, expediente, isSaihweb, idSaihweb } = dataPaciente

  const dispatch = useDispatch();
  const validacion = validacionReceta();

  useEffect(() => {
      dispatch( uiSetFilterProductos(1) );
  }, [])
  

  const handlesSubmit = (values) => {

            let isValidDetalleReceta = true
            isValidDetalleReceta = !recetaDetalles.length < 1 ;
            
            const dataArray =   recetaDetalles.map( d =>  {
                  if ( d.noEnvases    === 0  || d.noEnvases.trim() === '' || isNaN(Number(d.noEnvases)) || d.tiposDispensacion.idTipoDispensacion === '0' ||
                       d.producto  === '' || d.dosis.trim() === '' || d.viaAdmin.trim() === '' || d.duracion.trim() === '' )
                      {
                        isValidDetalleReceta = false
                        return( { ...d, valid : false } );
                      }else {
                        return( { ...d, valid : true } );
                      }
                  }    
            );
             //console.log( { ...values, idPaciente, idMedico, idSaihweb, recetaDetalles : dataArray } );
            //pdfReceta({ ...values, folio: 'x', recetaDetalles : dataArray });
        
             if (isValidDetalleReceta) { 
                      Swal.fire({
                        title: "Seguro que desea generar la receta?",
                        text: "Una vez generada no se podrá modificar",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si",
                        cancelButtonText: "No"
                      }).then((result) => {
                        if (result.isConfirmed) {
                            generaReceta( { ...values, idPaciente, idMedico, idSaihweb, recetaDetalles : dataArray }  )
                        }
                      });
              }else{
                  dispatch(recetaSetInvalidDetalleReceta( dataArray ));
              }
  }

  const generaReceta = async( values ) => {

      const { ok, dataReceta } = await dispatch( recetaAddNewReceta( {...values } ) );

        //try {
          ok && pdfReceta({ ...values, folio : dataReceta.folio  });
          ok && navigate('../../receta');
        // } catch (error) {
        //   ok && navigate('../../receta');          
        // }

  }

  return (
    <Formik
    initialValues={{
        idTipoReceta : 1,
        fechaReceta : format(new Date(),"yyyy-MM-dd").toString(),
        nombreMedico : nombreMedico,
        cedulaProfesional: cedulaProfesional ,
        universidad: universidad,
        nombrePaciente: nombrePaciente,
        fechaNacimiento: fechaNacimiento,
        curp: curp,
        expediente: expediente,
        diagnostico:'',
        isSaihweb : isSaihweb,
    }}
    validationSchema={ validacion }
    onSubmit={ (values) => handlesSubmit( values ) }
    > 

    {
        ({ errors, setFieldValue, values, touched }) => {
          return( 
                <div className='m-5'>
                  <div className='flex'>
                      <div className='w-3/12'>
                              <img className=" mt-5" src={ logoImss } alt="logo" width={250} />
                      </div>
                      <div className='w-6/12 text-center'>
                              <p className=' font-semibold text-xl '>Receta Médica</p>
                              <p className=' font-semibold text-base '>HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DE LA PENÍNSULA DE YUCATÁN</p>
                              <p className=' text-base '>Calle 7 No. 433 por 20 y 22 Fracc. Altabrisa C.P. 97130</p>
                              <p className=' text-base '>Mérida Yucatán tel. (999) 942 7600</p>
                      </div>
                      <div className='grid w-3/12 justify-items-end'>
                              <div className='flex'>
                                  <img className="" src={ logo_hraepy } alt="logo" width={270} />
                              </div>
                      </div>
                  </div>
                  <hr />
                  <FormDataReceta errors={ errors } setFieldValue={ setFieldValue } values ={ values } touched={ touched }  />
                </div>
          ) 

        }
      }
    </Formik>
  )
}
