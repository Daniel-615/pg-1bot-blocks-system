const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

class Database {
    constructor() {
        this._sequelize = new Sequelize(
            dbConfig.DB,
            dbConfig.USER,
            dbConfig.PASSWORD,
            {
                host: dbConfig.HOST,
                port: dbConfig.PORT,
                dialect: dbConfig.dialect,
                port: dbConfig.PORT,
                pool: dbConfig.pool,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                logging: false
            }
        );

        this.Sequelize = Sequelize;
        this.models = {};

        this._loadModels();
        this._associateModels();
    }

    _loadModels() {
        const sequelize = this._sequelize;

        this.models.Bloque = require('../models/bloque.model');
        this.models.BloquePlaca = require('../models/bloque.placa.model');
        this.models.Categoria = require('../models/categoria.model');
        this.models.ConexionBloque = require('../models/conexion.bloque.model');
        this.models.EstadoBloque = require('../models/estado.bloque.model');
        this.models.EstadoExtension = require('../models/estado.extension.model');
        this.models.ExtensionCategoria = require('../models/extension.categoria.model');
        this.models.Extension = require('../models/extension.model');
        this.models.FormaBloque = require('../models/forma.bloque.model');
        this.models.OpcionParametro = require('../models/opcion.parametro.model');
        this.models.ParametroBloque = require('../models/parametro.bloque');
        this.models.Placa = require('../models/placa.model');
        this.models.TipoBloque = require('../models/tipo.bloque.model');
        this.models.TipoConexion = require('../models/tipo.conexion.model');
        this.models.TipoDato = require('../models/tipo.dato.model');

        Object.values(this.models).forEach((model) => {
            model.init(sequelize);
        });
    }

    _associateModels() {
        const {
            Bloque,
            BloquePlaca,
            Categoria,
            ConexionBloque,
            EstadoBloque,
            EstadoExtension,
            ExtensionCategoria,
            Extension,
            FormaBloque,
            OpcionParametro,
            ParametroBloque,
            Placa,
            TipoBloque,
            TipoConexion,
            TipoDato
        } = this.models;

        Extension.hasMany(Bloque, {
            foreignKey: 'id_extension',
            as: 'bloques'
        });

        Bloque.belongsTo(Extension, {
            foreignKey: 'id_extension',
            as: 'extension'
        });

        EstadoBloque.hasMany(Bloque, {
            foreignKey: 'id_estado_bloque',
            as: 'bloques'
        });

        Bloque.belongsTo(EstadoBloque, {
            foreignKey: 'id_estado_bloque',
            as: 'estado'
        });

        EstadoExtension.hasMany(Extension, {
            foreignKey: 'id_estado_extension',
            as: 'extensiones'
        });

        Extension.belongsTo(EstadoExtension, {
            foreignKey: 'id_estado_extension',
            as: 'estado'
        });

        TipoBloque.hasMany(Bloque, {
            foreignKey: 'id_tipo_bloque',
            as: 'bloques'
        });

        Bloque.belongsTo(TipoBloque, {
            foreignKey: 'id_tipo_bloque',
            as: 'tipo'
        });

        FormaBloque.hasMany(TipoBloque, {
            foreignKey: 'id_forma_bloque',
            as: 'tipos_bloque'
        });

        TipoBloque.belongsTo(FormaBloque, {
            foreignKey: 'id_forma_bloque',
            as: 'forma'
        });


        Extension.belongsToMany(Categoria, {
            through: ExtensionCategoria,
            foreignKey: 'id_extension',
            otherKey: 'id_categoria',
            as: 'categorias'
        });

        Categoria.belongsToMany(Extension, {
            through: ExtensionCategoria,
            foreignKey: 'id_categoria',
            otherKey: 'id_extension',
            as: 'extensiones'
        });

        Bloque.hasMany(ParametroBloque, {
            foreignKey: 'id_bloque',
            as: 'parametros'
        });

        ParametroBloque.belongsTo(Bloque, {
            foreignKey: 'id_bloque',
            as: 'bloque'
        });

        TipoDato.hasMany(ParametroBloque, {
            foreignKey: 'id_tipo_dato',
            as: 'parametros'
        });

        ParametroBloque.belongsTo(TipoDato, {
            foreignKey: 'id_tipo_dato',
            as: 'tipo_dato'
        });
        ParametroBloque.hasMany(OpcionParametro, {
            foreignKey: 'id_parametro',
            as: 'opciones'
        });

        OpcionParametro.belongsTo(ParametroBloque, {
            foreignKey: 'id_parametro',
            as: 'parametro'
        });

        Bloque.belongsToMany(Placa, {
            through: BloquePlaca,
            foreignKey: 'id_bloque',
            otherKey: 'id_placa',
            as: 'placas'
        });

        Placa.belongsToMany(Bloque, {
            through: BloquePlaca,
            foreignKey: 'id_placa',
            otherKey: 'id_bloque',
            as: 'bloques'
        });

        Bloque.hasMany(ConexionBloque, {
            foreignKey: 'id_bloque',
            as: 'conexiones'
        });

        ConexionBloque.belongsTo(Bloque, {
            foreignKey: 'id_bloque',
            as: 'bloque'
        });


        TipoConexion.hasMany(ConexionBloque, {
            foreignKey: 'id_tipo_conexion',
            as: 'conexiones'
        });

        ConexionBloque.belongsTo(TipoConexion, {
            foreignKey: 'id_tipo_conexion',
            as: 'tipo_conexion'
        });

        BloquePlaca.belongsTo(Bloque, {
            foreignKey: "id_bloque",
            as: "bloque"
        });

        BloquePlaca.belongsTo(Placa, {
            foreignKey: "id_placa",
            as: "placa"
        });
        ExtensionCategoria.belongsTo(Extension, {
            foreignKey: "id_extension",
            as: "extension"
        });

        ExtensionCategoria.belongsTo(Categoria, {
            foreignKey: "id_categoria",
            as: "categoria"
        });

        Extension.hasMany(ExtensionCategoria, {
            foreignKey: "id_extension",
            as: "extension_categorias"
        });

        Categoria.hasMany(ExtensionCategoria, {
            foreignKey: "id_categoria",
            as: "extension_categorias"
        });

        
    }

    get sequelize() {
        return this._sequelize;
    }

    getModel(name) {
        return this.models[name];
    }
}

module.exports = new Database();
