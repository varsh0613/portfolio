// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCYXeW7rhZYtG4lgnj4wB-z00tuNtC9zg",
  authDomain: "porftolio-8eb25.firebaseapp.com",
  projectId: "porftolio-8eb25",
  storageBucket: "porftolio-8eb25.firebasestorage.app",
  messagingSenderId: "323877267627",
  appId: "1:323877267627:web:13b58077c1eb17d3496fee",
  measurementId: "G-TQ65S2DNGL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firestore
export const db = getFirestore(app);
