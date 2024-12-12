const jwt = require('jsonwebtoken');
const config = require('../config');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  if(!token) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user; // { id, username, role }
    next();
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if(req.user.role !== role) return res.sendStatus(403);
    next();
  };
}

module.exports = { authMiddleware, requireRole };
