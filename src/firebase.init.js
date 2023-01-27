// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import env from "./env";

const firebaseConfig = {
  apiKey: `${env.apiKey}`,
  authDomain: `${env.authDomain}`,
  projectId: `${env.projectId}`,
  storageBucket: `${env.storageBucket}`,
  messagingSenderId: `${env.messagingSenderId}`,
  appId: `${env.appId}`,
  measurementId: `${env.measurementId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

console.log(firebaseConfig);

export { auth, app, analytics };
