import Header from "./Header";
import "../css/style.css";
import Footer from "./Footer";
import { AutosCant, Marcas } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import { useNavigate } from 'react-router-dom';
import mensajes from '../utilidades/Mensajes';
import { useState } from "react";
//import ListarAutos from "./ListarAutos";

const Inicio = () => {
    const navegation = useNavigate();
    const [nro, setNro] = useState(0);
    const [nroA, setNroA] = useState(0);

    //  Marcas(getToken()).then((info)=> {
    //if (info.code !== 200 && info.msg === 'token expirado o no valido') {
    //    borrarSesion();
    //    mensajes(info.msg);
    //    navegation("/sesion");
    //}else{
    // console.log(info.data.length);
    // setNro(info.marcas);
    //}
    //});

    Marcas(getToken()).then((info) => {
        if (info.code !== 200 && info.msg === 'token expirado o no valido') {
            borrarSesion();
            mensajes(info.msg);
            navegation("/sesion");
        } else {
            setNro(info.marcas);
        }
    });

    AutosCant(getToken()).then((info) => {
        if (info.code !== 200 && info.msg === 'token expirado o no valido') {
            borrarSesion();
            mensajes(info.msg);
            navegation("/sesion");
        } else {
            setNroA(info.nro);
        }
    });

    /*
    AutosCant(getToken()).then((info)=> {
        if (info.error === true && info.message =='Acceso denegado. Token ha expirado') {
            borrarSesion();
            mensajes(info.message);
            navegation("/sesion");
        }else{
            //console.log(info.data.length);
           setNroA(info.data.nro);
        }
    });*/

    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">
                    <Header />

                    {/**DE AQUI CUERPO */}
                    <div className="container-fluid">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                        <div className="row">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Nro de marcas</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{nro}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Autos en existencia  (No vendidos)</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{nroA}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                    {/*<ListarAutos/>*/}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Inicio;