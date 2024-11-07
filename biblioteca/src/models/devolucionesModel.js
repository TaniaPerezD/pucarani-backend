const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Devoluciones = sequelize.define('Devoluciones', {
  iddevolucion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  prestamo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, 
{
  timestamps: false,
  tableName: 'devoluciones'
});

module.exports = Devoluciones;
