const express = require('express');
console.log('Rutas de devoluciones cargadas');
const {
    getAllDev,
    getDevById,
    createDev,
    updateDev,
    deleteDev
} = require('../controllers/devolucionesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/',authMiddleware, getAllDev);

// Ruta para obtener un libro por ID
router.get('/:id',authMiddleware, getDevById);

// Ruta para crear un nuevo libro
router.post('/',authMiddleware, createDev);

// Ruta para actualizar un libro
router.put('/:id',authMiddleware, updateDev);

// Ruta para eliminar un libro
router.delete('/:id',authMiddleware, deleteDev);

module.exports = router;
