import {initializeApp} from "firebase/app";
import "firebase/auth";
import {getAuth} from "firebase/auth";
import "firebase/firestore";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4HCHgYcpn76t9GNFyVsGEcl50YyIKUvo",
  authDomain: "waiveer-task-tracker-3a759.firebaseapp.com",
  projectId: "waiveer-task-tracker-3a759",
  storageBucket: "waiveer-task-tracker-3a759.appspot.com",
  messagingSenderId: "608865532395",
  appId: "1:608865532395:web:a965e0dafc6bd8132541ae",
  measurementId: "G-JWFJCSFHNT",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
