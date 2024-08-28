import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../../../api/recetasApi";
import { authSetLogin } from "./authSlice";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";

export const authGetLogin = (values) => {

        return async( dispatch, getState ) => {

            dispatch( uiStartLoading() );

            const { rfc, cedulaProfesional  } = values
            const resp = await fetchSinToken ('auth', { rfc, cedulaProfesional  }, 'POST' );
            const body = await resp.json();

            if (body.ok) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem( 'toke-init-date', new Date().getTime() );
                dispatch( authSetLogin( body.medico ) )
            } else{
                Swal.fire('Error', body.msg, 'error');
            }

            dispatch( uiEndLoading() );

        }

}

export const revalidaToken = () =>{
    return async( dispatch ) =>{

        dispatch( uiStartLoading() );

        const resp = await fetchConToken('auth/renew', {}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'toke-init-date', new Date().getTime() );
            dispatch( authSetLogin( body.medico ) )
        } 
        else{
            //Swal.fire('Error', body.msg, 'error');
        }
        dispatch( uiEndLoading() );



        //dispatch( uiChekingFinish() );
    }
}

