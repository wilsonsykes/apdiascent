// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCihvW_l7rZJEaVeCXI38y0JFHeRVGQq0",
  authDomain: "apdi-ascent-auth.firebaseapp.com",
  projectId: "apdi-ascent-auth",
  storageBucket: "apdi-ascent-auth.appspot.com",
  messagingSenderId: "848020359636",
  appId: "1:848020359636:web:5eb1f32629efae30b2ee41",
  measurementId: "G-YTV1T7HKSQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.firebaseAuth = auth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
