'use strict';

module.exports = (sequelize, DataTypes) => {
    const detallefactura = sequelize.define('detallefactura', {
        cantidad: { type: DataTypes.INTEGER, defaultValue: 0 },
        precio_unitario: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.0 },
        subtotal: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.0 },
    }, { freezeTableName: true });
    detallefactura.associate = function (models) {
        detallefactura.belongsTo(models.auto, { foreignKey: 'id_auto' });
        detallefactura.belongsTo(models.factura, { foreignKey: 'id_factura' });
    }
    return detallefactura;
};

//numero de marcas select count from marca; no sacar con el length
