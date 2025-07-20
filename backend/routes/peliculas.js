const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    
    peliculas.forEach(p => {
      if (!p.titulo || !p.genero) {
        console.warn('⚠️ Película con campos faltantes:', p);
      }
    });
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener películas' });
  }
});

module.exports = router;
