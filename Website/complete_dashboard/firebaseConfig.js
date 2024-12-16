// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIn1Mz_L1eOncY7j1wnJAvL7Yoz-lgQJA",
  authDomain: "continual-mind-399223.firebaseapp.com",
  projectId: "continual-mind-399223",
  storageBucket: "continual-mind-399223.firebasestorage.app",
  messagingSenderId: "1081264808841",
  appId: "1:1081264808841:web:3d8c08fa2c7b0a477bf758",
  measurementId: "G-6T1BY6EZJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);