const express = require('express');
const {
    getAllPrestamos,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
} = require('../controllers/prestamosController');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', getAllPrestamos);

// Ruta para obtener un libro por ID
router.get('/:id', getPrestamoById);

// Ruta para crear un nuevo libro
router.post('/', createPrestamo);

// Ruta para actualizar un libro
router.put('/:id', updatePrestamo);

// Ruta para eliminar un libro
router.delete('/:id', deletePrestamo);

module.exports = router;
