import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        idMedico: 0,
        nombreMedico: '',
        rfc: '',
        cedulaProfesional: '',
        universidad : '',
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        authSetLogin: (state, action) => {
          state.login = action.payload
        },
        
        authOutLogin: () => initialState
    
      },
    })
    
    // Action creators are generated for each case reducer function
    export const { authSetLogin, authOutLogin } = authSlice.actions