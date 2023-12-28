// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbLWx1jaF64UorHhPTMLo3-Vjh2uceEQk",
  authDomain: "harmonii-storage.firebaseapp.com",
  projectId: "harmonii-storage",
  storageBucket: "harmonii-storage.appspot.com",
  messagingSenderId: "29711787126",
  appId: "1:29711787126:web:ca5965f617918ee0836b57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);