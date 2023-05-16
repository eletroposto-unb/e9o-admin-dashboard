// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0V17nG5gRz-9LkIYHEQY-3TgJqp34MBs",
  authDomain: "eletroposto-e9o.firebaseapp.com",
  projectId: "eletroposto-e9o",
  storageBucket: "eletroposto-e9o.appspot.com",
  messagingSenderId: "204142699829",
  appId: "1:204142699829:web:3734b594569fa5d03d987c",
  measurementId: "G-TLLLRDCKVL"
};

const firebase_app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase_app);

export default firebase_app;