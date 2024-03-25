import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { loginCheck } from "./app/estadoDelUsuario.js";
import { auth } from './app/firebase.js';
import './app/RegistroUsuarios.js'

onAuthStateChanged(auth, async (user) => {
    console.log(user);
    loginCheck(user);
    if (user) {
        window.location.href = "index.html";
    }
})