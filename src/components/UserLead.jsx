// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";

// const UserLeads = () => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//     const emailFromToken = localStorage.getItem("authToken");
//     const email = parsedUser?.email || emailFromToken;

//     if (email) {
//       fetch(`/api/user-leads/${email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           // Normalize the lead data structure
//           const normalizedLeads = data.map((lead) => ({
//             name: lead.leadName || lead.name || "",
//             email: lead.leadEmail || lead.email || "",
//             mobile: lead.leadMobile || lead.mobile || "",
//             status: lead.status || "Pending",
//             // Remove the 'type' field from the data
//             ...Object.fromEntries(
//               Object.entries(lead).filter(([key]) => key !== "type" && key !== "leadType")
//             ),
//           }));
//           setLeads(normalizedLeads);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching leads:", err);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Define the columns to display (without type)
//   const tableColumns = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "mobile", label: "Mobile" },
//     { key: "status", label: "Status" },
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-6xl mx-auto mt-10 p-6">
//         <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">
//           Your Submitted Leads
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : leads.length === 0 ? (
//           <p className="text-center text-gray-500">No leads found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
//               <thead>
//                 <tr className="bg-blue-600 text-white text-left">
//                   {tableColumns.map((column) => (
//                     <th key={column.key} className="py-3 px-4">
//                       {column.label}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {leads.map((lead, index) => (
//                   <tr
//                     key={lead._id || index}
//                     className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                   >
//                     {tableColumns.map((column) => (
//                       <td key={`${lead._id || index}-${column.key}`} className="py-2 px-4 text-sm text-gray-700">
//                         {lead[column.key] || ""}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserLeads;



// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";

// const UserLeads = () => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//     const emailFromToken = localStorage.getItem("authToken");
//     const email = parsedUser?.email || emailFromToken;

//     if (email) {
//       fetch(`/api/user-leads/${email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           const normalizedLeads = data.map((lead) => ({
//             name: lead.leadName || lead.name || "",
//             email: lead.leadEmail || lead.email || "",
//             mobile: lead.leadMobile || lead.mobile || "",
//             status: lead.status || "Pending",
//             message: lead.reason || lead.message || "", // <-- Use reason here
//             ...Object.fromEntries(
//               Object.entries(lead).filter(
//                 ([key]) => key !== "type" && key !== "leadType"
//               )
//             ),
//           }));
//           setLeads(normalizedLeads);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching leads:", err);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Define the columns to display
//   const tableColumns = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "mobile", label: "Mobile" },
//     { key: "status", label: "Status" },
//     { key: "message", label: "Reason" }, // <-- Renamed label for clarity
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-6xl mx-auto mt-10 p-6">
//         <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">
//           Your Submitted Leads
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : leads.length === 0 ? (
//           <p className="text-center text-gray-500">No leads found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
//               <thead>
//                 <tr className="bg-blue-600 text-white text-left">
//                   {tableColumns.map((column) => (
//                     <th key={column.key} className="py-3 px-4">
//                       {column.label}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {leads.map((lead, index) => (
//                   <tr
//                     key={lead._id || index}
//                     className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                   >
//                     {tableColumns.map((column) => (
//                       <td
//                         key={`${lead._id || index}-${column.key}`}
//                         className="py-2 px-4 text-sm text-gray-700"
//                       >
//                         {lead[column.key] || ""}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserLeads;










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
          // Normalize leads data with reason as message
          const normalizedLeads = data.map((lead) => ({
            name: lead.name || "",
            email: lead.email || "",
            mobile: lead.mobile || "",
            status: lead.status || "Pending",
            message: lead.reason || "", // Use the 'reason' field as message
            _id: lead._id,
          }));
          setLeads(normalizedLeads);
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

  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    { key: "status", label: "Status" },
    { key: "message", label: "Reason" }, // Display "Reason" in the message column
  ];

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
                  {tableColumns.map((column) => (
                    <th key={column.key} className="py-3 px-4">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr
                    key={lead._id || index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {tableColumns.map((column) => (
                      <td
                        key={`${lead._id || index}-${column.key}`}
                        className="py-2 px-4 text-sm text-gray-700"
                      >
                        {lead[column.key] || "-"}
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
