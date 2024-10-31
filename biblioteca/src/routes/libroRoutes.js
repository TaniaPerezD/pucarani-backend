const express = require('express');
const {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libroController');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', getAllLibros);

// Ruta para obtener un libro por ID
router.get('/:id', getLibroById);

// Ruta para crear un nuevo libro
router.post('/', createLibro);

// Ruta para actualizar un libro
router.put('/:id', updateLibro);

// Ruta para eliminar un libro
router.delete('/:id', deleteLibro);

module.exports = router;
