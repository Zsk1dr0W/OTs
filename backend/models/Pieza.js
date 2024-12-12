const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pieza', {
    nombre: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precio: DataTypes.FLOAT
  });
};
