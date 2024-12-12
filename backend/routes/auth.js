const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt'); // asegurar que las contraseñas estén hasheadas

// Registro (ejemplo simple)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({username, password: hash, role});
    res.json(user);
  } catch(e) {
    res.status(400).json({error: e.message});
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: {username} });
  if(!user) return res.status(401).json({error: 'Usuario no encontrado'});
  
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(401).json({error: 'Contraseña incorrecta'});

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    role: user.role
  }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

  res.json({token, role: user.role});
});

module.exports = router;
