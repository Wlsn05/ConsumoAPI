const express = require('express')
const axios = require('axios')
const router = express.Router()

//ruta de inicio
router.get('/', (req, res) => {
  res.render('index')
})
//Rutas para acceder a los artistas
router.get('/artists', async (req, res) => {
  try {
    const response = await axios.get('https://wilson-storeapi.onrender.com/artist')
    const artist = response.data
    console.log(artist)
    res.render('artists', { artist })
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al obtener los datos de los artistas")
  }
})
router.get('/addArtist', async (req, res) => {
  try {
      const albumsResponse = await axios.get('https://wilson-storeapi.onrender.com/albums');
      const albums = albumsResponse.data;
      res.render('addArtist', { albums }); // Renderiza la vista con el formulario
  } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).send('Error loading albums');
  }
})
/** 
router.post('/addArtist', async (req, res) => {
  try {
      const { id, name, nationality, albumId } = req.body;

      if (!id || !name || !nationality || !albumId) {
          return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      // Crear el objeto del artista
      const newArtist = {
          id,
          name,
          nationality,
          albums: [albumId] // Asegúrate de agregar el álbum aquí
      };

      const response = await axios.post('https://wilson-storeapi.onrender.com/artist', newArtist);

      if (response.status !== 200) {
          return res.status(500).json({ error: 'Error al agregar el artista en la API externa' });
      }

      const artistsResponse = await axios.get('https://wilson-storeapi.onrender.com/artist');
      const artists = artistsResponse.data;

      console.log(artists)

      res.json({ message: 'Artista agregado exitosamente', artists });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ha ocurrido un error al agregar el artista' });
  }
});*/

router.post('/addArtist', async (req, res) => {
  try {
    const { id, name, nationality, albumId } = req.body;

    if (!id || !name || !nationality || !albumId) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const response = await axios.post('https://wilson-storeapi.onrender.com/artist', {
      id,
      name,
      nationality,
      albumId
    });

    console.log(response)

    if (response.status !== 200) {
      return res.status(500).json({ error: 'Error al agregar el artista en la API externa' });
    }

    const artistsResponse = await axios.get('https://wilson-storeapi.onrender.com/artist');
    const artists = artistsResponse.data;

    res.json({ message: 'Artista agregado exitosamente', artists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al agregar el artista' });
  }
})
// Rutas para acceder a los albumes
router.get('/albumes', async (req, res) => {
  try {
    const response = await axios.get('https://wilson-storeapi.onrender.com/albums')
    const albums = response.data
    res.render('albumes', { albums })
  } catch (error) {
    console.log(error)
    res.status(500).send("Erros al obtener los albumes")
  }
})
router.get('/addData', async (req, res) => {
  try {

    const response = await axios.get('https://wilson-storeapi.onrender.com/albums');
    const albums = response.data

    res.render('addData', { albums });
  } catch (error) {
    console.error('Error al cargar los álbumes:', error);

    res.status(500).send('Error al cargar los datos');
  }
})

router.post('/addData', async (req, res) => {
  try {
    const { id, title, releaseDate, genre } = req.body;

    if (!id || !title || !releaseDate || !genre) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Realiza la solicitud a la API externa
    const response = await axios.post('https://wilson-storeapi.onrender.com/albums', { id, title, releaseDate, genre });

    // Verifica que la respuesta sea exitosa
    if (response.status !== 200) {
      return res.status(500).json({ error: 'Error al agregar el álbum en la API externa' });
    }

    // Obtiene la lista actual de álbumes
    const albumsResponse = await axios.get('https://wilson-storeapi.onrender.com/albums');
    const albums = albumsResponse.data;

    // Envía la respuesta al cliente
    res.json({ message: 'Álbum agregado exitosamente', albums });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al agregar el álbum' });
  }
})
// Ruta about us
router.get('/about', (req, res) => {
  res.render('about')
})

module.exports = router