const express = require('express');
const router = express.Router();
const { Orden } = require('../models');
const { authMiddleware } = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Crear orden
router.post('/', async (req, res) => {
  const nuevaOrden = await Orden.create(req.body);
  res.json(nuevaOrden);
});

// Listar todas las órdenes
router.get('/', async (req, res) => {
  const ordenes = await Orden.findAll();
  res.json(ordenes);
});

// Obtener detalle de una orden
router.get('/:id', async (req, res) => {
  const orden = await Orden.findByPk(req.params.id);
  if(!orden) return res.status(404).json({error: 'Orden no encontrada'});
  res.json(orden);
});

// Actualizar una orden
router.put('/:id', async (req, res) => {
  const orden = await Orden.findByPk(req.params.id);
  if(!orden) return res.status(404).json({error: 'Orden no encontrada'});

  await orden.update(req.body);
  res.json(orden);
});

// Eliminar una orden (opcional)
router.delete('/:id', async (req, res) => {
  const orden = await Orden.findByPk(req.params.id);
  if(!orden) return res.status(404).json({error: 'Orden no encontrada'});

  await orden.destroy();
  res.json({message: 'Orden eliminada'});
});

module.exports = router;
