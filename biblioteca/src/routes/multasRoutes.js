const express = require('express');
console.log('Rutas de multas cargadas');
const {
    getAllMultas,
    getMultasById,
    createMultas,
    updateMultas,
    deleteMultas
} = require('../controllers/multasController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/',authMiddleware, getAllMultas);

// Ruta para obtener un libro por ID
router.get('/:id',authMiddleware, getMultasById);

// Ruta para crear un nuevo libro
router.post('/',authMiddleware, createMultas);

// Ruta para actualizar un libro
router.put('/:id',authMiddleware, updateMultas);

// Ruta para eliminar un libro
router.delete('/:id',authMiddleware, deleteMultas);

module.exports = router;
