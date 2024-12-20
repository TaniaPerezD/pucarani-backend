console.log('Rutas de usuario cargadas');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para obtener todos los usuarios
router.get('/', authController.getAllUsers);

router.put('/:id/estado', authController.UpdateUser)

module.exports = router;
