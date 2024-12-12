const { Sequelize } = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.db);

const User = require('./User')(sequelize);
const Orden = require('./Orden')(sequelize);
const Pieza = require('./Pieza')(sequelize);

// Relaciones (opcional, según necesidad)
// Una Orden puede tener muchas Piezas utilizadas
// Pieza.belongsToMany(Orden, { through: 'OrdenPiezas' });
// Orden.belongsToMany(Pieza, { through: 'OrdenPiezas' });

// Sincronizar DB (solo dev)
sequelize.sync();

module.exports = { sequelize, User, Orden, Pieza };
