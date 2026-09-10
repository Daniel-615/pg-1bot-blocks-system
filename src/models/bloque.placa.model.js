const { Model, DataTypes } = require('sequelize');
class BloquePlaca extends Model {
    static init(sequelize) {
        super.init({
            id_bloque_placa: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            id_bloque: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            id_placa: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            codigo_generado: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            codigo_setup: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            codigo_loop: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            librerias_requeridas: {
                type: DataTypes.TEXT,
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
                tableName: 'bloque_placa',
                timestamps: true
            }
        )
    }
}
module.exports = BloquePlaca;