import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fomofy-f66e7.firebaseapp.com",
  projectId: "fomofy-f66e7",
  storageBucket: "fomofy-f66e7.appspot.com",
  messagingSenderId: "581569901275",
  appId: "1:581569901275:web:9df50d323a3ee7587c52fe",
  measurementId: "G-45TC6Y289L",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
