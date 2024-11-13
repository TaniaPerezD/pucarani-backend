const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
console.log("rutas verify cargadas")

const secretKey = process.env.JWT_SECRET;

router.post('/verify', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Obtener el token del encabezado Authorization
    if (!token) {
      return res.status(401).json({ valid: false, message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      res.json({ valid: true, user: decoded });
    } catch (err) {
      res.json({ valid: false });
    }
  });

module.exports = router;