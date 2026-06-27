import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUlQaB70ZS1ue-KLmym2rghSqbrrYJsbY",
  authDomain: "usa-trip-nyc-orlando.firebaseapp.com",
  projectId: "usa-trip-nyc-orlando",
  storageBucket: "usa-trip-nyc-orlando.firebasestorage.app",
  messagingSenderId: "105054679684",
  appId: "1:105054679684:web:d3859924b112c10ab1c8d1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
