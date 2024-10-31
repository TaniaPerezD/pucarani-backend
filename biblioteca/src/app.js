const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const libroRoutes = require('./routes/libroRoutes'); 

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch(error => console.log('Error al sincronizar la base de datos:', error));


app.use('/api/libros', libroRoutes); // Agrega las rutas de libros

module.exports = app; 

// Obtener el puerto de las variables de entorno, o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});