import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { obtenerMarcas, ObtenerColores, guardarAuto } from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import Header from "./Header";
import { useForm } from 'react-hook-form';
import { Button } from 'bootstrap';

const RegistrarAuto = () => {
    const navegation = useNavigate();
    //const [colores, setColores] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [llmarcas, setLlmarcas] = useState(false);
    //const [llcolor, setLlcolor] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    //acciones
    //submit
    const onSubmit = (data) => {
        var datos = {
            'external_marca': data.external_marca,
            'placa': data.placa,
            'modelo': data.modelo,
            'color': data.color,
            'anio': data.anio,
            'precio': data.precio,
        };
        guardarAuto(datos, getToken()).then((info) => {
            if (info.code !== 200) {
                if (info.msg === 'token expirado o no valido') {
                    borrarSesion();
                    mensajes(info.msg);
                    navegation("/sesion");
                } else {
                    mensajes(info.msg, 'error', 'Error');
                }
            } else {
                if (info.msg === 'placa must be unique') {
                    mensajes("placa de auto ya registrada", 'error', 'Error');
                } else {
                    mensajes(info.msg, 'success', 'Success');
                    navegation('/auto');
                }
            }
        });
    };

    //llamar marcas
    if (!llmarcas) {
        obtenerMarcas(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'token expirado o no valido') {
                borrarSesion();
                mensajes(info.msg);
                navegation("/sesion");
            } else {
                setMarcas(info.info);
                setLlmarcas(true);
            }
        });
    };

    //lamar colores
    // if (!llcolor) {
    //   ObtenerColores().then((info) => {
    //     if (info.error === false) {
    //       setColores(info.data);
    // }
    //setLlcolor(true);
    //});
    //};

    //llamar marcas
    //if (!llmarcas) {
    //  Marcas(getToken()).then((info) => {
    //console.log(info.error);
    //    if (info.error === true && info.message == 'Acceso denegado. Token ha expirado') {
    //      borrarSesion();
    //    mensajes(info.message);
    //   navegation("/sesion");
    //} else {
    //   setMarcas(info.data);
    //  setLlmarcas(true);
    //}
    //});
    //};

    return (
        <div className="wrapper" >
            <center>
                <Header />
                <div className="d-flex flex-column" style={{ width: 700 }}>
                    <h5 className="title" style={{ color: "black", font: "bold" }}>REGISTRO AUTOS</h5>
                    <br />
                    <div className="container">
                        <img src="https://img.remediosdigitales.com/7d3469/yamaha_sports_ride_concept_1/1366_2000.jpg" className="card" style={{ width: 200, height: 125 }} />
                    </div>
                    <br />

                    <div className='container-fluid'>
                        <form className="user" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-4">
                                <div className="col">
                                    <input type="text" {...register('modelo', { required: true })} className="form-control form-control-user" placeholder="Ingrese el modelo" />
                                    {errors.modelo && errors.modelo.type === 'required' && <div className='alert alert-danger'>Ingrese un modelo</div>}
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el año" {...register('anio', { required: true })} />
                                    {errors.anio && errors.anio.type === 'required' && <div className='alert alert-danger'>Ingrese un anio</div>}
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el color" {...register('color', { required: true })} />
                                    {errors.color && errors.color.type === 'required' && <div className='alert alert-danger'>Ingrese un color</div>}
                                </div>
                                <div className="col">
                                    <select className='form-control' {...register('external_marca', { required: true })}>
                                        <option>Elija una marca</option>
                                        {marcas.map((aux, i) => {
                                            return (<option key={i} value={aux.external_id}>
                                                {aux.nombre}
                                            </option>)
                                        })}
                                    </select>
                                    {errors.external_marca && errors.external_marca.type === 'required' && <div className='alert alert-danger'>Seleccione una marca</div>}
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control form-control-user" placeholder="Ingrese la placa" {...register('placa', { required: true })} />
                                    {errors.placa && errors.placa.type === 'required' && <div className='alert alert-danger'>Ingrese una placa</div>}
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el precio" {...register('precio', { required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/ })} />
                                    {errors.precio && errors.precio.type === 'required' && <div className='alert alert-danger'>Ingrese el precio</div>}
                                    {errors.precio && errors.precio.type === 'pattern' && <div className='alert alert-danger'>Ingrese un precio valido</div>}
                                </div>
                            </div>
                            <hr />
                            <button type='submit' className="btn btn-success">GUARDAR</button>
                            <Link to='/auto' className="btn btn-danger" style={{ margin: 20 }}>CANCELAR</Link>
                        </form>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default RegistrarAuto;