const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  // Obtener el encabezado Authorization con el token
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];  // Sacamos el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Realizar la solicitud al servidor OAuth para verificar el token
    const response = await axios.post('http://localhost:3000/api/token/verify', { token });

    if (response.data.valid) {
      req.user = response.data.user;  // Guardamos los datos del usuario en `req.user`
      next();  // Continuamos con la siguiente función/middleware
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying token' });
  }
};

module.exports = authMiddleware;
