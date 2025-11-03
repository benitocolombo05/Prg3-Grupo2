import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAsFh0CDFnMjMtm3Ujouz1ns8IzNn1bdd4",
  authDomain: "proyecto-benito1.firebaseapp.com",
  projectId: "proyecto-benito1",
  storageBucket: "proyecto-benito1.firebasestorage.app",
  messagingSenderId: "38370735553",
  appId: "1:38370735553:web:c3ed39099bf6371c502b40"
};

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const storage = app.storage();
export const db = app.firestore();