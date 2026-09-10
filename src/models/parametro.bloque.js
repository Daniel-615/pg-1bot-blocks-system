const { Model, DataTypes } = require('sequelize');
class ParametroBloque extends Model {
    static init(sequelize) {
        super.init({
            id_parametro_bloque: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            id_bloque: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            id_tipo_dato: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            requerido: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            orden: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            etiqueta: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
            {
                sequelize,
                timestamps: true,
                tableName: 'parametro_bloque'
            })
    }
}
module.exports = ParametroBloque;