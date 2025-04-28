// // lib/firebase.js
// import { initializeApp } from 'firebase/app';
// import { 
//   getAuth,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
//   verifyPasswordResetCode
// } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyABCD...",
//   authDomain: "your-app.firebaseapp.com",
//   projectId: "your-app",
//   storageBucket: "your-app.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:abcdef1234567890"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { 
//   auth,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
//   verifyPasswordResetCode
// };


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
