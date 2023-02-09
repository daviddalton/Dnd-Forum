// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDfEtT1Cao8UTatGoMdMHdzSgKjmmYZX0",
    authDomain: "dndcharacter-1080f.firebaseapp.com",
    projectId: "dndcharacter-1080f",
    storageBucket: "dndcharacter-1080f.appspot.com",
    messagingSenderId: "784764149655",
    appId: "1:784764149655:web:cef4003b702f1c6865aed2",
    measurementId: "G-0YJYY4NVFZ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase)

export const firestore = getFirestore(firebase);