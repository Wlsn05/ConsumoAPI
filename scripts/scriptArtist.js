document.addEventListener('DOMContentLoaded', () => {
  const artistForm = document.getElementById('artistForm');

  artistForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const artistId = document.getElementById('id').value;
    const artistName = document.getElementById('name').value;
    const artistNationality = document.getElementById('nationality').value;
    const albumId = document.getElementById('album').value; // Obtiene el ID del álbum seleccionado

    try {
      const response = await fetch('/addArtist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: artistId,
          name: artistName,
          nationality: artistNationality,
          albumId // Envía el ID del álbum
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Artista agregado:', data);
        document.getElementById('message').innerText = 'Artista agregado exitosamente.';
      } else {
        const errorData = await response.json();
        console.log('Error al agregar artista:', errorData.error);
        document.getElementById('message').innerText = 'Error al agregar artista: ' + errorData.error;
      }
    } catch (error) {
      console.log('Ha ocurrido un error al enviar la solicitud:', error);
      document.getElementById('message').innerText = 'Error al enviar la solicitud.';
    }
  });
});