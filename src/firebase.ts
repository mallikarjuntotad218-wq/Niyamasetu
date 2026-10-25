
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu-lOKP7h9yBXAnFoBZoKzibk03dsVXu4",
  authDomain: "niyamsetu-cc82c.firebaseapp.com",
  projectId: "niyamsetu-cc82c",
  storageBucket: "niyamsetu-cc82c.firebasestorage.app",
  messagingSenderId: "557460094942",
  appId: "1:557460094942:web:e2706632d5c4dd7e07274f",
  measurementId: "G-PZJD9GJ8CS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
