const express = require('express');
const verifyToken = require('../middleware/auth.js');
const { createUploadUrl } = require('../services/storage.service.js');
const { createDownloadUrl } = require('../services/storage.service.js');
const db = require('../models');

class StorageRoutes {
  constructor(app) {
    this.router = express.Router();
    this.registerRoutes();
    app.use(['/storage', '/extensions/storage'], this.router);
  }

  registerRoutes() {
    this.router.post('/presign-upload', verifyToken, async (req, res) => {
      try {
        const { filename, contentType, folder } = req.body;
        const data = await createUploadUrl({ filename, contentType, folder });
        await db.getModel('Proyecto').create({
          id_usuario: req.user.id,
          nombre: req.body.projectName || filename.replace(/\.json$/i, ''),
          placa: req.body.board || 'esp32',
          storage_key: data.key,
        });
        return res.status(200).json({ ok: true, data });
      } catch (error) {
        const invalidRequest = /no está configurado|Solo se permiten|contentType debe/.test(error.message);
        return res.status(invalidRequest ? 400 : 500).json({
          ok: false,
          message: invalidRequest ? error.message : 'No se pudo preparar la subida',
        });
      }
    });

    this.router.get('/projects', verifyToken, async (req, res) => {
      const projects = await db.getModel('Proyecto').findAll({
        where: { id_usuario: req.user.id },
        order: [['updatedAt', 'DESC']],
        attributes: ['id_proyecto', 'nombre', 'placa', 'createdAt', 'updatedAt'],
      });
      return res.json({ ok: true, data: projects });
    });

    this.router.get('/projects/:id_proyecto/download', verifyToken, async (req, res) => {
      const project = await db.getModel('Proyecto').findOne({
        where: { id_proyecto: req.params.id_proyecto, id_usuario: req.user.id },
      });
      if (!project) return res.status(404).json({ ok: false, message: 'Proyecto no encontrado.' });
      const url = await createDownloadUrl(project.storage_key);
      return res.json({ ok: true, data: { url } });
    });
  }
}

module.exports = StorageRoutes;
