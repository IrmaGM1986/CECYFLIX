const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
console.log("CLAVE IA:", process.env.OPENROUTER_API_KEY);


const app = express();
const PORT = 4000;

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

// Ya conectaste a MongoDB arriba...

const peliculasRouter = require('./routes/peliculas'); // 👈 Esta línea importa el router
app.use('/api/peliculas', peliculasRouter);            // 👈 Esta línea monta la ruta


// Modelo de Película
const Pelicula = require('./models/Pelicula');

app.get('/api/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    console.error('❌ Error al obtener películas:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener películas' });
  }
});

// Ruta POST para procesar búsqueda por descripción con IA
app.post('/api/recomendaciones', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const recomendacion = response.data.choices[0].message.content;
    res.json({ recomendacion });
  } catch (error) {
    console.error('❌ Error en la API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error en el servidor proxy' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
