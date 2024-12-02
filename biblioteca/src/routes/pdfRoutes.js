const express = require('express');
const { uploadPdf, downloadPdf, listPdfs, deletePdf } = require('../controllers/pdfController');

console.log("se cargan las rutas de minio")

const router = express.Router();

router.post('/upload', uploadPdf); // Subir un PDF
router.get('/download/:fileName', downloadPdf); // Descargar un PDF
router.get('/list', listPdfs); // Listar PDFs
router.delete('/delete/:fileName', deletePdf); // Eliminar un PDF

module.exports = router;
