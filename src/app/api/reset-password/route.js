// app/api/reset-password/route.js
// import { NextResponse } from 'next/server';
// import { confirmPasswordReset, auth, verifyPasswordResetCode } from '../../../../lib/firebase';

// export async function POST(request) {
//   try {
//     const { oobCode, newPassword } = await request.json();

//     // 1. Pehle verify karo code valid hai ya nahi
//     await verifyPasswordResetCode(auth, oobCode);

//     // 2. Password reset karo
//     await confirmPasswordReset(auth, oobCode, newPassword);

//     return NextResponse.json(
//       { 
//         success: true,
//         message: "Password updated successfully" 
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Reset password error:", error);
    
//     let errorMessage = "Password reset failed";
//     let statusCode = 400;

//     switch(error.code) {
//       case 'auth/expired-action-code':
//         errorMessage = "Reset link has expired. Please request a new one.";
//         break;
//       case 'auth/invalid-action-code':
//         errorMessage = "Invalid reset link. Please check the URL.";
//         break;
//       case 'auth/user-disabled':
//         errorMessage = "This account has been disabled.";
//         break;
//       case 'auth/user-not-found':
//         errorMessage = "No user found with this email.";
//         break;
//       default:
//         errorMessage = "Something went wrong. Please try again.";
//         statusCode = 500;
//     }

//     return NextResponse.json(
//       { 
//         success: false,
//         error: errorMessage,
//         code: error.code 
//       },
//       { status: statusCode }
//     );
//   }
// }

// /pages/api/reset-password.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, confirmPasswordReset } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your Firebase config
  authDomain: "YOUR_PROJECT.firebaseapp.com",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { oobCode, newPassword } = req.body;

  if (!oobCode || !newPassword) {
    return res.status(400).json({ error: "Missing oobCode or password" });
  }

  try {
    const auth = getAuth();
    await confirmPasswordReset(auth, oobCode, newPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ error: error.message || "Reset failed" });
  }
}
