// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import{ getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqAZAkRY-my9k0c1plYnSIUoUH0Rr5E6s",
  authDomain: "talk-hub-5e2a9.firebaseapp.com",
  projectId: "talk-hub-5e2a9",
  storageBucket: "talk-hub-5e2a9.appspot.com",
  messagingSenderId: "737434744982",
  appId: "1:737434744982:web:46227c6543853a9d6e2ab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);