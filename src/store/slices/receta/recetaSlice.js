import { createSlice } from '@reduxjs/toolkit';
import { generarId } from '../../../helpers/generaId';

const iniDetalleReceta = {
        idRecetaDetalle : 0,
        noEnvases : 0,
        tiposDispensacion : { idTipoDispensacion : '0', descripcion : '' },
        producto: '',
        dosis:'',
        viaAdmin: '',
        duracion: '',
        valid: true
}

export const recetaSlice = createSlice({
    name: 'receta',
    initialState: {
        listRecetasPaciente:[],
        dataReceta : {
            idReceta: '',
            idTipoReceta:0,
            folio:0,
            idPaciente:0,
            idMedico:0,
            fechaReceta: '',
            diagnostico:''
        },
        recetaDetalles: [ {...iniDetalleReceta, idRecetaDetalle :  generarId() } ]
    },
    reducers: {
        
        recetaSetIniDetalle: ( state )=>{
            //state.recetaDetalles = [ ]
            state.recetaDetalles = [ {...iniDetalleReceta, idRecetaDetalle :  generarId() } ];
        },
        recetaChangeDetalleReceta : ( state, action ) =>{
            
            const { id, name, value } = action.payload

            const row = state.recetaDetalles.filter( r => r.idRecetaDetalle === id );
            const dataRow = { ...row[0], [name] : value };
            const newArray = state.recetaDetalles.map( (d) => (
                                                        d.idRecetaDetalle !== id ? d : dataRow  
                                                ));
            state.recetaDetalles = [ ...newArray ]
        },
        recetaSetInvalidDetalleReceta : ( state, action ) =>{
            state.recetaDetalles = [...action.payload]
        },
        recetaAddNewRowDetalle : ( state, action ) =>{
            state.recetaDetalles = [ ...state.recetaDetalles, {...iniDetalleReceta, idRecetaDetalle : action.payload }]
        },
        recetaDeleteRowDetalle : ( state, action ) => {
            state.recetaDetalles = state.recetaDetalles.filter( x => x.idRecetaDetalle !== action.payload )
        },
        recetaSetRecetasPacientes : ( state, action ) => {
            state.listRecetasPaciente = [ ...action.payload ]
        }
    }
});
// Action creators are generated for each case reducer function
export const { recetaSetIniDetalle, recetaChangeDetalleReceta, recetaSetInvalidDetalleReceta, recetaAddNewRowDetalle, recetaDeleteRowDetalle, recetaSetRecetasPacientes } = recetaSlice.actions;