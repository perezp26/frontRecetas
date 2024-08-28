import { BrowserRouter, Route, Routes } from "react-router-dom"

import {Receta } from "../pages"
import { Layout } from "../layouts/Layout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {FormReceta} from "../components/Receta/FormReceta"
import { PublicRoute } from "./PublicRotuer"
import { PrivateRoute } from "./PrivateRouter"
import { Login } from "../layouts/Login"
import { uiGetCatalogosReceta } from "../store/slices/ui/thunks"
import { revalidaToken } from "../store/slices/auth/thunks"

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { login } = useSelector( state => state.auth );
  const [isAutehticated, setIsAutehticated] = useState(false);
  const { idMedico } = login;

  useEffect(() => {
    localStorage.getItem('token') && dispatch( revalidaToken() ) ;   
  }, []);

  useEffect(() => {
    idMedico !== 0 && dispatch( uiGetCatalogosReceta() )
    setIsAutehticated( idMedico === 0 ? false : true )
}, [idMedico]);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={  <PublicRoute isAuthenticated={ isAutehticated }> <Login /> </PublicRoute> } />
        <Route path="/receta"  element={<PrivateRoute isAuthenticated={ isAutehticated } > <Layout /> </PrivateRoute> }>
            <Route index element={  <Receta /> } />
            <Route path="frmreceta" element={  <FormReceta /> } />
        </Route>
        
      </Routes>
    </BrowserRouter>
        
  )
}
