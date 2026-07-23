import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfMFZqbb8xIrI_6TQfcy0ov--qqQnALOE",
    authDomain: "pretta-pasteles.firebaseapp.com",
    projectId: "pretta-pasteles",
    storageBucket: "pretta-pasteles.firebasestorage.app",
    messagingSenderId: "448589424248",
    appId: "1:448589424248:web:2ffed684f8b6c045f76f8d"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);