const { Model, DataTypes } = require('sequelize');
class Placa extends Model {
    static init(sequelize) {
        super.init({
            id_placa: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
            {
                sequelize,
                tableName: 'placa',
                timestamps: true
            }
        )
    }
}
module.exports = Placa;