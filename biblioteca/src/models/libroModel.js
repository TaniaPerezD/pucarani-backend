const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {
  idlibro: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_publicacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  portada: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: false,
  tableName: 'libros'
});

module.exports = Libro;
