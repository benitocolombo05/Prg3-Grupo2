import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCrWIy38LvrE1nby11gurUkoZv2bzERjpU",
  authDomain: "prg3grupo2.firebaseapp.com",
  projectId: "prg3grupo2",
  storageBucket: "prg3grupo2.firebasestorage.app",
  messagingSenderId: "568966946637",
  appId: "1:568966946637:web:3d44c5720642edff316104"
};

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const storage = app.storage();
export const db = app.firestore();