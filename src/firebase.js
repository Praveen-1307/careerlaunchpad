import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBbVjsau6m-ltPX56cjTuCrotaDdEEibbM",
  authDomain: "aptitude-app-7d9fb.firebaseapp.com",
  projectId: "aptitude-app-7d9fb",
  storageBucket: "aptitude-app-7d9fb.firebasestorage.app",
  messagingSenderId: "609246894350",
  appId: "1:609246894350:web:b13e7638f57e0694455f5f",
  measurementId: "G-0MVNVQZ83V"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 