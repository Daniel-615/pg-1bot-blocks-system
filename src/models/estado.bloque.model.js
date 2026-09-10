const { Model, DataTypes } = require('sequelize');
class EstadoBloque extends Model {
    static init(sequelize) {
        super.init({
            id_estado_bloque: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
            {
                sequelize,
                tableName: 'estado_bloque',
                timestamps: true,
            }
        )
    }
}
module.exports = EstadoBloque;