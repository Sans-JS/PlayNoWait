// Selecciona el primer elemento en el documento HTML que tenga la clase "Main-Content"
const PERFIL_HTML = document.querySelector(".content");

// Exporta una función llamada MOSTRAR_PERFIL que toma dos parámetros: 'data' y 'user'
export const OBTENER_PERFIL = (data, user) => {
  // Comprueba si el usuario está autenticado
  if (user) {
    // Filtra los datos para encontrar la información del usuario actualmente autenticado
    const usuarioActual = data.find(doc => doc.data().Correo === user.email);

    if (usuarioActual) {
      const USUARIO = usuarioActual.data(); // Obtiene los datos del usuario actual

      // Crea un fragmento de HTML usando los datos del usuario actual
      const header = `
          <header>
            <span class="image">
              <img src="${USUARIO.Foto}" alt="user-icon" />
            </span>
            
            <h2>
              Bienvenido ${USUARIO.nombreUsuario} a Play No Wait
            </h2>

            <p>
              Correo: ${USUARIO.Correo}
            </p>

            <p>
            Genero: ${USUARIO.Genero}
            </p>

            <p>
              Ciudad: ${USUARIO.Ciudad}
            </p>

          </header>
          
          `;
      // Establece el contenido HTML del elemento seleccionado en el documento
      // con la clase 'content' como el fragmento de HTML creado
      PERFIL_HTML.innerHTML = header;
    } else {
      // Si no se encuentra la información del usuario actual, muestra un mensaje de error
      PERFIL_HTML.innerHTML = "<h1>No se encontró la información del usuario</h1>";
    }
  } else {
    // Si el usuario no está autenticado, muestra un mensaje de error
    PERFIL_HTML.innerHTML = "<h1>No has iniciado sesión</h1>";
  }
};
