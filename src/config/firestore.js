// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2vZ_quqfVMIZ04MY8YjDj5x5O0FXrOWk",
  authDomain: "urarchive-81779.firebaseapp.com",
  projectId: "urarchive-81779",
  storageBucket: "urarchive-81779.appspot.com",
  messagingSenderId: "680932991220",
  appId: "1:680932991220:web:7468a8aaecfc4c05563ea1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
