const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const ordenesRoutes = require('./routes/ordenes');
const inventarioRoutes = require('./routes/inventario');
const reportesRoutes = require('./routes/reportes');

const app = express();

app.use(cors()); // Permite al frontend (dist) acceder a la API
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/ordenes', ordenesRoutes);
app.use('/inventario', inventarioRoutes);
app.use('/reportes', reportesRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});

