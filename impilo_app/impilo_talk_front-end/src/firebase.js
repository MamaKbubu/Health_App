// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7PmKtto19FBJYuuVSkGj-yF1SQz0ccTk",
  authDomain: "impilo-c7851.firebaseapp.com",
  databaseURL: "https://impilo-c7851-default-rtdb.firebaseio.com/",
  projectId: "impilo-c7851",
  storageBucket: "impilo-c7851.appspot.com",
  messagingSenderId: "594296151608",
  appId: "1:594296151608:web:ca4d7696e97d767c5f90cd",
  measurementId: "G-Z8LX66FZNB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
