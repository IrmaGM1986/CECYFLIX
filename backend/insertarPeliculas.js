const mongoose = require('mongoose');
require('dotenv').config();

const Pelicula = require('./models/Pelicula');

const peliculas = [
  {
    id: 21,
    titulo: "Batman: El Caballero de la Noche",
    descripcion: "Batman enfrenta al Joker en una batalla por Gotham.",
    genero: "Acción",
    poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: 22,
    titulo: "Back to the Future",
    descripcion: "Un viaje en el tiempo cambia el pasado y el futuro.",
    genero: "Ciencia Ficción",
    poster: "https://image.tmdb.org/t/p/original/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg"
  },
  {
    id: 23,
    titulo: "Blade Runner 2049",
    descripcion: "Un cazador de replicantes descubre un secreto oscuro.",
    genero: "Ciencia Ficción",
    poster: "https://image.tmdb.org/t/p/original/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg"
  },
  {
  id: 46,
  titulo: "Forrest Gump",
  descripcion: "Un hombre con un gran corazón vive momentos históricos de EE.UU.",
  genero: "Drama",
  poster: "https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
},
{
  id: 47,
  titulo: "The Avengers",
  descripcion: "Superhéroes se unen para salvar al mundo de una amenaza alienígena.",
  genero: "Superhéroes",
  poster: "https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
},
{
  id: 48,
  titulo: "Interstellar",
  descripcion: "Exploradores viajan a través de un agujero de gusano para salvar a la humanidad.",
  genero: "Ciencia Ficción",
  poster: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
},
{
  id: 49,
  titulo: "Titanic",
  descripcion: "Un trágico romance a bordo del famoso transatlántico hundido.",
  genero: "Romance",
  poster: "https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
},
{
  id: 50,
  titulo: "Inside Out",
  descripcion: "Las emociones de una niña guían su comportamiento tras una mudanza.",
  genero: "Animación",
  poster: "https://image.tmdb.org/t/p/original/lRHE0vzf3oYJrhbsHXjIkF4Tl5A.jpg"
},
{
  id: 51,
  titulo: "The Lion King",
  descripcion: "Un león joven lucha por reclamar su lugar como rey de la sabana.",
  genero: "Animación",
  poster: "https://image.tmdb.org/t/p/original/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg"
},
{
  id: 52,
  titulo: "Gladiator",
  descripcion: "Un general romano se convierte en gladiador para vengar a su familia.",
  genero: "Acción",
  poster: "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
},
{
  id: 53,
  titulo: "Shrek",
  descripcion: "Un ogro y sus amigos emprenden una aventura llena de humor y amor.",
  genero: "Comedia",
  poster: "https://image.tmdb.org/t/p/original/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg"
},
{
  id: 54,
  titulo: "The Notebook",
  descripcion: "Una historia de amor eterno contada a través del tiempo.",
  genero: "Romance",
  poster: "https://image.tmdb.org/t/p/original/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg"
},
{
  id: 55,
  titulo: "Avengers: Endgame",
  descripcion: "Los héroes restantes luchan por revertir el chasquido de Thanos.",
  genero: "Superhéroes",
  poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
},
{
  id: 56,
  titulo: "Toy Story",
  descripcion: "Los juguetes cobran vida cuando los humanos no están cerca.",
  genero: "Animación",
  poster: "https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"
},
{
  id: 57,
  titulo: "Parasite",
  descripcion: "Una familia pobre se infiltra en el hogar de una familia rica.",
  genero: "Drama",
  poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
},
{
  id: 58,
  titulo: "Deadpool",
  descripcion: "Un antihéroe sarcástico busca venganza con estilo y humor negro.",
  genero: "Acción",
  poster: "https://image.tmdb.org/t/p/original/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg"
},
{
  id: 59,
  titulo: "Joker",
  descripcion: "La transformación de un hombre marginado en el famoso villano.",
  genero: "Drama",
  poster: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
},
{
  id: 60,
  titulo: "Finding Nemo",
  descripcion: "Un pez busca incansablemente a su hijo perdido.",
  genero: "Animación",
  poster: "https://image.tmdb.org/t/p/original/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg"
},
{
  id: 61,
  titulo: "The Truman Show",
  descripcion: "Un hombre descubre que toda su vida es un show de televisión.",
  genero: "Ciencia Ficción",
  poster: "https://image.tmdb.org/t/p/original/vzX9HkJdYObpwLH2RUar6eJtQRv.jpg"
},
{
  id: 62,
  titulo: "A Beautiful Mind",
  descripcion: "La historia de un brillante matemático que lucha contra la esquizofrenia.",
  genero: "Biografía",
  poster: "https://image.tmdb.org/t/p/original/zwzWCmH72OSC9NA0ipoqw5Zjya8.jpg"
}

];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    //await Pelicula.deleteMany({});
    await Pelicula.insertMany(peliculas);
    console.log('🎬 Películas insertadas correctamente');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al conectar o insertar:', err);
  });
