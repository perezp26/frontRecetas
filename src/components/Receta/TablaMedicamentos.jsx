
import { useState } from 'react';
import { RowTablaMedicamentos } from './RowTablaMedicamentos';
import { generarId } from '../../helpers/generaId';
import { useSelector } from 'react-redux';

export const TablaMedicamentos = () => {

    const { recetaDetalles } = useSelector( state => state.receta)

  return (
    <div className=" w-full">
    <table className="items-center bg-transparent w-full border-collapse">
        <thead className=''>
            <tr>
                <th className='px-2 w-7 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left'></th>
                <th className="px-2 w-28 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left"> Número </th>
                <th className="px-2 w-15 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left"> Dispensación </th>
                <th className="px-2 min-w-45 max-w-96  align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left">Nombre genérico del medicamento y presentación</th>
                <th className="px-2 w-28 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left"> Dosis y frecuncia </th>
                <th className="px-2 w-28 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left"> Vía Admin </th>
                <th className="px-2 w-28 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left"> Duración del Tratamiento </th>
            </tr>
        </thead>
        <tbody>
            {
                recetaDetalles.map( d => (
                    <RowTablaMedicamentos key={ d.idRecetaDetalle } data= { d } />
                ) )
            }
        </tbody>
    </table>
    </div>
  )
}
