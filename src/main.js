import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { OBTENER_PERFIL } from "./app/obtenerPerfil.js";
import { loginCheck } from "./app/estadoDelUsuario.js";
import { auth, db } from "./app/firebase.js";
import "./app/registroUsuarios.js";
import "./app/iniciarSesion.js";
import "./app/cerrarSesion.js";

onAuthStateChanged(auth, async (user) => {
  loginCheck(user);
  if (user) {
    console.log(user.email);
    const querySnapshot = await getDocs(collection(db, "Usuarios"));
    OBTENER_PERFIL(querySnapshot.docs, user);
  }
});
