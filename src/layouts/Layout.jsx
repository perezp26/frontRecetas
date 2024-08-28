import { Link, Outlet, useLocation } from "react-router-dom"

import logohraepy from '../imgs/logohraepy.png'
import { useDispatch } from "react-redux";
import { authOutLogin } from "../store/slices/auth/authSlice";
import { pacienteSetInitialState } from "../store/slices/paciente/pacienteSlice";

export const Layout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlActual = location.pathname;

    const handlesLogout = () => {
        localStorage.clear();
        dispatch( pacienteSetInitialState() );
        dispatch( authOutLogin() );
    }

  return (
    <div className="md:flex md:min-h-screen bg-gray-100">

        <div className="md:w-2/12 md:min-h-screen bg-cyan-700">
                <img className="mx-auto mt-5" src={ logohraepy } alt="logo" width={90} />
                <h1 className=" mt-2 text-xl font-light text-center text-white">
                   
                </h1>
                <hr />
                <nav className="mt-3 px-5">
                    {
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/' ? ' text-slate-300 ' : ' text-white ' }  text-xl block hover:text-gray-600 `} 
                                    to='/'
                            >
                                <p className="font-light text-lg"> - Receta</p> 
                            </Link>
                    }
                </nav>

                <button type="button" className=" transition duration-150 bg-cyan-50 text-slate-600 py-3 w-full hover:bg-slate-300 mt-10" onClick={ handlesLogout } >Salir</button>
        </div>
        <div className="md:w-10/12 ">
                <Outlet />
        </div>
    </div>
  )
}