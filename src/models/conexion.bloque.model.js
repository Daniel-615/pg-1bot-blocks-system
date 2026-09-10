const { Model, DataTypes } = require('sequelize');
class ConexionBloque extends Model {
    static init(sequelize) {
        super.init({
            id_conexion_bloque: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            id_bloque: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            id_tipo_conexion: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            orden: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
            {
                sequelize,
                timestamps: true,
                tableName: 'conexion_bloque'
            }
        )
    }
}
module.exports = ConexionBloque;