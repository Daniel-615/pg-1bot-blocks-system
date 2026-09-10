const { Model, DataTypes } = require('sequelize');
class Extension extends Model {
    static init(sequelize) {
        super.init({
            id_extension: {
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
                allowNull: true,
            },
            version: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "1.0.0"
            },
            id_usuario: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            id_estado_extension: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
            {
                sequelize,
                tableName: 'extension',
                timestamps: true
            })
    }
}
module.exports = Extension;
