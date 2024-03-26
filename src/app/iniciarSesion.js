// Importamos la función signInWithEmailAndPassword de Firebase para el inicio de sesión por correo electrónico y contraseña
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// Importamos el objeto 'auth' desde firebase.js que contiene la instancia de autenticación de Firebase
import { auth } from "./firebase.js";

// Seleccionamos el formulario de inicio de sesión en el DOM
const FORMULARIO_REGISTRO = document.querySelector("#Formulario-Registro");

if (FORMULARIO_REGISTRO) {
  // Agregamos un evento de escucha para el envío del formulario de inicio de sesión
  FORMULARIO_REGISTRO.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitamos que el formulario se envíe de forma tradicional

    // Obtenemos el valor del correo electrónico y la contraseña ingresados por el usuario
    const EMAIL = FORMULARIO_REGISTRO["Correo"].value.trim();
    const PASSWORD = FORMULARIO_REGISTRO["Contraseña"].value.trim();

    try {
      // Intentamos iniciar sesión con el correo electrónico y la contraseña proporcionados
      const credentials = await signInWithEmailAndPassword(
        auth,
        EMAIL,
        PASSWORD
      );

      // Si el inicio de sesión es exitoso, redirigimos al usuario a la página de administrador
      window.location.href = "index.html";

      // Mostramos un mensaje de bienvenida en la interfaz de usuario
      console.log("Welcome");
    } catch (error) {
      // Si se produce un error durante el inicio de sesión, manejamos diferentes casos de error
      if (error.code === "auth/wrong-password") {
        console.log("Correo o contraseña incorrecta, revisa de nuevo", "error");
      } else if (error.code == "auth/user-not-found") {
        console.log("El usuario no existe :(", "error");
      } else {
        console.log("Algo salió mal, intenta de nuevo :(", "error");
      }
    }
  });
}
