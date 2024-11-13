const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verificar el token con el servidor OAuth 2.0
    const response = await axios.post('http://localhost:3000/api/token/verify', { token });
    if (response.data.valid) {
      req.user = response.data.user;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying token' });
  }
};

module.exports = authMiddleware;
