import React, { useState } from 'react';
import { Autos } from '../hooks/Conexion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";
import DataTable from 'react-data-table-component';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';

const ListarAutos = () => {
    const navegation = useNavigate();
    const [data, setData] = useState([]);
    const [llautos, setLlautos] = useState(false);

    //Autos().then((info) => {
    //  if (info.error === false) {
    //     setData(info.data);
    //};
    //});


    if (!llautos) {
        Autos(getToken()).then((info) => {
            if (info.code !== 200 && info.msg === 'token expirado o no valido') {
                borrarSesion();
                mensajes(info.msg);
                navegation("/sesion");
            } else {
                setData(info.info);
                setLlautos(true);
            }
        });
    }


    const columns = [
        {
            name: 'Modelo',
            selector: row => row.modelo,
        },
        {
            name: 'Anio',
            selector: row => row.anio,
        },
        {
            name: 'Color',
            selector: row => row.color,
        },
        {
            name: 'Vendido',
            selector: row => row.estado_vendido.toString(),
        },
        {
            name: 'Precio',
            selector: row => '$ ' + row.precio,
        },
        {
            name: 'Marca',
            selector: row => row.marca.nombre,
        },
    ];

    return (

        <div className='wrapper'>
            <Header />
            <div className="card text-center" style={{ margin: 20 }}>
                <div className="card-header" style={{ color: "black" }}>*** LISTA DE AUTOS DISPONIBLES***</div>
                <div className="card-body">
                    <div className='container-fluid'>

                        <div className="row mb-4">
                            <div className="col">
                                <a className="btn btn-success" style={{ height: 40, width: 200 }} href={'/auto/registro'}>NUEVO</a>
                            </div>
                            <div className="col">


                            </div>
                        </div>

                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    );
}

export default ListarAutos;