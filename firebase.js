import {initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi_cqxVBmLLxCnE94Qm-vGwYcLNsdDIIw",
  authDomain: "waiveer-task-tracker.firebaseapp.com",
  projectId: "waiveer-task-tracker",
  storageBucket: "waiveer-task-tracker.appspot.com",
  messagingSenderId: "893471226464",
  appId: "1:893471226464:web:ac103c172a5447766a6105",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
