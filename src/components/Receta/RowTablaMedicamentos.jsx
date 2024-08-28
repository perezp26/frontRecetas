
import Select from 'react-select';
import { customStyles } from '../controlsForm/index';
import { useDispatch, useSelector } from 'react-redux';
import { recetaChangeDetalleReceta, recetaDeleteRowDetalle } from '../../store/slices/receta/recetaSlice';

export const RowTablaMedicamentos = ( { data } ) => {

    const dispatch = useDispatch()
    const { productosFilter, tiposDispensacion } = useSelector( state => state.ui )
    const { idRecetaDetalle, valid } = data;

    const handlesInputChange = ( id, name, value ) => {
        dispatch( recetaChangeDetalleReceta( { id, name, value } ) )
    }

    const handlesDeleteRow = ( idRecetaDetalle ) => {
        dispatch( recetaDeleteRowDetalle( idRecetaDetalle ) )
    }
    
  return (
    <tr className={ valid === false ? "bg-red-200" : " bg-white " }>
                <td className="px-1 align-middle border border-solid border-gray-400 py-2  text-center whitespace-nowrap font-semibold">
                    <button 
                                className=' mx-auto w-4 bg-red-600 text-white rounded p-1 transition duration-200 hover:bg-red-700 hover:shadow hover:shadow-slate-400 
                                        hover:scale-103 active:tranform active:scale-90 active:bg-red-600 '
                                onClick={ () => handlesDeleteRow( idRecetaDetalle )  }
                    > - </button>
                </td>
                <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-sm whitespace-nowrap  ">
                        <input
                                id="noEnvases"
                                type="text"
                                placeholder='0'
                                className="shadow border appearance-none rounded w-full py-2 px-2 text-grey-darker text-sm  focus:border-gray-400 focus:outline-0 focus:shadow 
                                         focus:shadow-gray-300 hover:outline-0 hover:border-gray-400  text-center "
                                name="noEnvases"
                                onBlur={  ({ target }) => { handlesInputChange( idRecetaDetalle, target.name, target.value ) } }
                        /> 
                </td>
                <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-sm whitespace-nowrap  ">
                        <select className='w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                name='tiposDispensacion' defaultValue={ 0 } 
                                onChange={ (e) => { handlesInputChange( idRecetaDetalle, 'tiposDispensacion', { 
                                                                                                                idTipoDispensacion: e.target.value,
                                                                                                                descripcion : e.target.options[e.target.selectedIndex].text
                                                                                                              } ) } } >
                                        <option value={ 0 }> - - </option>
                                { 
                                    tiposDispensacion.map( x => ( 
                                        <option key={ x.idTipoDispensacion } value={ x.idTipoDispensacion }> { x.descripcion }</option>
                                    )  ) 
                                }
                        </select>
                </td>
                <td className="px-1 border border-solid border-gray-400  ">
                        <Select 
                            styles={{ ...customStyles } }
                            options= { productosFilter }
                            id="producto"
                            name="producto"
                            placeholder= "Seleccionar medicamento"
                            isClearable
                            //value = { medicamento }
                            onChange={ e => { handlesInputChange( idRecetaDetalle, 'producto', !!e ? e : '' ) } }
                            className="basic-multi-select"
                        /> 
                </td>
                <td className="px-1 align-middle border border-solid border-gray-400 py-2 text-sm whitespace-nowrap  ">
                        <input
                                id="dosis"
                                type="text"
                                placeholder=''
                                className="shadow appearance-none rounded w-full py-2 px-2 text-grey-darker text-sm  focus:border-gray-400 focus:outline-0 focus:shadow 
                                         focus:shadow-gray-300 hover:outline-0 hover:border-gray-400   "
                                name="dosis"
                                onBlur={ ({ target }) => { handlesInputChange( idRecetaDetalle, target.name, target.value ) } }
                        />
                </td>
                <td className="px-1 align-middle border border-solid border-gray-400 py-2 text-sm whitespace-nowrap  ">
                        <input
                                id="viaAdmin"
                                type="text"
                                placeholder=''
                                className="shadow appearance-none rounded w-full py-2 px-2 text-grey-darker text-sm  focus:border-gray-400 focus:outline-0 focus:shadow 
                                         focus:shadow-gray-300 hover:outline-0 hover:border-gray-400   "
                                name="viaAdmin"
                                onBlur={ ({ target }) => { handlesInputChange( idRecetaDetalle, target.name, target.value ) } }
                        />
                </td>
                <td className="px-1 align-middle border border-solid border-gray-400 py-2 text-sm whitespace-nowrap  ">
                        <input
                                id="duracion"
                                type="text"
                                placeholder=''
                                className="shadow appearance-none rounded w-full py-2 px-2 text-grey-darker text-sm  focus:border-gray-400 focus:outline-0 focus:shadow 
                                         focus:shadow-gray-300 hover:outline-0 hover:border-gray-400   "
                                name="duracion"
                                onBlur={ ({ target }) => { handlesInputChange( idRecetaDetalle, target.name, target.value ) } }
                        />
                </td>
            </tr>
  )
}
