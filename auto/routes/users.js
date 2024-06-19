var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const RolController = require('../controls/RolController');
var rolController = new RolController();
const PersonaController = require('../controls/PersonaController');
var personaController = new PersonaController();
const MarcaController = require('../controls/MarcaController');
var marcaController = new MarcaController();
const AutoController = require('../controls/AutoController');
var autoController = new AutoController();
const FacturaController = require('../controls/FacturaController');
var facturaController = new FacturaController();
const CuentaController = require('../controls/CuentaController');
var cuentaController = new CuentaController();
let jwt = require('jsonwebtoken');

//Middleware ----- filtro para peticiones //autentificacion
var auth = function middleware(req, res, next) {
  const token = req.headers['x-api-token'];
  if (token) {
    require("dotenv").config();
    const llave = process.env.KEY;
    jwt.verify(token, llave, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ msg: "token expirado o no valido", code: 401 });
      } else {
        var models = require('../models');
        req.decoded = decoded;
        let aux = await models.cuenta.findOne({ where: { external_id: req.decoded.external} });
        if (!aux) {
          res.status(401);
          res.json({ msg: "token no valido", code: 401 });
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401);
    res.json({ msg: "No existe token", code: 401 });
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ "version": "1.0", "name": "auto" });
});

//autos
router.get('/marcas',marcaController.listar);
router.get('/autos',auth, autoController.listar);
router.get('/autos/novendidos',auth,autoController.obtenerNoVendidos);
router.get('/autos/vendidos',autoController.obtenerNoVendidos);
router.post('/autos/guardar',auth,[
  body('modelo', 'Ingrese un modelo').trim().exists().not().isEmpty(),
  body('placa', 'Ingrese una placa').trim().exists().not().isEmpty(),
], autoController.guardar);
//facturas
router.post('/facturas/guardar', [
  body('numero', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({ min: 3, max: 100 }).withMessage("Ingrese un valor mayor a 3 y menor a 100"),
  body('metodo', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({ min: 3, max: 100 }).withMessage("Ingrese un valor mayor a 3 y menor a 100"),
], facturaController.guardar);
router.get('/facturas', facturaController.listar);
//personas
router.post('/personas/guardar', [
  body('apellidos', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({ min: 3, max: 100 }).withMessage("INgrese un valor mayor a 3 y menor a 100"),
  body('nombres', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({ min: 3, max: 100 }).withMessage("INgrese un valor mayor a 3 y menor a 100"),
], personaController.guardar);
router.post('/personas/modificar',auth, personaController.modificar);
router.get('/personas',auth, personaController.listar);
router.get('/personas/obtener/:external', auth, personaController.obtener);
//cuenta
router.post('/sesion', [
  body('email', 'Ingrese un correo valido').trim().exists().not().isEmpty().isEmail(),
  body('clave', 'Ingrese la clave').trim().exists().not().isEmpty(),
], cuentaController.sesion);

//roles
router.get('/roles', rolController.listar);

//marca
router.get('/marcas/numero', auth,marcaController.numMarcas);

/*
router.get('/suma/:a/:b', function(req, res, next) {
  var a = Number(req.params.a);
  var b = Number (req.params.b);
  var c = a + b;
  res.status(200);
    res.json({"msg": "OK","Resp": c});
});

router.post('/sumar', function(req, res, next) {
  var a = Number(req.body.a) ;
  var b = Number(req.body.b);
  if(isNaN(a) || isNaN(b)){
    res.status(400);
    res.json({"msg": "FALTAN DATOS"});
  }
  var c = a + b;
  res.status(200);
    res.json({"msg": "OK","Resp": c});
});
*/
module.exports = router;


//tipos de autentificacion hay en res api