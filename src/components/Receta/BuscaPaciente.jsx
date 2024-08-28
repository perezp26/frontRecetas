
import { useSelector } from 'react-redux'
import { Spinner } from '../controlsForm/Spinner'
import { Search } from '@mui/icons-material'

export const BuscaPaciente = ({formValues, handleInputChange, handlesConsultaCurp }) => {
    const { loading } = useSelector( state => state.ui)
    const {buscaCurp, curp, nombrePaciente, fechaNacimiento, expediente } = formValues
  return (
    <>
          <div className='w-1/3'>
              <label htmlFor="curp" className="font-light text-gray-700 text-sm">Buscar CURP</label>
              <div className='flex'>
                    <input
                        id="buscaCurp"
                        type="text"
                        placeholder='CURP'
                        className="shadow text-center appearance-none rounded w-full p-2 text-grey-darker text-sm focus:border-gray-500 focus:outline-0 focus:shadow-xl focus:shadow-gray-500 hover:outline-0 hover:border-gray-600 "
                        name="buscaCurp"
                        value={ buscaCurp }
                        onChange={ ({ target }) => { handleInputChange( target.name, target.value.toUpperCase() ) } }
                    />
                    {
                        !loading ? 
                            <button type='button' className='ml-5 bg-cyan-600 text-white rounded-md p-2 transition duration-200 hover:bg-cyan-700 hover:shadow hover:shadow-slate-400 
                                        hover:scale-103 active:tranform active:scale-90 active:bg-cyan-600 w-40' onClick={ handlesConsultaCurp }> <Search />   Buscar</button>
                        :
                            <Spinner />
                    }
              </div>
          </div>
         <div className='flex mt-3 '>
            <div className='w-2/3 p-2'>
                <label htmlFor="curp" className="font-light text-gray-700 text-sm">CURP</label>
                <input
                    id="curp"
                    type="text"
                    placeholder='CURP'
                    className="shadow appearance-none rounded w-full p-2 text-grey-darker text-sm focus:border-cyan-500 focus:outline-0 focus:shadow focus:shadow-cyan-400 hover:outline-0 hover:border-cyan-500 "
                    name="expediente"
                    value={ curp }
                    disabled={ true }
                    //onChange={ ({ target }) => { handleInputChange( target.name, target.value ) } }
                />
            </div>
            <div className='w-1/3 p-2'>
              <label htmlFor="expediente" className="font-light text-gray-700 text-sm">No. Expediente</label>
              <input
                  id="expediente"
                  type="text"
                  placeholder='No. Expediente'
                  className="shadow appearance-none rounded w-full p-2 text-grey-darker text-sm focus:border-cyan-500 focus:outline-0 focus:shadow focus:shadow-cyan-400 hover:outline-0 hover:border-cyan-500 "
                  name="expediente"
                  value={ expediente }
                  disabled={ true }
                  //onChange={ ({ target }) => { handleInputChange( target.name, target.value ) } }
              />
            </div>
        </div>
        <div className='flex mt-1 mb-5 '>
            <div className='w-2/3 p-2'>
                <label htmlFor="nombrePaciente" className="font-light text-gray-700 text-sm">Nombre Completo</label>
                <input
                    id="nombrePaciente"
                    type="text"
                    placeholder='Nombre Paciente'
                    className="shadow appearance-none rounded w-full p-2 text-grey-darker text-sm focus:border-cyan-500 focus:outline-0 focus:shadow focus:shadow-cyan-400 hover:outline-0 hover:border-cyan-500 "
                    name="nombrePaciente"
                    value={ nombrePaciente }
                    disabled={ true }
                    //onChange={ ({ target }) => { handleInputChange( target.name, target.value ) } }
                />
            </div>
            <div className='w-1/3 p-2'>
              <label htmlFor="fechaNacimiento" className="font-light text-gray-700 text-sm">Fecha Nacimiento</label>
              <input
                  id="fechaNacimiento"
                  disabled={ true }
                  type="text"
                  placeholder='Fecha Nacimiento'
                  className="shadow appearance-none rounded w-full p-2 text-grey-darker text-sm focus:border-cyan-500 focus:outline-0 focus:shadow focus:shadow-cyan-400 hover:outline-0 hover:border-cyan-500 "
                  name="fechaNacimiento"
                  value={ fechaNacimiento }
                  //onChange={ ({ target }) => { handleInputChange( target.name, target.value ) } }
              />
            </div>
        </div>
    </>
  )
}
