
import AddIcon from '@mui/icons-material/Add';

export const ButtonAddNew = ( { handelsOnClick } ) => {

  return (
    <button className=" transition-all duration-200 bg-cyan-600 fab text-cyan-50 hover:bg-cyan-700 hover:scale-103 active:tranform active:scale-90 active:bg-teal-600"  
            onClick={ () => handelsOnClick() }
    >
            <AddIcon fontSize="large" className=' -mt-1' /> 
    </button>
  )
}