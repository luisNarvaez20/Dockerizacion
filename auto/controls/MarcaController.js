'use strict';

var models = require('../models/');
var marca = models.marca;


class MarcaController {
    async listar(req, res) {
        var lista = await marca.findAll({
            attributes: ['nombre', 'external_id']
        });
        res.json({ msg: "OK!", code: 200, info: lista });
    }

    async numMarcas(req, res) {
        var num = await marca.count();
        res.json({ msg: "OK!", code: 200, marcas: num });
    }
}

module.exports = MarcaController;