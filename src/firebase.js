import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

initializeApp({
    apiKey: "AIzaSyDMaYthRDZxno-ekzCBgaQifGCFT1ZY_EI",
    authDomain: "react-chat-app-4f273.firebaseapp.com",
    databaseURL: "https://react-chat-app-4f273-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-chat-app-4f273",
    storageBucket: "react-chat-app-4f273.appspot.com",
    messagingSenderId: "323164348403",
    appId: "1:323164348403:web:5861de117e27f619e7bc86",
    measurementId: "G-GDSPNDRCRF"
}
);


export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore();