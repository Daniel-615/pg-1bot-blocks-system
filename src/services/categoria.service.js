const db = require("../models");
const CategoriaModel = db.getModel("Categoria")
class CategoriaService {
    async get() {
        try {
            const categoria = await CategoriaModel.findAll();
            if (!categoria) {
                return {
                    ok: false,
                    message: "No existe ninguna categoria",
                }
            }
            return {
                ok: true,
                message: "Categorias encontradas",
                data: categoria
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar la categoria"
            }
        }
    }
    async getById(id_categoria) {
        try {
            const categoria = await CategoriaModel.findOne({
                where: id_categoria
            })
            if (!categoria) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la categoria"
                }
            }
            return {
                ok: true,
                message: "Categorias encontradas",
                data: categoria
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener la categoría"
            }
        }
    }
    async create(nombre, descripcion) {
        try {
            const categoria = await CategoriaModel.create({
                nombre,
                descripcion
            })
            return {
                ok: true,
                message: "Categoria creada exitosamente",
                data: categoria
            }
        } catch (err) {
            console.error("Error al crear la categoria: ", err)
            return {
                ok: false,
                message: "Error al crear la categoria"
            }
        }
    }
    async put(id_categoria, nombre, descripcion) {
        try {
            const categoria = await CategoriaModel.findByPk(id_categoria);
            if (!categoria) {
                return {
                    ok: false,
                    message: "No se encontró la categoria"
                }
            }
            const new_categoria = await categoria.update({
                nombre,
                descripcion
            })
            if (!new_categoria) {
                return {
                    ok: false,
                    message: "Error al actualizar la categoria"
                }
            }
            return {
                ok: true,
                message: "Categoria actualizada exitosamente",
                data: new_categoria
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al actualizar la categoria"
            }
        }
    }

}
module.exports = new CategoriaService();