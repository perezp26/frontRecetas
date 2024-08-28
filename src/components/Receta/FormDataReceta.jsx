import { Form } from 'formik'
import React from 'react'
import { MyTextInput } from '../controlsForm';
import { TablaMedicamentos } from './TablaMedicamentos';
import { useDispatch, useSelector } from 'react-redux';
import { recetaAddNewRowDetalle, recetaSetIniDetalle } from '../../store/slices/receta/recetaSlice';
import { generarId } from '../../helpers/generaId';
import { useNavigate } from 'react-router-dom';
import { uiSetFilterProductos } from '../../store/slices/ui/uiSlice';
import { SaveTwoTone, UndoTwoTone } from '@mui/icons-material';

export const FormDataReceta = ({ errors, setFieldValue, values, touched, redirectPanel }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { tiposReceta } = useSelector( state=> state.ui )
    const handlesaddNewRow = () => {
        const idRow = generarId() 
        dispatch( recetaAddNewRowDetalle( generarId() ) )
    }

  const handlesReturn = (  ) => {
    navigate( '../../receta' );
}

  const handlesChangeTipoMedicamento = (e) => {

    dispatch( recetaSetIniDetalle() );
    setFieldValue('idTipoReceta', e.value);
    dispatch( uiSetFilterProductos( e.value ) );
    
  }

  return (
    <Form>

        <div className='flex mt-5'>
            <div className='flex p-2 text-center bg-gray-400 w-2/3'> 
                <div className=' w-1/3 '>
                        <select className='w-full border border-gray-300 rounded shadow p-0.5 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                name='aplicaIva' defaultValue={ values.idTipoReceta } onChange={ (e) => { handlesChangeTipoMedicamento( e.target ) }}  >
                                { 
                                    tiposReceta.map( x => ( 
                                        <option key={ x.idTipoReceta } value={ x.idTipoReceta }> { x.descripcion }</option>
                                    )  ) 
                                }
                        </select>
                </div>
                <div className=' w-1/3 '>Datos del médico</div>
                <div className=' w-1/3 '></div>
            </div>
            <div className=' flex w-1/3'>
                <p className='ml-10 mr-5 pt-2'>Fecha: </p> <MyTextInput disabled={ true } name="fechaReceta" type="text" placeholder=" - -" error = {errors.fechaReceta} textCenter={ true } />
            </div>
        </div>

        <div className='flex mt-5'>
                 <p className='mt-2 mr-2 w-40'>Nombre Completo:</p>
                 <MyTextInput name="nombreMedico" type="text" placeholder="Nombre Completo del Médico" error = {errors.nombreMedico} disabled={ true } />
        </div>

        <div className='flex mt-5'>
                <div className='flex w-1/2'>
                    <p className='mt-2 w-48'>Cédula Profesional:</p>
                    <MyTextInput name="cedulaProfesional" type="text" placeholder="Cédula Profesional" error = {errors.cedulaProfesional} disabled={ true } />
                </div>
                <div className='flex w-1/2 text-center'>
                    <p className='mt-2 w-48'>Universidad:</p>
                    <MyTextInput name="universidad" type="text" placeholder="universidad" error = {errors.universidad} disabled={ true } />
                </div>
        </div>
        <div className=' p-2 text-center bg-gray-400 mt-5'>
                Datos del paciente
        </div>
        <div className='flex mt-5'>
                <div className='flex w-4/6'>
                    <p className='mt-2 w-48'>Nombre Completo:</p>
                    <MyTextInput name="nombrePaciente" type="text" placeholder="Nombre del Paciente" error = {errors.cedulaProfesional} disabled={ true } />
                </div>
                <div className='flex w-2/6 text-center'>
                    <p className='mt-2 w-72'>Fecha de nacimiento:</p>
                    <MyTextInput name="fechaNacimiento" type="text" placeholder="Fecha de Nacimiento" error = {errors.fechaNacimiento} textCenter={ true } disabled={ true } />
                </div>
        </div>
        <div className='flex mt-5'>
                <div className='flex w-4/6'>
                    <p className='mt-2 w-48'>CURP:</p>
                    <MyTextInput name="curp" type="text" placeholder="curp" error = {errors.curp} disabled={ true } />
                </div>
                <div className='flex w-2/6 text-right'>
                    <p className='mt-2 w-72 pr-3'>No. Expediente:</p>
                    <MyTextInput name="expediente" type="text" placeholder="Número de Expediente" error = {errors.expediente} textCenter={ true } disabled={ !values.isSaihweb } />
                </div>
        </div>
        <div className='flex mt-5'>
                 <p className='mt-2 mr-3 w-40'>Diagnóstico:</p>
                 <MyTextInput name="diagnostico" type="text" placeholder="diagnóstico" error = {errors.diagnostico} />
        </div>
        <div className=' relative p-2 text-center bg-gray-400 mt-5'>
                INFORMACIÓN DEL MEDICAMENTO
                <button 
                        type='button'
                        className=' absolute left-0 top-0 p-2 ransition-all duration-200 bg-cyan-600 text-cyan-50 hover:bg-cyan-700 hover:scale-103 active:tranform active:scale-90 active:bg-cyan-900' 
                        onClick={ handlesaddNewRow }
                > 
                   + Agregar medicamento
                </button>
        </div>

        <TablaMedicamentos />

        <div className='flex mt-20 mb-10'>
            <div className=' w-1/4'></div>
            <div className=' w-1/4 text-center'>
                    <button type='button'
                            className=' w-72 p-3 ransition-all duration-200 bg-gray-600 text-cyan-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900 '
                            onClick={ handlesReturn }
                    > <UndoTwoTone /> Regresar </button>
            </div>
            <div className=' w-1/4 text-center'>
                    <button type='submit'
                            className=' w-72 p-3 ransition-all duration-200 bg-cyan-600 text-cyan-50 hover:bg-cyan-700 hover:scale-103 active:tranform active:scale-90 active:bg-cyan-900 '
                    >
                     <SaveTwoTone />   Generar Receta</button>
            </div>
            <div className=' w-1/4'></div>
        </div>
    </Form>
  )
}
