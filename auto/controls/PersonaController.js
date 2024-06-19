'use strict';
const { body, validationResult, check } = require('express-validator');
var models = require('../models/');
var rol = models.rol;
var persona = models.persona;
const bcrypt = require('bcrypt');
const saltRounds = 8;

class PersonaController {
    async listar(req, res) {
        var lista = await persona.findAll({
            include: { model: models.cuenta, as: "cuenta", attributes: ['correo'] },
            attributes: ['nombres', 'apellidos', 'direccion', 'identificacion', 'tipo_identificacion', 'external_id']
        });
        res.status(200);
        res.json({ msg: "OK!", code: 200, info: lista });
    }

    async obtener(req, res) {
        const external = req.params.external;
        var lista = await persona.findOne({
            where: { external_id: external }, include: { model: models.cuenta, as: "cuenta", attributes: ['correo'] },
            attributes: ['nombres', 'apellidos', 'direccion', 'identificacion', 'tipo_identificacion', 'external_id']
        });
        if (lista === null) {
            lista = {};
        }
        res.status(200);
        res.json({ msg: "OK!", code: 200, info: lista });
    }

    async guardar(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let rol_id = req.body.external_rol;
            if (rol_id != undefined) {
                let rolAux = await rol.findOne({ where: { external_id: rol_id } });
                if (rolAux) {
                    var claveHash = function (clave) {
                        return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
                    };
                    var data = {
                        identificacion: req.body.dni,
                        tipo_identificacion: req.body.tipo,
                        apellidos: req.body.apellidos,
                        nombres: req.body.nombres,
                        direccion: req.body.direccion,
                        id_rol: rolAux.id,
                        cuenta: {
                            correo: req.body.correo,
                            clave: claveHash(req.body.clave),
                        }
                    };
                    res.status(200);
                    let transaction = await models.sequelize.transaction();
                    try {
                        await persona.create(data, { include: [{ model: models.cuenta, as: "cuenta" }], transaction });
                        await transaction.commit();
                        res.json({ msg: "Se han registrado sus datos", code: 200 });
                    } catch (error) {
                        if (transaction) await transaction.rollback();
                        if (error.errors && error.errors[0].message) {
                            res.json({ msg: error.errors[0].message, code: 200 })
                        } else {
                            res.json({ msg: error.message, code: 200 })
                        }

                    }
                } else {
                    res.status(400);
                    res.json({ msg: "Datos no encontrados", code: 400 });
                }
            } else {
                res.status(400);
                res.json({ msg: "Datos no encontrados", code: 400 });
            }
        } else {
            res.status(400);
            res.json({ msg: "Datos faltantes", code: 400 });

        }


    }

    async modificar(req, res) {
        var person = await persona.findOne({ where: { external_id: req.body.external } })
        if (person === null) {
            res.json({ msg: "no existe el registro", code: 400 });
        } else {
            var uuid = require('uuid');
            person.identificacion = req.body.dni;
            person.tipo_identificacion = req.body.tipo;
            person.apellidos = req.body.apellidos;
            person.nombres = req.body.nombres;
            person.direccion = req.body.direccion;
            person.external_id = uuid.v4();
            var result = await person.save();
            if (result === null) {
                res.status(400);
                res.json({ msg: "No se han modificado sus datos", code: 200 });
            } else {
                res.status(200);
                res.json({ msg: "Se han modificado sus datos", code: 200 });
            }
        }
    }
}

module.exports = PersonaController;