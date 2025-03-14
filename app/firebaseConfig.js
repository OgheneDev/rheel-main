// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVWAwYbUph1bo9NllEIK-Yw7PlOmLanb0",
  authDomain: "rheelestate-b3b3f.firebaseapp.com",
  projectId: "rheelestate-b3b3f",
  storageBucket: "rheelestate-b3b3f.firebasestorage.app",
  messagingSenderId: "437240896648",
  appId: "1:437240896648:web:4e16d583cd76820202933d",
  measurementId: "G-9R94ZEFCKB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);