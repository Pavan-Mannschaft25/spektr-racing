import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh2fDx3XFRnKVo4dP28c8fkumzuS82Aa8",
  authDomain: "spektrracing-dd8c7.firebaseapp.com",
  projectId: "spektrracing-dd8c7",
  storageBucket: "spektrracing-dd8c7.firebasestorage.app",
  messagingSenderId: "273903834816",
  appId: "1:273903834816:web:cf6438ffa3025646a13f25",
  measurementId: "G-BEHL1F3GLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);