const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 4000;

// ✅ Imprime la clave justo después de cargar el entorno
console.log("🔑 CLAVE IA (inicio):", process.env.OPENROUTER_API_KEY || 'No definida');

// Middlewares
const corsOptions = {
  origin: 'https://recomendaciones-frontend-bilm.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas de películas
const peliculasRouter = require('./routes/peliculas');
app.use('/api/peliculas', peliculasRouter);

// Modelo de Película
const Pelicula = require('./models/Pelicula');

// Obtener todas las películas
app.get('/api/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    console.error('❌ Error al obtener películas:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener películas' });
  }
});

// Ruta con IA actualizada con modelo GPT-3.5
app.post('/api/recomendaciones', async (req, res) => {
  const { prompt } = req.body;

  const headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  };

  // ✅ Verifica que el header está armado correctamente
  console.log("📤 Headers enviados a OpenRouter:", headers);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      { headers }
    );

    const recomendacion = response.data.choices[0].message.content;
    res.json({ recomendacion });
  } catch (error) {
    console.error('❌ Error en la API:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || 'Error en el servidor proxy' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

