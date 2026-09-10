const { Model, DataTypes } = require('sequelize');

class Bloque extends Model {
    static init(sequelize) {
        return super.init(
            {
                id_bloque: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                nombre: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                descripcion: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                id_tipo_bloque: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                id_extension: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                id_estado_bloque: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                orden: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'bloque',
                timestamps: true
            }
        );
    }
}

module.exports = Bloque;