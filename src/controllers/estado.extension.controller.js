class EstadoExtensionController {
    constructor() {
        this.service = require("../services/estado.extension.service");
    }

    async get(req, res) {
        const result = await this.service.get();
        return res.status(result.ok ? 200 : 500).json(result);
    }
}

module.exports = EstadoExtensionController;
