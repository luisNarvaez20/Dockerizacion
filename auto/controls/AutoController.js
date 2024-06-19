'use strict';
const { body, validationResult, check } = require('express-validator');
var models = require('../models/');
var auto = models.auto;
var marca = models.marca;

class AutoController {

    async listar(req, res) {
        var lista = await auto.findAll({
            where: { estado_vendido: false},
            include: { model: models.marca, as: "marca", attributes: ['nombre'] },
            attributes: ['modelo', 'color', 'anio', 'precio', 'estado_vendido', 'external_id', 'copia_identificacion']
        });
        res.status(200);
        res.json({ msg: "OK!", code: 200, info: lista });
    }

    async obtenerVendidos(req, res) {
      var lista = await auto.findAll({
        where: { estado_vendido: true },
       include: { model: models.marca, as: "marca", attributes: ['nombre'] },
      attributes: ['modelo', 'color', 'anio', 'precio', 'estado_vendido', 'external_id', 'copia_identificacion']
    });
    if (lista === null) {
      lista = {};
    }
    res.status(200);
    res.json({ msg: "OK!", code: 200, info: lista });
    }

    async obtenerNoVendidos(req, res) {
        var num = await auto.count({
            where: { estado_vendido: false },
            include: { model: models.marca, as: "marca", attributes: ['nombre'] },
        });
        res.status(200);
        res.json({ msg: "OK!", code: 200, nro: num });
    }


    async guardar(req, res) {
        console.log("body", req.body)
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let marca_id = req.body.external_marca;
            if (marca_id != undefined) {
                let marcaAux = await marca.findOne({ where: { external_id: marca_id } });
                if (marcaAux) {
                    var data = {
                        placa: req.body.placa,
                        modelo: req.body.modelo,
                        color: req.body.color,
                        anio: req.body.anio,
                        precio: req.body.precio,
                        id_marca: marcaAux.id,
                    };
                    res.status(200);
                    let transaction = await models.sequelize.transaction();
                    try {
                        await auto.create(data, transaction);
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
}

module.exports = AutoController;