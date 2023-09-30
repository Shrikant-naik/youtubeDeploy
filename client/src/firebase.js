import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth"; //extra1

const firebaseConfig = {
  apiKey: "AIzaSyDTnxrVW7JTdKMx3BoifKdqf8QZU-JKpSY",
  authDomain: "video2-f03a6.firebaseapp.com",
  projectId: "video2-f03a6",
  storageBucket: "video2-f03a6.appspot.com",
  messagingSenderId: "318532497350",
  appId: "1:318532497350:web:e907ba22b9c40417668cc7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(); // extra 2
export const provider = new GoogleAuthProvider(); // extra 3

export default app; // very helpful while uploading any image or video
