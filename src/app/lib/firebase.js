// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAhHxs4XRfdTQh8YoWBmF8GJR_bVY82l8U",
  authDomain: "inventariopyme-c604b.firebaseapp.com",
  projectId: "inventariopyme-c604b",
  storageBucket: "inventariopyme-c604b.firebasestorage.app",
  messagingSenderId: "466975789332",
  appId: "1:466975789332:web:14292f1e0640186d783201"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


export { db };
