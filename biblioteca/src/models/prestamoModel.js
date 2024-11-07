const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prestamo = sequelize.define('Prestamo', {
  idprestamo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  libro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  estados_idestado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, 
{
  timestamps: false,
  tableName: 'prestamos'
});

module.exports = Prestamo;
