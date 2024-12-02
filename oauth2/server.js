require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const verifyRoutes = require('./routes/verifyRoutes');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de los usuarios
const sequelize = require('./config/database'); // Conexión a la base de datos
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api/auth/', authRoutes);
// Rutas de usuarios (nuevo)
app.use('/api/user/', userRoutes); // Añades las rutas de usuario
// Rutas de verificacion token (nuevo)
app.use('/api/token/', verifyRoutes); // Añades las rutas de usuario

// Sincronización de la base de datos y arranque del servidor
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
