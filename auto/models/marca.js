'use strict';

module.exports = (sequelize, DataTypes) => {
    const marca = sequelize.define('marca', {
        nombre: { type: DataTypes.STRING(100), defaultValue: "NO_DATA" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },

    }, { freezeTableName: true });

    marca.associate = function(models){
        marca.hasMany(models.auto, {foreignKey: 'id_marca', as: "auto"});
    }
    return marca;
};