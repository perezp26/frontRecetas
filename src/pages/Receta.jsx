
import { TitleModulos } from '../components/controlsForm/TitleModulos'
import { UseForm } from '../hooks/UseForm'
import { curpValida } from '../helpers/validaCurp'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BuscaPaciente } from '../components/Receta/BuscaPaciente'
import { pacienteGetDataPacienteSaihweb } from '../store/slices/paciente/thunks'
import { useEffect } from 'react'
import { TableRecetas } from '../components/Receta/TableRecetas'
import { recetaSetIniDetalle, recetaSetRecetasPacientes } from '../store/slices/receta/recetaSlice'
import { recetaGetRecetasPacietne } from '../store/slices/receta/thunks'
import { FeedTwoTone } from '@mui/icons-material'

export const Receta = () => {

const dispatch = useDispatch()
const { loading } = useSelector( state => state.ui )
const { dataPaciente } = useSelector( state => state.paciente )
const {  curp } = dataPaciente

const navigate = useNavigate()

const [formValues, handleInputChange, reset] = UseForm({
    buscaCurp: '',
    curp: dataPaciente?.curp ?? '',
    nombrePaciente : dataPaciente?.nombrePaciente ?? '',
    fechaNacimiento: dataPaciente?.fechaNacimiento ?? '',
    expediente: dataPaciente?.expediente ?? ''
    })
const { buscaCurp } = formValues

useEffect(() => {

    const _buscaCurp = buscaCurp;
    reset( {...dataPaciente, buscaCurp: _buscaCurp } );
    
    dispatch( recetaSetIniDetalle() );

    dataPaciente.idPaciente !== 0 ? dispatch( recetaGetRecetasPacietne( dataPaciente.idPaciente ) ) : dispatch(recetaSetRecetasPacientes([]));

}, [dataPaciente])


const handlesConsultaCurp = async() => {

    const isValidCurp = curpValida( buscaCurp );

    if( isValidCurp ){
        dispatch( pacienteGetDataPacienteSaihweb( buscaCurp ) )
    }
    else{
        Swal.fire('Error','Curp Invalida','error');
    }
}

const handlesCapturaReceta = () => {
    navigate( `frmreceta` );
}

  return (
    <div className='m-5'>
        <TitleModulos texto={ "Recetas del paciente" } />

        <BuscaPaciente formValues={ formValues } handleInputChange={ handleInputChange } handlesConsultaCurp = { handlesConsultaCurp }/>
        <hr/>

        <div className=' flex justify-between mt-5'>
            <label className=' font-light text-2xl '>Historial de Recetas </label> 
            {
                curp !== '' && !loading &&
                            <button type='button' 
                                    className='ml-5 mb-2 bg-cyan-600 text-white rounded-md p-2 transition duration-200 hover:bg-cyan-700 hover:shadow hover:shadow-slate-400 
                                                        hover:scale-103 active:tranform active:scale-90 active:bg-cyan-600 w-40 '
                                    onClick={ handlesCapturaReceta }
                            > 
                             <FeedTwoTone fontSize='medium' />        Nueva Receta 
                            </button>
            }
        </div>

        <div>
            <TableRecetas />
        </div>
    </div>
  )
}
