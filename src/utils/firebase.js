import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBp2FBsd9NKtHrfP5b3rSL89eozoYrCaH8",
  authDomain: "react-task-4.firebaseapp.com",
  projectId: "react-task-4",
  storageBucket: "react-task-4.firebasestorage.app",
  messagingSenderId: "1047261722473",
  appId: "1:1047261722473:web:541669b26f81043c6b2ff8",
  measurementId: "G-DG7SWLQXHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};