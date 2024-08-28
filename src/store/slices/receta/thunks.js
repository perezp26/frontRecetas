
import Swal from "sweetalert2";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { fetchConToken } from "../../../api/recetasApi";
import { recetaSetRecetasPacientes } from "./recetaSlice";
import { pacienteSetDataPaciente } from "../paciente/pacienteSlice";
import { pdfReceta } from "../../../components/Receta/pdfReceta";


export const recetaAddNewReceta = ( values ) =>{
    return async( dispatch ) =>{
        dispatch( uiStartLoading() );

        const resp = await fetchConToken(`receta/addnewreceta`,  values, 'POST' );
        const body = await resp.json();
        if (body.ok) {
            dispatch(pacienteSetDataPaciente( body.paciente ))
        }
        else{
            Swal.fire('Error', body.msg, 'error');
        }
        dispatch( uiEndLoading(  ) );

        return { ok :body.ok, dataReceta : body.dataReceta }
    }
}

export const recetaGetRecetasPacietne = ( idPaciente ) =>{
    return async( dispatch ) =>{
        dispatch( uiStartLoading() );
        const resp = await fetchConToken(`receta/getrecetaspaciente/${idPaciente}`);
        const body = await resp.json();
        if (body.ok) {
            dispatch( recetaSetRecetasPacientes( body.recetas ) )
        }
        else{
            Swal.fire('Error', body.msg, 'error');
        }
        dispatch( uiEndLoading() );

        return body.ok
    }
}

export const recetaGetRecetaPaciente = ( idReceta ) =>{
    return async( dispatch ) =>{
        dispatch( uiStartLoading() );
        const resp = await fetchConToken(`receta/getreceta/${idReceta}`);
        const body = await resp.json();
        if (!body.ok) {
            Swal.fire('Error', body.msg, 'error');
        }
        dispatch( uiEndLoading() );

        return {...body}
    }
}

