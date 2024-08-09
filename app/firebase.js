// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmoMBz99gCMV94ug0_MnRUwLdWmk5H3XE",
  authDomain: "pantryapp-a65f8.firebaseapp.com",
  projectId: "pantryapp-a65f8",
  storageBucket: "pantryapp-a65f8.appspot.com",
  messagingSenderId: "26924362911",
  appId: "1:26924362911:web:d916a02f8c16001072c6aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  firestore = getFirestore(app);
export { app , firestore };