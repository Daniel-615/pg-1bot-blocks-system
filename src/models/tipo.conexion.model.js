const { Model, DataTypes } = require('sequelize');
class TipoConexion extends Model {
    static init(sequelize) {
        super.init({
            id_tipo_conexion: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
            {
                sequelize,
                timestamps: true,
                tableName: 'tipo_conexion'
            }
        )
    }
}
module.exports = TipoConexion;
