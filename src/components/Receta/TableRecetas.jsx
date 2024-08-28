
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnasTableRecetas } from './ColumnasTableRecetas';
import { PrintRounded } from '@mui/icons-material';
import { recetaGetRecetaPaciente } from '../../store/slices/receta/thunks';
import { pdfReceta } from './pdfReceta';

export const TableRecetas = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector( state => state.ui )
  const { listRecetasPaciente } = useSelector( state => state.receta )

  const columns = useMemo( () => ColumnasTableRecetas() )

  const handlesPrintReceta = async( idReceta ) => {
     const respuesta =  await dispatch( recetaGetRecetaPaciente(idReceta) );
     pdfReceta( {...respuesta.dataReceta} )
  }

  return (
    <div>

<MaterialReactTable 
            columns = { columns }
            data = { listRecetasPaciente }

            localization={MRT_Localization_ES}
            enableColumnActions={ false }
            enableTopToolbar = { false }
            enableBottomToolbar = { false }
            //layoutMode='grid'
            state={{
                isLoading : loading,
                pagination : {
                            pageIndex:0,
                            pageSize:25,    
                }
              }}
            muiTableBodyCellProps={{
                sx: {
                  fontSize:'12px',
                  fontWeight:'light',
                }
              }}
              enablePagination={ false }
              muiPaginationProps={{ showRowsPerPage: false }}
              enableRowActions

              renderRowActions={({row}) => {
                 return ( <div className=' w-14 text-center'> <button onClick={ () => handlesPrintReceta( row.original.idReceta )}><PrintRounded fontSize='small' /></button> </div> )
              }
            }
        />
    </div>
  )
}
