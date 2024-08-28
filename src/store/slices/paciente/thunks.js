import Swal from "sweetalert2";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { fetchConToken } from "../../../api/recetasApi";
import { pacienteSetDataPaciente, pacienteSetInitialState } from "./pacienteSlice";

export const pacienteGetDataPacienteSaihweb = (curp) => {
    return  async( dispatch, getState ) => {
        
        dispatch(uiStartLoading());

        const resp = await fetchConToken(`paciente/getdatapaciente/${curp}`);
        const body = await resp.json();
        const { ok , dataPaciente } = body;
        
        if (ok) {
            
              dataPaciente.idSaihweb === 'invalid' ? Swal.fire('Error','No se encontro el paciente','error') 
             :dataPaciente.vigenciavalida === 'f'  && Swal.fire('Error','No cuenta con ficha vigente','error')

            dataPaciente.idSaihweb !== 'invalid' || dataPaciente.vigenciavalida !== 'f' ? dispatch( pacienteSetDataPaciente( body.dataPaciente )) 
                                                                                        : dispatch( pacienteSetInitialState() ) 

        }
        else{
            dispatch( pacienteSetInitialState() );
            Swal.fire('Error', body.msg, 'error');
        }

        // var formData = new FormData();
        // formData.append('curp', curp);

        // const resp = await fetch( `http://192.168.162.48/apisPHP/getPaciente.php`, {
        //     method : 'POST',
        //     body: formData,
        // });                           } ) ); 
            
        
        
        dispatch( uiEndLoading() )
    }
}