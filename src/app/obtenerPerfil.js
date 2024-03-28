import { ACTUALIZAR_USUARIO, EDITAR_USUARIO, ELIMINAR_USUARIO } from "./firebase.js";
import { auth } from "./firebase.js"; // Importa el objeto 'auth' desde un archivo local llamado 'firebase.js'

// Selecciona el primer elemento en el documento HTML que tenga la clase "Main-Content"
const PERFIL_HTML = document.querySelector(".Main-content");
const EDITAR_PERFIL_MODAL = document.querySelector("#editarPerfilModal");
let id = ''; // Variable para almacenar el ID del usuario seleccionado

// Exporta una función llamada OBTENER_PERFIL que toma dos parámetros: 'data' y 'user'
export const OBTENER_PERFIL = (data, user) => {
  // Verifica si el elemento con la clase "Main-content" existe en el documento HTML
  if (!PERFIL_HTML) {
    console.error("El elemento .Main-content no se encontró en el documento HTML");
    return;
  }

  // Verifica si el elemento con el ID "editarPerfilModal" existe en el documento HTML
  if (!EDITAR_PERFIL_MODAL) {
    console.error("El elemento #editarPerfilModal no se encontró en el documento HTML");
    return;
  }

  // Comprueba si el usuario está autenticado
  if (user) {
    // Filtra los datos para encontrar la información del usuario actualmente autenticado
    const usuarioActual = data.find(doc => doc.data().Correo === user.email);

    if (usuarioActual) {
      const USUARIO = usuarioActual.data(); // Obtiene los datos del usuario actual

      // Crea un fragmento de HTML usando los datos del usuario actual, incluyendo el botón para eliminar el perfil
      const header = `
      <header>
        <span class="image">
          <img src="${USUARIO.Foto}" alt="user-icon" />
        </span>
        
        <h2 style="color: #fff;">
          Bienvenido ${USUARIO.nombreUsuario} a Play No Wait
        </h2>

        <p>
          Correo: ${USUARIO.Correo}
        </p>

        <p>
          Género: ${USUARIO.Genero}
        </p>

        <p>
          Ciudad: ${USUARIO.Ciudad}
        </p>

        <button class="button primary Editar"
          data-bs-toggle="modal" 
          data-bs-target="#editarPerfilModal"
          data-id="${usuarioActual.id}">
          Editar Perfil
        </button>
        
        <button class="button danger Eliminar"
          data-id="${usuarioActual.id}">
          Eliminar Perfil
        </button>
      </header>
      `;

      // Establece el contenido HTML del elemento seleccionado en el documento
      // con la clase 'content' como el fragmento de HTML creado
      PERFIL_HTML.innerHTML = header;

      // Agrega un evento de clic a cada botón 'Editar'
      const BOTON_EDITAR = PERFIL_HTML.querySelectorAll('.Editar');
      BOTON_EDITAR.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          // Obtiene el ID del usuario desde el atributo 'data-id' del botón
          const userId = e.currentTarget.dataset.id; // Usamos 'currentTarget' en lugar de 'target'
          // Obtiene los datos del usuario seleccionado para editar
          const doc = await EDITAR_USUARIO(userId);
          const editar = doc.data();
          // Obtiene los elementos del formulario
          const GENERO = EDITAR_PERFIL_MODAL.querySelector('#Genero');
          const NOMBRE_USUARIO = EDITAR_PERFIL_MODAL.querySelector('#NombreUsuario');
          const CIUDAD = EDITAR_PERFIL_MODAL.querySelector('#Ciudad');

          // Llena los campos del formulario con los datos del usuario seleccionado
          GENERO.value = editar.Genero;
          NOMBRE_USUARIO.value = editar.nombreUsuario;
          CIUDAD.value = editar.Ciudad;
          id = doc.id; // Guarda el ID del documento seleccionado
        });
      });

      // Agrega un evento de clic a cada botón 'Eliminar'
      const BOTON_ELIMINAR = PERFIL_HTML.querySelectorAll('.Eliminar');
      BOTON_ELIMINAR.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          // Obtiene el ID del usuario desde el atributo 'data-id' del botón
          const userId = e.currentTarget.dataset.id;
          try {
            // Solicita confirmación al usuario antes de eliminar el perfil
            const confirmacion = confirm("¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.");
            if (confirmacion) {
              // Elimina el perfil de Firebase Authentication
              await auth.currentUser.delete();

              // Elimina el perfil de la base de datos utilizando la función 'ELIMINAR_USUARIO'
              await ELIMINAR_USUARIO(userId);

              // Muestra una alerta indicando que el perfil ha sido eliminado
              alert("Perfil eliminado");

              // Redirige al usuario a 'index.html' después de 2 segundos
              setTimeout(() => {
                window.location.href = "index.html";
              }, 2000);
            } else {
              // Muestra un mensaje indicando que la eliminación del perfil ha sido cancelada
              alert("Eliminación de perfil cancelada");
            }
          } catch (error) {
            // Muestra una alerta en caso de error
            alert("Error al eliminar el perfil: " + error.message);
          }
        });
      });

      // Agrega un evento de envío al formulario para actualizar el usuario
      EDITAR_PERFIL_MODAL.querySelector('.editarPerfilForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
          // Obtiene los elementos del formulario
          const GENERO = EDITAR_PERFIL_MODAL.querySelector('#Genero');
          const NOMBRE_USUARIO = EDITAR_PERFIL_MODAL.querySelector('#NombreUsuario');
          const CIUDAD = EDITAR_PERFIL_MODAL.querySelector('#Ciudad');

          // Actualiza el usuario utilizando la función 'ACTUALIZAR_USUARIO'
          await ACTUALIZAR_USUARIO(id, { Genero: GENERO.value, nombreUsuario: NOMBRE_USUARIO.value, Ciudad: CIUDAD.value });
          // Muestra una alerta indicando que el usuario ha sido actualizado
          alert("Usuario actualizado, recargue para visualizar los cambios");

          // Oculta el modal de edición después de actualizar el usuario
          const modal = bootstrap.Modal.getInstance(EDITAR_PERFIL_MODAL);
          modal.hide();
        } catch (error) {
          // Muestra una alerta en caso de error
          alert("Error al actualizar el usuario: " + error.message);
        }
      });


    } else {
      // Si no se encuentra la información del usuario actual, muestra un mensaje de error
      PERFIL_HTML.innerHTML = "<h1>No se encontró la información del usuario</h1>";
    }
  } else {
    // Si el usuario no está autenticado, muestra un mensaje de error
    PERFIL_HTML.innerHTML = "<h1>No has iniciado sesión</h1>";
  }
};
