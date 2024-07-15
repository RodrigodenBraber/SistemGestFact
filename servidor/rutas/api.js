const express = require('express');
const router = express.Router();
const dataControlador = require('../controladores/controladorDatos');

router.get('/data', dataControlador.getData);
router.post('/data', dataControlador.postData);

module.exports = router;
