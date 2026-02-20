// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_BASE_URL,
  authDomain: "management-app-react.firebaseapp.com",
  projectId: "management-app-react",
  storageBucket: "management-app-react.firebasestorage.app",
  messagingSenderId: "9880441255",
  appId: "1:9880441255:web:d8f5664055a2a7ef03a682"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);