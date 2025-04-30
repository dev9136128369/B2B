//yashveer

// "use client";

// import { signIn } from "next-auth/react";

// export default function SignIn() {
//   return (
//     <div className="space-y-4">
//       <button
//         onClick={() => signIn("google")}
//         className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.229-0.158-1.835h-9.842z" />
//         </svg>
//         Continue with Google
//       </button>
//     </div>
//   );
// }








//sagar
"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn() {
  // Local storage mein data save karne ka function
  const saveUserToLocalStorage = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User data saved to localStorage");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { 
        redirect: false,
        callbackUrl: "/DashboardTabs" 
      });

      if (result?.error) {
        console.error("Sign-in error:", result.error);
      } else {
        console.log("Sign-in successful");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.229-0.158-1.835h-9.842z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
} 