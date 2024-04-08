// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPEWnHRrX5Wm-Dop4_dKBiQ71KfxtpNWs",
  authDomain: "hostel-admin-3d53c.firebaseapp.com",
  projectId: "hostel-admin-3d53c",
  storageBucket: "hostel-admin-3d53c.appspot.com",
  messagingSenderId: "902801817298",
  appId: "1:902801817298:web:60d86fd8231b271abdb70b",
  measurementId: "G-W1DPLHG6NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };