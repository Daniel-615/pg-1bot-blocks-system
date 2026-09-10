const { Model, DataTypes } = require('sequelize');
class TipoBloque extends Model {
    static init(sequelize) {
        super.init({
            id_tipo_bloque: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_forma_bloque: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }

        },
            {
                sequelize,
                tableName: 'tipo_bloque',
                timestamps: true
            }
        )
    }
}
module.exports = TipoBloque;