import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: false,
        readOnlyData: false,
        viewModal : false,
        productos : [],
        productosFilter : [],
        tiposReceta : [],
        tiposDispensacion: [],
    },
    reducers: {
        uiStartLoading: (state, /* action */ ) => {
            state.loading= true;
        },
        uiEndLoading: (state) =>{
            state.loading = false;
        },
        uiOpenModal: ( state) =>{
            state.viewModal = true
        },
        uiCloseModal : (state) =>{
            state.viewModal = false
        },
        uiSetCatalogosReceta : ( state, action ) => {
            state.productos = action.payload.productos
            state.tiposReceta = action.payload.tiposReceta
            state.tiposDispensacion = action.payload.tiposDispensacion
        },
        uiReadOnlyData : (state, action) =>{ state.readOnlyData = action.payload },
        uiSetFilterProductos : ( state, action ) => { 
                state.productosFilter = state.productos.filter( x => x.tipoMedicamento.toString() === action.payload.toString() ) 

        }
    }
});
// Action creators are generated for each case reducer function
export const { uiStartLoading, uiEndLoading, uiCloseModal, uiOpenModal, uiSetCatalogosReceta, uiReadOnlyData, uiSetFilterProductos } = uiSlice.actions;