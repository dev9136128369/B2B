
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={session.user?.image || ""}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{session.user?.name}</h2>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}