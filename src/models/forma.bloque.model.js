const { Model, DataTypes } = require('sequelize');
class FormaBloque extends Model {
    static init(sequelize) {
        super.init({
            id_forma_bloque: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING, //booleano, texto, char, int
                allowNull: false,
                unique: true
            }
        },
            {
                sequelize,
                tableName: 'forma_bloque',
                timestamps: true
            }
        )
    }
}
module.exports = FormaBloque;