// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getfirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoMWg7okeN3GmFnFnP7RC7IUu70JivX78",
  authDomain: "inventory-management-677f9.firebaseapp.com",
  projectId: "inventory-management-677f9",
  storageBucket: "inventory-management-677f9.appspot.com",
  messagingSenderId: "501111301676",
  appId: "1:501111301676:web:ae082fe23c120cfe809389",
  measurementId: "G-JQ08Q1FJ6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}