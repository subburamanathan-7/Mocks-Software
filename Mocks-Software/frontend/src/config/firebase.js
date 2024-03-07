// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3CHNWWg1NSk30ED9q52HSOADl_MYKEBQ",
  authDomain: "mocks-resume.firebaseapp.com",
  projectId: "mocks-resume",
  storageBucket: "mocks-resume.appspot.com",
  messagingSenderId: "956101635661",
  appId: "1:956101635661:web:2ada832b693d322f2b7604",
  measurementId: "G-L2J5B8RQES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = firebase.storage(app);
export {storage}
