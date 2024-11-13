const express = require('express');
console.log('Rutas de prestamos cargadas');
const {
    getAllPrestamos,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
} = require('../controllers/prestamosController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

// Ruta para obtener todos los libros
router.get('/',authMiddleware, getAllPrestamos);

// Ruta para obtener un libro por ID
router.get('/:id',authMiddleware, getPrestamoById);

// Ruta para crear un nuevo libro
router.post('/',authMiddleware, createPrestamo);

// Ruta para actualizar un libro
router.put('/:id',authMiddleware, updatePrestamo);

// Ruta para eliminar un libro
router.delete('/:id',authMiddleware, deletePrestamo);

module.exports = router;
