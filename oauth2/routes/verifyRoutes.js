const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
console.log("rutas verify cargadas")

const secretKey = process.env.JWT_SECRET;

router.post('/verify', (req, res) => {
    // Obtener el token del cuerpo de la solicitud
    const { token } = req.body;  // Ahora lo recibimos desde el cuerpo, no desde los encabezados
    if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
    }
  
    try {
        // Verificar el token
        const decoded = jwt.verify(token, secretKey);
        res.json({ valid: true, user: decoded });
    } catch (err) {
        res.json({ valid: false });
    }
});


module.exports = router;