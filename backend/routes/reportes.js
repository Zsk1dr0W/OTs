const express = require('express');
const router = express.Router();
const { Orden } = require('../models');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(requireRole('admin'));

router.get('/estadisticas', async (req, res) => {
  const ordenes = await Orden.findAll();
  const totalOrdenes = ordenes.length;
  const entregadas = ordenes.filter(o => o.estado === "Entregado").length;
  const ingresos = ordenes
    .filter(o => o.estado === "Entregado")
    .reduce((acc, o) => acc + (o.costo || 0), 0);

  res.json({
    totalOrdenes,
    entregadas,
    ingresos
  });
});

module.exports = router;
