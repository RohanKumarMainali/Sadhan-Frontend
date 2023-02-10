
import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const config = {
  apiKey: "AIzaSyC9I1WzPUgb5zzXPmzd_iaWMOxpJHSm8vc",
  authDomain: "sadhan-4c179.firebaseapp.com",
  projectId: "sadhan-4c179",
  storageBucket: "sadhan-4c179.appspot.com",
  messagingSenderId: "893864146492",
  appId: "1:893864146492:web:5dbebf93978a362c9cf539",
  measurementId: "G-6VMLXKPC24"
}

const app = initializeApp(config);
export const auth= getAuth(app);
