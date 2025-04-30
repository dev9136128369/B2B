"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const ManageProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const emailFromToken = localStorage.getItem("authToken");

    // Prioritize user.email if available, otherwise fallback to authToken
    const email = parsedUser?.email || emailFromToken;

    if (email) {
      fetch(`/api/Profileform/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false); // If no email found, stop loading
      // Optionally redirect the user to the login page here
      // router.push("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const emailFromToken = localStorage.getItem("authToken");

    // Prioritize user.email if available, otherwise fallback to authToken
    const email =  emailFromToken  || parsedUser?.email ;

    if (!email) {
      alert("⚠️ No email found. Please login again.");
      return;
    }

    setUpdating(true);

    try {
      const res = await fetch(`/api/Profileform/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Profile updated successfully!");
      } else {
        alert(`❌ Update failed: ${result.message}`);
      }
    } catch (error) {
      alert("⚠️ An error occurred while updating the profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!formData)
    return (
      <p className="text-center mt-10 text-red-500">No profile data found.</p>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-gradient-to-tr from-white via-gray-50 to-blue-50 shadow-xl rounded-2xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">
          Manage Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(formData).map(
              (key) =>
                typeof formData[key] === "string" &&
                key !== "_id" &&
                key !== "__v" && (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="text-sm font-medium text-gray-600 mb-1 capitalize"
                    >
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>
                )
            )}
          </div>
          <button
            type="submit"
            disabled={updating}
            className="w-full md:w-1/2 mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ManageProfile;
