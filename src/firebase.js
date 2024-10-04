
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFQThdUP1N-z6ll821C6EEHTuIVfHxRBk",
  authDomain: "splitwise-a4d8c.firebaseapp.com",
  projectId: "splitwise-a4d8c",
  storageBucket: "splitwise-a4d8c.appspot.com",
  messagingSenderId: "654524653398",
  appId: "1:654524653398:web:3018ff5447e08c662440f7",
  measurementId: "G-6MV43T7JFN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
