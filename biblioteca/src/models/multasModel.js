const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Multas = sequelize.define('Multas', {
  idmulta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  multa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prestamo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, 
{
  timestamps: false,
  tableName: 'multas'
});

module.exports = Multas;
