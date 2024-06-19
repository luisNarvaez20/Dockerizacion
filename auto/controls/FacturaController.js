'use strict';
const { body, validationResult, check } = require('express-validator');
var models = require('../models/');
var factura = models.factura;
var persona = models.persona;
var auto = models.auto;

class FacturaController {
    async listar(req, res) {

    }

    async guardar(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            let persona_id = req.body.external_persona;
            let auto_id = req.body.external_auto;

            if (persona_id != undefined && auto_id != undefined) {

                let personaAux = await persona.findOne({ where: { external_id: persona_id } });
                let autoAux = await auto.findOne({ where: { external_id: auto_id } });
                var lista = await factura.findAll();

                var id = 0;
                if (lista.length === null || lista.length === 0) {
                    id = 1;
                } else {
                    id = lista.length;
                }

                if (personaAux && autoAux) {
                    var data = {
                        numero: req.body.numero,
                        metodo: req.body.metodo,
                        estado: req.body.estado,
                        total: req.body.total,
                        id_persona: personaAux.id,
                        detallefactura: {
                            cantidad: req.body.cantidad,
                            precio_unitario: autoAux.precio,
                            subtotal: autoAux.precio,
                            id_factura: id,
                        }
                    };

                    if (autoAux.estado_vendido === true) {
                        res.status(400);
                        res.json({ msg: "auto ya esta vendido", code: 200 });
                    } else {
                        autoAux.copia_identificacion = personaAux.identificacion;
                        autoAux.estado_vendido = true;

                        var result = await autoAux.save();

                        if (result === null) {
                            res.status(400);
                            res.json({ msg: "error al agregar auto", code: 200 });
                        } else {
                            res.status(200);
                            let transaction = await models.sequelize.transaction();
                            try {
                                await factura.create(data, { include: [{ model: models.detallefactura, as: "detallefactura" }], transaction });
                                await transaction.commit();
                                res.json({ msg: "Se han registrado su Factura", code: 200 });
                            } catch (error) {
                                if (transaction) await transaction.rollback();
                                if (error.errors && error.errors[0].message) {
                                    res.json({ msg: error.errors[0].message, code: 200 })
                                } else {
                                    res.json({ msg: error.message, code: 200 })
                                }

                            }
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

module.exports = FacturaController;