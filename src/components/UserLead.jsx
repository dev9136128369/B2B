"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const UserLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const emailFromToken = localStorage.getItem("authToken");
    const email = parsedUser?.email || emailFromToken;

    if (email) {
      fetch(`/api/user-leads/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setLeads(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching leads:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">
          Your Submitted Leads
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-center text-gray-500">No leads found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  {Object.keys(leads[0])
                    .filter((key) => key !== "_id" && key !== "__v")
                    .map((key) => (
                      <th key={key} className="py-3 px-4 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {Object.keys(lead)
                      .filter((key) => key !== "_id" && key !== "__v")
                      .map((key) => (
                        <td key={key} className="py-2 px-4 text-sm text-gray-700">
                          {lead[key]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserLeads;
