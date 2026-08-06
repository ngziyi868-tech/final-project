// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmpU51VAuYd_fsm8zg2r7ssOB0t9UwU4k",
  authDomain: "recipe-tracker-project.firebaseapp.com",
  projectId: "recipe-tracker-project",
  storageBucket: "recipe-tracker-project.firebasestorage.app",
  messagingSenderId: "833490816878",
  appId: "1:833490816878:web:7a99318feb8f91b92f3b7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;