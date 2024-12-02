const express = require('express');
const { uploadPortada, downloadPortada, listPortadas, deletePortada } = require('../controllers/portadasController');

console.log("se cargan las rutas de minio portadas")

const router = express.Router();

router.post('/upload', uploadPortada); // Subir un PDF
router.get('/download/:fileName', downloadPortada); // Descargar un PDF
router.get('/list', listPortadas); // Listar PDFs
router.delete('/delete/:fileName', deletePortada); // Eliminar un PDF

module.exports = router;
