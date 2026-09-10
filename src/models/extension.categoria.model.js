const { Model, DataTypes } = require('sequelize');

class ExtensionCategoria extends Model {
    static init(sequelize) {
        return super.init(
            {
                id_extension_categoria: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                id_extension: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                id_categoria: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                activo: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                }
            },
            {
                sequelize,
                tableName: 'extension_categoria',
                timestamps: true
            }
        );
    }
}

module.exports = ExtensionCategoria;