// Importa las funciones 'signOut' y 'auth' desde las librerías de Firebase Authentication
// Importa la función 'showMessage' desde un archivo local llamado 'showMessage.js'
import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "./firebase.js"; // Importa el objeto 'auth' desde un archivo local llamado 'firebase.js'

// Obtiene una referencia al elemento HTML con el id 'logOut'
const logOut = document.querySelector("#logOut");

if (logOut) {
  // Agrega un evento de escucha al elemento 'logOut' que se activa cuando se hace clic en él
  logOut.addEventListener("click", async () => {
    try {
      // Realiza el cierre de sesión utilizando la función 'signOut' de Firebase Authentication
      await signOut(auth);

      // Muestra una alerta indicando que la sesión ha sido cerrada
      alert("Sesión cerrada correctamente");

      // Inicia un temporizador que redirige al usuario a 'index.html' después de 2 segundos
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } catch (error) {
      // Si se produce un error durante el cierre de sesión, muestra una alerta con el mensaje de error
      alert("Error al cerrar sesión: " + error.message);
    }
  });
}
