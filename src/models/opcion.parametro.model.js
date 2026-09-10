const { Model, DataTypes } = require('sequelize');
class OpcionParametro extends Model {
    static init(sequelize) {
        super.init({
            id_opcion_parametro: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            id_parametro: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            etiqueta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            valor: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            orden: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }
        },

            {
                sequelize,
                timestamps: true,
                tableName: 'opcion_parametro'
            }
        )
    }
}
module.exports = OpcionParametro;
