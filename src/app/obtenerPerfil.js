// Selecciona el primer elemento en el documento HTML que tenga la clase "Main-Content"
const PERFIL_HTML = document.querySelector(".Main-Content");

// Exporta una función llamada MOSTRAR_PERFIL que toma un parámetro 'data'
export const OBTENER_PERFIL = (data) => {
  // Comprueba si la longitud de 'data' es mayor que cero
  if (data.length) {
    let html = ""; // Inicializa una cadena vacía llamada 'html'

    // Itera sobre cada documento en 'data'
    data.forEach((doc) => {
      const USUARIO = doc.data(); // Obtiene los datos del documento actual

      // Crea un fragmento de HTML usando los datos del documento actual
      const article = `
          <header>
          <h2>Bienvenido ${USUARIO.nombreUsuario} a Play No Wait</h2>
          <p>
          ${USUARIO.Correo}
          <br>
          ${USUARIO.Genero}
          <br>
          ${USUARIO.Ciudad}
          </p>
          </header>
          <span class="image"><img src="${USUARIO.Foto}" alt="" /></span>
          `;
      html += article; // Agrega el fragmento de HTML al acumulador 'html'
    });

    // Establece el contenido HTML del elemento seleccionado en el documento
    // con la clase 'posts_boda' como la cadena acumulada 'html'
    PERFIL_HTML.innerHTML = html;
  } else {
    // Si 'data' está vacío, establece el contenido HTML del elemento seleccionado
    // en el documento con la clase 'posts_boda' como un mensaje de error
    PERFIL_HTML.innerHTML = "<h1>No haz iniciado sesión</h1>";
  }
};
