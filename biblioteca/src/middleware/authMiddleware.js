// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    // Extraer el token después de "Bearer "
    const decoded = jwt.verify(token.split(' ')[1], 'tu_secreto_de_jwt');
    req.user = decoded; // Añade la información del usuario al request
    next(); // Permite el acceso a la siguiente función si el token es válido
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = verifyToken;
