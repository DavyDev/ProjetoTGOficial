// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaRfkWKwZ8GJOVw6vMeyO739oLZIBJ4pE",
  authDomain: "uploadas-deckcafe.firebaseapp.com",
  projectId: "uploadas-deckcafe",
  storageBucket: "uploadas-deckcafe.appspot.com",
  messagingSenderId: "331967395592",
  appId: "1:331967395592:web:f4a369ee91a8e1d63a1ebd",
  measurementId: "G-7ZFHP8TCZW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storageFirebase = getStorage(app)
// const analytics = getAnalytics(app);