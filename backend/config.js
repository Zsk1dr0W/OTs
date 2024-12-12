module.exports = {
    jwtSecret: 'clave-secreta-muy-segura', // Usar variable de entorno en producción
    jwtExpiresIn: '1h', 
    db: {
      dialect: 'sqlite',
      storage: './database.sqlite'
    }
  }
  