'use strict';

module.exports = (sequelize, DataTypes) => {
    const factura = sequelize.define('factura', {
        numero: { type: DataTypes.STRING(100), defaultValue: "NO_DATA" },
        fecha: { type: DataTypes.DATE, defaultValue:  sequelize.literal('CURRENT_TIMESTAMP')},
        metodo_pago: { type: DataTypes.ENUM("TARJETA_DEBITO", "TARJETA_CREDITO", "EFECTIVO"), defaultValue: "TARJETA_CREDITO" },
        estado: { type: DataTypes.ENUM("PAGADA", "PENDIENTE", "CANCELADA"), defaultValue: "PENDIENTE" },
        total: { type: DataTypes.DECIMAL(15,2), defaultValue: 0.0 },
    }, { freezeTableName: true });
    factura.associate = function(models){
        factura.belongsTo(models.persona, {foreignKey: 'id_persona'});
        factura.hasMany(models.detallefactura,{foreignKey: 'id_factura', as: 'detallefactura'});
    }
    return factura;
};

//join table -- mapear herencias