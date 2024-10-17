document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('button[type="submit"]')
  const albumForm = document.getElementById('albumForm')
  
  if (!submitButton || !albumForm) {
    console.error('No se encontraron los elementos necesarios en el DOM')
    return;
  }

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const albumId = document.getElementById('id').value;
    const albumTitle = document.getElementById('title').value;
    const albumReleaseDate = document.getElementById('releaseDate').value;
    const albumGenre = document.getElementById('genero').value;

    // Validar que no estén vacíos
    if (!albumId || !albumTitle || !albumReleaseDate || !albumGenre) {
      document.getElementById('message').innerText = 'Por favor, completa todos los campos.';
      return;
    }

    try {
      const response = await fetch('/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: albumId, title: albumTitle, releaseDate: albumReleaseDate, genre: albumGenre }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Álbum agregado:', data);
        document.getElementById('message').innerText = 'Álbum agregado exitosamente.';
      } else {
        const errorData = await response.json();
        console.log('Error al agregar álbum:', errorData.error);
        document.getElementById('message').innerText = 'Error al agregar álbum: ' + errorData.error;
      }
    } catch (error) {
      console.log('Ha ocurrido un error al enviar la solicitud:', error);
      document.getElementById('message').innerText = 'Error al enviar la solicitud.';
    }
  })
})