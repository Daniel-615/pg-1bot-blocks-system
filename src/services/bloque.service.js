const db = require("../models");

const Bloque = db.getModel("Bloque");
const TipoBloque = db.getModel("TipoBloque");
const Extension = db.getModel("Extension");
const EstadoBloque = db.getModel("EstadoBloque");

class BloqueService {
    async get() {
        try {
            const bloques = await Bloque.findAll({
                include: [
                    {
                        model: Extension,
                        as: "extension"
                    },
                    {
                        model: EstadoBloque,
                        as: "estado"
                    },
                    {
                        model: TipoBloque,
                        as: "tipo",
                        include: [
                            {
                                model: db.getModel("FormaBloque"),
                                as: "forma"
                            }
                        ]
                    },
                    {
                        model: db.getModel("ParametroBloque"),
                        as: "parametros",
                        include: [
                            {
                                model: db.getModel("TipoDato"),
                                as: "tipo_dato"
                            },
                            {
                                model: db.getModel("OpcionParametro"),
                                as: "opciones"
                            }
                        ]
                    },
                    {
                        model: db.getModel("Placa"),
                        as: "placas",
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: db.getModel("ConexionBloque"),
                        as: "conexiones",
                        include: [
                            {
                                model: db.getModel("TipoConexion"),
                                as: "tipo_conexion"
                            }
                        ]
                    }
                ]
            });

            return {
                ok: true,
                message: "Bloques obtenidos exitosamente",
                data: bloques
            };

        } catch (err) {
            console.error("Error al obtener bloques:", err);

            return {
                ok: false,
                message: "Error al obtener los bloques"
            };
        }
    }
    async getById(id_bloque) {
        try {
            const bloque = await Bloque.findOne({
                where: id_bloque
            })
            if (!bloque) {
                return {
                    ok: false,
                    message: "No se pudo encontrar el bloque"
                }
            }
            return {
                ok: true,
                message: "Bloque encontrado",
                data: bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el bloque"
            }
        }
    }
    async create(nombre, descripcion, id_tipo_bloque, id_extension, id_estado_bloque, orden) {
        try {
            const tipoBloque = await TipoBloque.findByPk(id_tipo_bloque);

            if (!tipoBloque) {
                return {
                    ok: false,
                    message: "El tipo de bloque no existe"
                };
            }

            const extension = await Extension.findByPk(id_extension);

            if (!extension) {
                return {
                    ok: false,
                    message: "La extensión no existe"
                };
            }

            const estadoBloque = await EstadoBloque.findByPk(id_estado_bloque);

            if (!estadoBloque) {
                return {
                    ok: false,
                    message: "El estado del bloque no existe"
                };
            }

            const bloque = await Bloque.create({
                nombre,
                descripcion,
                id_tipo_bloque,
                id_extension,
                id_estado_bloque,
                orden
            });

            return {
                ok: true,
                message: "Bloque creado exitosamente",
                data: bloque
            };

        } catch (err) {
            console.error("Error al crear bloque:", err);

            return {
                ok: false,
                message: "Error al crear el bloque",
            };
        }
    }
    async put(id_bloque, descripcion, nombre, orden) {
        try {
            const bloque = await Bloque.findByPk(id_bloque);
            if (!bloque) {
                return {
                    ok: false,
                    message: "No se pudo encontrar el bloque"
                }
            }
            const new_bloque = await bloque.update({
                descripcion,
                nombre,
                orden
            })
            if (!new_bloque) {
                return {
                    ok: false,
                    message: "Error al actualizar el bloque"
                }
            }
            return {
                ok: true,
                message: "Bloque actualizado exitosamente",
                data: new_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al actualizar el bloque"
            }
        }
    }
}

module.exports = new BloqueService();