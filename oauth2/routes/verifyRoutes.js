const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
console.log("rutas verify cargadas")

const secretKey = process.env.JWT_SECRET;

router.post('/verify', (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.json({ valid: false });
  }
});

module.exports = router;