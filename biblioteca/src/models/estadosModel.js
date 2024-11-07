const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estado = sequelize.define('Estado', {
  idestado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, 
{
  timestamps: false,
  tableName: 'estados'
});

module.exports = Estado;
