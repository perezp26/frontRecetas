import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './slices/ui/uiSlice'
import { recetaSlice } from './slices/receta/recetaSlice'
import { authSlice } from './slices/auth/authSlice'
import { pacienteSlice } from './slices/paciente/pacienteSlice'

export const store = configureStore({
    reducer: {
          receta : recetaSlice.reducer,
          auth : authSlice.reducer,
          paciente: pacienteSlice.reducer,
          ui: uiSlice.reducer
    },
  })