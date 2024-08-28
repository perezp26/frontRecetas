import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataPaciente: {
        idPaciente : 0,
        curp: '',
        nombrePaciente : "",
        fechaNacimiento: "",
        expediente: "",
        idSaihweb : 0,
        isSaihweb : false,
    },
}

export const pacienteSlice = createSlice({
    name: 'paciente',
    initialState,
    reducers: {
        pacienteSetInitialState: () => initialState,

        pacienteSetDataPaciente: (state, action ) => {
            state.dataPaciente = action.payload ;
        },
    }
});
// Action creators are generated for each case reducer function
export const { pacienteSetInitialState, pacienteSetDataPaciente } = pacienteSlice.actions;