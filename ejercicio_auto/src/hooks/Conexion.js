
//const URL = "http://localhost/v1/index.php";
const URL = "http://localhost:3006/api";

export const InicioSesion = async (data) => {
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json"
    };
    const datos = await (await fetch(URL + "/sesion", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    //console.log(datos);
    return datos;
}

//export const Marcas = async (key) => {
//const cabeceras = {
// "x-api-key": key
//}
//  const datos = await (await fetch(URL + "/marcas/numero", {
//    method: "GET",
//    headers: cabeceras,
//})).json();
//console.log(datos.status);
//return datos;
//}

export const Marcas = async (key) => {
    const cabeceras = {
        'x-api-token': key
    };
    const datos = await (await fetch(URL + "/marcas/numero", {
        method: "GET",
        headers: cabeceras,
    })).json();
    return datos;
}

export const obtenerMarcas = async (key) => {
    const cabeceras = {
        'x-api-token': key
    };
    const datos = await (await fetch(URL + "/marcas", {
        method: "GET",
        headers: cabeceras,
    })).json();
    return datos;
}

//export const Autos = async (key) => {
//const datos = await (await fetch(URL + "/auto", {
//  method: "GET",
//})).json();
//console.log(datos.status);
//  return datos;
//}

//export const AutosCant = async (key) => {
//  const cabeceras = {
//    "X-API-KEY": key
//  };
//const datos = await (await fetch(URL + "/auto/contar", {
//   method: "GET",
// headers: cabeceras
//})).json();
//return datos;
//}

export const AutosCant = async (key) => {
    const cabeceras = {
        'x-api-token': key
    };
    const datos = await (await fetch(URL + "/autos/novendidos", {
        method: "GET",
        headers: cabeceras,
    })).json();
    return datos;
}

export const Autos = async (key) => {
    const cabeceras = {
        'x-api-token': key
    };
    const datos = await (await fetch(URL + "/autos", {
        method: "GET",
        headers: cabeceras,
    })).json();
    return datos;
}

export const guardarAuto = async (data, key) => {
    const cabeceras = {
        'x-api-token': key,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const datos = await (await fetch(URL + "/autos/guardar", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data),
    })).json();
    return datos;
}

//export const ObtenerColores = async (key) => {
    //const datos = await (await fetch(URL + "/auto/colores", {
      //  method: "GET",
    //})).json();
  //  return datos;
//}

export const GuardarMarcas = async (data, key) => {
    const headers = {
        'Accept': 'application/json',
        "X-API-KEY": key
    };
    const datos = await (await fetch(URL + "/marca/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    //console.log(datos);
    return datos;
}

//export const guardarAuto = async (data, key) => {
  //  const cabeceras = {
    //    'x-api-token': key
    //};
    //const datos = await (await fetch(URL + "/autos/guardar", {
     //   method: "POST",
       // headers: cabeceras,
       // body: JSON.stringify(data),
    //})).json();
    //return datos;
//}

