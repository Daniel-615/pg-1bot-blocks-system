const { Model, DataTypes } = require('sequelize');

class Ejemplo extends Model {
    static init(sequelize) {
        return super.init({
            id_ejemplo: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            placa: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            dificultad: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'beginner',
            },
            icono: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '📘',
            },
            workspace: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            id_usuario: {
                type: DataTypes.UUID,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'ejemplo',
            timestamps: true,
        });
    }
}

module.exports = Ejemplo;
