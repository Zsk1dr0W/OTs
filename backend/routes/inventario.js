const express = require('express');
const router = express.Router();
const { Pieza } = require('../models');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(requireRole('admin')); // Solo admin accede

// Crear pieza
router.post('/', async (req, res) => {
  const pieza = await Pieza.create(req.body);
  res.json(pieza);
});

// Listar piezas
router.get('/', async (req, res) => {
  const piezas = await Pieza.findAll();
  res.json(piezas);
});

// Actualizar pieza
router.put('/:id', async (req, res) => {
  const pieza = await Pieza.findByPk(req.params.id);
  if(!pieza) return res.status(404).json({error: 'Pieza no encontrada'});
  await pieza.update(req.body);
  res.json(pieza);
});

// Eliminar pieza
router.delete('/:id', async (req, res) => {
  const pieza = await Pieza.findByPk(req.params.id);
  if(!pieza) return res.status(404).json({error: 'Pieza no encontrada'});
  await pieza.destroy();
  res.json({message: 'Pieza eliminada'});
});

module.exports = router;
