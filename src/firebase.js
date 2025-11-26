import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo9spOH7It0eXO3xhKjFLy8bKc6-gFT_8",
  authDomain: "sports-buddy-01.firebaseapp.com",
  projectId: "sports-buddy-01",
  storageBucket: "sports-buddy-01.firebasestorage.app",
  messagingSenderId: "76563117253",
  appId: "1:76563117253:web:8b5932d692bbe4b7142cac",
  measurementId: "G-8S6204CDRQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);