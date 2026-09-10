const { Model, DataTypes } = require('sequelize');
class TipoDato extends Model {
    static init(sequelize) {
        super.init({
            id_tipo_dato: {
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
                tableName: 'tipo_dato',
                timestamps: true
            }
        )
    }
}
module.exports = TipoDato;