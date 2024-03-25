//Aquí se importan las funciones que necesites del SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// Añade más productos de SDKs Firebase de este link
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCueU8tlHf6jXGiuVnun1p2fgriG2eIv90",
    authDomain: "play-no-wait.firebaseapp.com",
    databaseURL: "https://play-no-wait-default-rtdb.firebaseio.com",
    projectId: "play-no-wait",
    storageBucket: "play-no-wait.appspot.com",
    messagingSenderId: "555998746402",
    appId: "1:555998746402:web:ce796f15d9d28dcf5b777b",
    measurementId: "G-5LNCLZ6LP4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

//FUNCIONES PARA GENERAR NUEVOS PUBLICACIONES
export const GENERAR_USUARIO = (nombreUsuario, Genero, Ciudad, Correo) => addDoc(collection(db, 'Usuarios'), { nombreUsuario, Genero, Ciudad, Correo });
//FUNCIONES PARA ELIMINAR PRODUCTOS
export const ELIMINAR_USUARIO = (id) => deleteDoc(doc(db, 'Usuarios', id));

//FUNCIONES PARA EDITAR LOS VALORES DE LOS COMENTARIOS
export const EDITAR_USUARIO = (id) => getDoc(doc(db, 'Usuarios', id));

//FUNCIONES PARA GUARDAR LOS CAMBIOS DE LOS PRODUCTOS
export const ACTUALIZAR_USUARIO = (id, newFields) => updateDoc(doc(db, 'Usuarios', id), newFields);