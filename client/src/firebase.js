// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "elewa-51e3d.firebaseapp.com",
  projectId: "elewa-51e3d",
  storageBucket: "elewa-51e3d.appspot.com",
  messagingSenderId: "747243520489",
  appId: "1:747243520489:web:77cde1f465c91a3a5a4b78",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
