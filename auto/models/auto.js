'use strict';

module.exports = (sequelize, DataTypes) => {
    const auto = sequelize.define('auto', {
        modelo: { type: DataTypes.STRING(100), defaultValue: "NO_DATA" },
        placa: { type: DataTypes.STRING(100), defaultValue: "NO_DATA", unique: true },
        color: { type: DataTypes.STRING(100), defaultValue: "NO_DATA" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        anio: { type: DataTypes.STRING(10), defaultValue: "NO_DATA" },
        precio: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.0 },
        //Copia de la identificacion de persona para auto
        copia_identificacion: { type: DataTypes.STRING(20), defaultValue: "NO_DATA" },
        estado_vendido: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, { freezeTableName: true });

    auto.associate = function (models) {
        auto.belongsTo(models.marca, { foreignKey: 'id_marca' });
        auto.hasOne(models.detallefactura, { foreignKey: 'id_auto', as: "detallefactura" });
    }
    return auto;
};

//./node_modules/nodemon/bin/nodemon.js