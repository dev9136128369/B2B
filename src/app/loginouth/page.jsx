
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
        <SignIn />
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
        </div>
      </div>
    </div>
  );
}