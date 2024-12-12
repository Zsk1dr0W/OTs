const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Orden', {
    cliente: DataTypes.STRING,
    equipo: DataTypes.STRING,
    falla: DataTypes.TEXT,
    costo: DataTypes.FLOAT,
    fechaIngreso: DataTypes.DATE,
    piezas: DataTypes.TEXT, // podrían ser JSON serialized
    estado: DataTypes.STRING,
    comentarios: DataTypes.TEXT
  });
};
