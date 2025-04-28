"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="space-y-4">
      <button
        onClick={() => signIn("google")}
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