"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserDataHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      // User data ko local storage mein save karo
      localStorage.setItem("user", JSON.stringify(session.user));
      console.log("User data stored in localStorage:", session.user);
    }
  }, [session]);

  return null; // Yeh component UI mein kuch render nahi karega
}