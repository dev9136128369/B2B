// // app/api/forgot-password/route.js
// import { NextResponse } from 'next/server';
// import { sendPasswordResetEmail, auth } from '../../../lib/firebase';

// export async function POST(request) {
//   try {
//     const { email } = await request.json();

//     if (!email || !email.includes('@')) {
//       return NextResponse.json(
//         { error: "Valid email required" },
//         { status: 400 }
//       );
//     }

//     await sendPasswordResetEmail(auth, email);

//     return NextResponse.json(
//       { 
//         success: true,
//         message: "Password reset link sent to your email" 
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Forgot password error:", error);
    
//     let errorMessage = "Failed to send reset email";
//     if (error.code === 'auth/user-not-found') {
//       errorMessage = "Email not registered";
//     } else if (error.code === 'auth/too-many-requests') {
//       errorMessage = "Too many attempts. Try again later";
//     }

//     return NextResponse.json(
//       { 
//         success: false,
//         error: errorMessage,
//         code: error.code 
//       },
//       { status: 400 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return NextResponse.json({ message: "Reset email sent!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
