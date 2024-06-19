'use strict';
const { body, validationResult, check } = require('express-validator');
var models = require('../models/');
var cuenta = models.cuenta;
const bcrypt = require('bcrypt');
const saltRounds = 8;
let jwt = require('jsonwebtoken');

class CuentaController {

    async sesion(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            var login = await cuenta.findOne({
                where: { correo: req.body.email },
                include: { model: models.persona, as: "persona", attributes: ['apellidos', 'nombres'] }
            });
            if (login === null) {
                res.status(400);
                res.json({ msg: "Cuenta no encontrada", code: 400 });
            } else {
                res.status(200);
                var isClaveValida = function (clave, claveUser) {
                    return bcrypt.compareSync(claveUser, clave);
                };
                if (login.estado) {
                    if (isClaveValida(login.clave, req.body.clave)) {
                        const tokenData = {
                            external: login.external_id,
                            email: login.correo,
                            check: true
                        };
                        require("dotenv").config();
                        const llave = process.env.KEY;
                        const token = jwt.sign(tokenData, llave, { expiresIn: '1h' });
                        res.json({
                            msg: "OK",
                            token: token,
                            user: login.persona,
                            correo: login.correo,
                            code: 200,
                        })
                    } else {
                        res.json({ msg: "Datos incorrectos", code: 400 });
                    }
                } else {
                    res.json({ msg: "Cuenta desactivada", code: 200 });
                }
            }
        } else {
            res.status(400);
            res.json({ msg: "Datos faltantes", code: 400 });

        }
    }
}

module.exports = CuentaController;

//enviar nombre o external de rol para autorizacion
// modulos de autorizacion y autenticacion