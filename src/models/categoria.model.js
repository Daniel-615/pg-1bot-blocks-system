const { Model, DataTypes } = require('sequelize');
class Categoria extends Model {
    static init(sequelize) {
        super.init({
            id_categoria: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true

            },
        },
            {
                sequelize,
                tableName: 'categoria',
                timestamps: true
            }
        )
    }
}
module.exports = Categoria;
