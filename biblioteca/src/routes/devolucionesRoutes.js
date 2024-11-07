const express = require('express');
console.log('Rutas de devoluciones cargadas');
const {
    getAllDev,
    getDevById,
    createDev,
    updateDev,
    deleteDev
} = require('../controllers/devolucionesController');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', getAllDev);

// Ruta para obtener un libro por ID
router.get('/:id', getDevById);

// Ruta para crear un nuevo libro
router.post('/', createDev);

// Ruta para actualizar un libro
router.put('/:id', updateDev);

// Ruta para eliminar un libro
router.delete('/:id', deleteDev);

module.exports = router;
