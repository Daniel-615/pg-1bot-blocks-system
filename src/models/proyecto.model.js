const { Model, DataTypes } = require('sequelize');

class Proyecto extends Model {
    static init(sequelize) {
        return super.init({
            id_proyecto: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            id_usuario: { type: DataTypes.UUID, allowNull: false },
            nombre: { type: DataTypes.STRING(160), allowNull: false },
            placa: { type: DataTypes.STRING(40), allowNull: false },
            storage_key: { type: DataTypes.STRING(300), allowNull: false, unique: true },
        }, { sequelize, tableName: 'proyecto', timestamps: true });
    }
}

module.exports = Proyecto;
