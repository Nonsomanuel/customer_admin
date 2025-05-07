// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfkdtra2ORXuhQwyfoHHn5Dawkh9_jubs",
  authDomain: "business-admin-7cd9e.firebaseapp.com",
  projectId: "business-admin-7cd9e",
  storageBucket: "business-admin-7cd9e.appspot.com",
  messagingSenderId: "194265744619",
  appId: "1:194265744619:web:468f7c03c7e068d3192aae",
  measurementId: "G-P3M1SBLXJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
