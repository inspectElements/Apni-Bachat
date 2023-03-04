import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAWnubSQsCwB24kOU9ga7hscVVGy72P6aY",
  authDomain: "apni-bachat.firebaseapp.com",
  projectId: "apni-bachat",
  storageBucket: "apni-bachat.appspot.com",
  messagingSenderId: "547187816777",
  appId: "1:547187816777:web:7f25e961349e8b83bfc298"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);