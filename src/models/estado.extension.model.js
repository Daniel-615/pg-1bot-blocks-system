const { Model, DataTypes } = require('sequelize');

class EstadoExtension extends Model {
    static init(sequelize) {
        super.init({
            id_estado_extension: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            tableName: 'estado_extension',
            timestamps: true
        });
    }
}

module.exports = EstadoExtension;
