const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

// Registro de usuario
const register = async (req, res) => {
  const { nombre, password, email } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { nombre } }); // Cambiar 'username' por 'nombre'
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({ nombre, password_hash: hashedPassword, email });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error(error); // Esto va a imprimir el error completo en la consola
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};


// Inicio de sesión
const login = async (req, res) => {
  const { nombre, password } = req.body; // Recibe los datos del cuerpo de la solicitud

  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ where: { nombre } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña (compara con `password_hash`)
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera el token (usa el `nombre` y `rol` como payload si lo deseas)
    const payload = { id: user.id, nombre: user.nombre, rol: user.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responde con el token
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Obtener todos los usuarios registrados
const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const users = await User.findAll();

    // Si no hay usuarios, responde con un mensaje
    if (users.length === 0) {
      return res.status(404).json({ message: 'No hay usuarios registrados' });
    }

    // Responde con los usuarios encontrados
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { register, login, getAllUsers };
