const express = require('express');
console.log('Rutas de libros cargadas');
const {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libroController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', getAllLibros);

// Ruta para obtener un libro por ID
router.get('/:id', getLibroById);

//Funciones admin

// Ruta para crear un nuevo libro
router.post('/',authMiddleware, createLibro);

// Ruta para actualizar un libro
router.put('/:id',authMiddleware, updateLibro);

// Ruta para eliminar un libro
router.delete('/:id',authMiddleware, deleteLibro);

module.exports = router;
