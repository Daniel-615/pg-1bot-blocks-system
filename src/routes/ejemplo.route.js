const express = require('express');
const EjemploController = require('../controllers/ejemplo.controller');
const verifyToken = require('../middleware/auth.js');
const isExampleManager = require('../middleware/checkExampleManager.js');

class EjemploRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new EjemploController();
        this.registerRoutes();
        app.use('/extensions/examples', this.router);
    }

    registerRoutes() {
        this.router.get('/', verifyToken, this.controller.get.bind(this.controller));
        this.router.post('/', verifyToken, isExampleManager, this.controller.create.bind(this.controller));
        this.router.delete('/:id_ejemplo', verifyToken, isExampleManager, this.controller.remove.bind(this.controller));
    }
}

module.exports = EjemploRoutes;
