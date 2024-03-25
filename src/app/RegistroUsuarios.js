// Importamos la función createUserWithEmailAndPassword de Firebase para crear un usuario con correo electrónico y contraseña
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// Importamos el objeto 'auth' desde firebase.js que contiene la instancia de autenticación de Firebase
import { GENERAR_USUARIO, auth } from './firebase.js';
// Importamos la función showMessage desde el archivo showMessage.js para mostrar mensajes en la interfaz de usuario

// Seleccionamos el formulario de registro en el DOM
const FORMULARIO_REGISTRO = document.querySelector('#Formulario-Registro');

// Agregamos un evento de escucha para el envío del formulario de registro
FORMULARIO_REGISTRO.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que el formulario se envíe de forma tradicional

    // Obtenemos el valor del correo electrónico y la contraseña y el resto de datos ingresados por el usuario
    const EMAIL = FORMULARIO_REGISTRO['Correo'].value.trim();
    const PASSWORD = FORMULARIO_REGISTRO['Contraseña'].value.trim();
    const USUARIO = FORMULARIO_REGISTRO['Usuario'].value.trim();
    const GENERO = FORMULARIO_REGISTRO['Genero'].value.trim();
    const CIUDAD = FORMULARIO_REGISTRO['Ciudad'].value.trim();

    try {
        // Intentamos crear un usuario con el correo electrónico y la contraseña proporcionados
        if (EMAIL === "" || PASSWORD === "" || USUARIO === "" || GENERO === "" || CIUDAD === "") {
            throw new Error('Completa todos los campos por favor');
        }
        const userCredentials = await createUserWithEmailAndPassword(auth, EMAIL, PASSWORD);
        await GENERAR_USUARIO(USUARIO, GENERO, CIUDAD, EMAIL);

        // Mostramos un mensaje de bienvenida en la interfaz de usuario
        console.log("Bienvenido " + userCredentials.user.email + "USUARIO CREADO EXITOSAMENTE");
    } catch (error) {
        // Si se produce un error durante la creación del usuario, manejamos diferentes casos de error
        if (error.code === 'auth/email-already-in-use') {
            console.log('El correo ya está en uso', "error");
        } else {
            console.FORMULARIO_REGISTRO('Algo salió mal :(', "error");
        }
    }
});

// Función para validar el formato del correo electrónico utilizando una expresión regular
function isValidEmail(EMAIL) {
    const EMAILRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return EMAILRegex.test(EMAIL);
}

// Función para validar la longitud de la contraseña
function isValidPassword(PASSWORD) {
    return PASSWORD.length >= 6;
}
