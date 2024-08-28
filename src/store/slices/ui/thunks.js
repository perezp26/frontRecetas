import Swal from "sweetalert2";
import { fetchSinToken } from "../../../api/recetasApi";
import { uiEndLoading, uiSetCatalogosReceta, uiStartLoading } from "./uiSlice";

export const uiGetCatalogosReceta = () =>{
    return async( dispatch ) =>{
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`ui/catalogoscontrato`);
        const body = await resp.json();

        if (body.ok) {
            dispatch( uiSetCatalogosReceta( body.data ) ) ;
        }
        else{
            Swal.fire('Error', body.msg, 'error');
        }


        dispatch( uiEndLoading() );

    }
}