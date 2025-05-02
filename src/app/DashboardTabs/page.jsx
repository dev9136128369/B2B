// 'use client';

// import { useState, useEffect } from 'react';

// const DashboardTabs = () => {
//   const [activeTab, setActiveTab] = useState('partners');
//   const [partners, setPartners] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);

//   useEffect(() => {
//     const partnerData = JSON.parse(localStorage.getItem('partners')) || [];
//     const supplierData = JSON.parse(localStorage.getItem('suppliers')) || [];
//     setPartners(partnerData);
//     setSuppliers(supplierData);
//   }, []);

//   const renderList = (data) =>
//     data.map((item, index) => (
//       <div key={index} className="bg-white p-4 rounded shadow mb-4">
//         <h4 className="font-bold text-lg">{item.name}</h4>
//         <p>Email: {item.email}</p>
//         <p>Mobile: {item.mobile}</p>
//         <p>City: {item.city}</p>
//       </div>
//     ));

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-4">
//       <div className="flex border rounded-lg overflow-hidden shadow-md h-[500px]">
//         {/* Left Column - Tabs */}
//         <div className="w-1/4 bg-gray-100 p-4">
//           <h3 className="text-xl font-semibold mb-4">Dashboard</h3>
//           <div className="flex flex-col gap-2">
//             <button
//               className={`text-left px-4 py-2 rounded ${activeTab === 'partners' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
//               onClick={() => setActiveTab('partners')}
//             >
//               Partners
//             </button>
//             <button
//               className={`text-left px-4 py-2 rounded ${activeTab === 'suppliers' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
//               onClick={() => setActiveTab('suppliers')}
//             >
//               Clients / Suppliers
//             </button>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="w-px bg-gray-300"></div>

//         {/* Right Column - Data */}
//         <div className="w-3/4 p-6 overflow-y-auto">
//           <h3 className="text-xl font-semibold mb-4">
//             {activeTab === 'partners' ? 'Partners' : 'Clients / Suppliers'} List
//           </h3>
//           {activeTab === 'partners' ? renderList(partners) : renderList(suppliers)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardTabs;












// Sagar


// "use client";
// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import axios from "axios";

// const DashboardTabs = () => {
//   const isClient = typeof window !== "undefined";
//   const storedUser = isClient ? localStorage.getItem("user") : null;
//   const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//   const emailFromToken = isClient ? localStorage.getItem("authToken") : null;
//   const userEmail = parsedUser?.email || emailFromToken || "";

//   const [activeTab, setActiveTab] = useState("partners");
//   const [leadSubTab, setLeadSubTab] = useState("");
//   const [partners, setPartners] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [leads, setLeads] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [partnersRes, suppliersRes, leadsRes] = await Promise.all([
//         axios.get("/api/send-partner"),
//         axios.get("/api/supplier"),
//         axios.get("/api/send-leadData"),
//       ]);
//       setPartners(partnersRes.data || []);
//       setSuppliers(suppliersRes.data || []);
//       setLeads(leadsRes.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleStatusUpdate = async (id) => {
//     try {
//       // Optimistically update UI (optional)
//       setLeads((prevLeads) =>
//         prevLeads.map((lead) =>
//           lead._id === id ? { ...lead, status: "Won" } : lead
//         )
//       );

//       const res = await axios.patch(`/api/update-lead/${id}`, {
//         status: "Won",
//       });

//       if (!res.data.success) {
//         throw new Error("Failed to update on server");
//       }

//       alert("Status updated to Won");

//       // Re-fetch leads to sync with backend
//       fetchData();
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Failed to update status");

//       // Revert UI if update failed
//       setLeads((prevLeads) =>
//         prevLeads.map((lead) =>
//           lead._id === id ? { ...lead, status: "Pending" } : lead
//         )
//       );
//     }
//   };

//   const renderList = (data, isLead = false, disableWonButton = false) =>
//     data.map((item, index) => (
//       <div key={index} className="bg-white p-4 rounded shadow mb-4">
//         <h4 className="font-bold text-lg">{item.name}</h4>
//         <p>Email: {item.email}</p>
//         <p>Mobile: {item.mobile}</p>
//         <p>City: {item.city}</p>
//         {item.status && <p>Status: {item.status}</p>}

//         {isLead && (
//           <div className="flex gap-2 mt-3">
//             <button
//               disabled={item.status === "Won"}
//               onClick={() => handleStatusUpdate(item._id)}
//               className={`px-3 py-1 rounded text-sm ${
//                 item.status === "Won"
//                   ? "bg-gray-400 text-white cursor-not-allowed"
//                   : "bg-green-500 text-white"
//               }`}
//             >
//               Won
//             </button>
//             <button
//               className="px-3 py-1 rounded text-sm bg-yellow-500 text-white"
//               disabled
//             >
//               Pending
//             </button>
//           </div>
//         )}
//       </div>
//     ));

//   const filteredActiveLeads = leads.filter((lead) => lead.email !== userEmail);
//   const filteredSubmittedLeads = leads.filter(
//     (lead) => lead.email === userEmail
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-6xl mx-auto mt-10 p-4">
//         <div className="flex border rounded-lg overflow-hidden shadow-md h-[500px]">
//           <div className="w-1/4 bg-gray-100 p-4">
//             <h3 className="text-xl font-semibold mb-4">Dashboard</h3>
//             <div className="flex flex-col gap-2">
//               <button
//                 className={`text-left px-4 py-2 rounded ${
//                   activeTab === "partners"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white border"
//                 }`}
//                 onClick={() => setActiveTab("partners")}
//               >
//                 Partners
//               </button>
//               <button
//                 className={`text-left px-4 py-2 rounded ${
//                   activeTab === "suppliers"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white border"
//                 }`}
//                 onClick={() => setActiveTab("suppliers")}
//               >
//                 Clients / Suppliers
//               </button>
//               <div>
//                 <button
//                   className={`text-left px-4 py-2 rounded w-full ${
//                     activeTab === "leads"
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border"
//                   }`}
//                   onClick={() => {
//                     setActiveTab(activeTab === "leads" ? "" : "leads");
//                     setLeadSubTab("");
//                   }}
//                 >
//                   Leads ▾
//                 </button>
//                 {activeTab === "leads" && (
//                   <div className="pl-4 mt-2">
//                     <button
//                       className={`text-left px-4 py-1 block w-full rounded ${
//                         leadSubTab === "active"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200"
//                       }`}
//                       onClick={() => setLeadSubTab("active")}
//                     >
//                       Active
//                     </button>
//                     <button
//                       className={`text-left px-4 py-1 block w-full rounded mt-1 ${
//                         leadSubTab === "submitted"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200"
//                       }`}
//                       onClick={() => setLeadSubTab("submitted")}
//                     >
//                       Submitted
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="w-px bg-gray-300"></div>
//           <div className="w-3/4 p-6 overflow-y-auto">
//             {activeTab === "partners" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">Partners List</h3>
//                 {renderList(partners)}
//               </>
//             )}
//             {activeTab === "suppliers" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">
//                   Clients / Suppliers List
//                 </h3>
//                 {renderList(suppliers)}
//               </>
//             )}
//             {activeTab === "leads" && leadSubTab === "active" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">Active Leads</h3>
//                 {renderList(filteredActiveLeads, true)}
//               </>
//             )}
//             {activeTab === "leads" && leadSubTab === "submitted" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">Submitted Leads</h3>
//                 {renderList(filteredSubmittedLeads, true, true)}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardTabs;













// ss

"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

const DashboardTabs = () => {
  const isClient = typeof window !== "undefined";
  const storedUser = isClient ? localStorage.getItem("user") : null;
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const emailFromToken = isClient ? localStorage.getItem("authToken") : null;
  const userEmail = parsedUser?.email || emailFromToken || "";

  const [activeTab, setActiveTab] = useState("partners");
  const [leadSubTab, setLeadSubTab] = useState("");
  const [partners, setPartners] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [leads, setLeads] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [winReason, setWinReason] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [partnersRes, suppliersRes, leadsRes] = await Promise.all([
        axios.get("/api/send-partner"),
        axios.get("/api/supplier"),
        axios.get("/api/send-leadData"),
      ]);
      setPartners(partnersRes.data || []);
      setSuppliers(suppliersRes.data || []);
      setLeads(leadsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusUpdate = async (id) => {
    const reason = winReason.trim();
    const updatedBy = parsedUser?.email || ""; // Using logged-in user's email
  
    if (!reason) {
      alert("Reason is required");
      return;
    }
  
    try {
      // Optimistic UI update
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === id ? { ...lead, status: "Won", reason, updatedBy } : lead
        )
      );
      console.log("Data");
      // Update the lead status with 'reason' and 'updatedBy'
      const res = await axios.patch(`/api/update-lead/${id}`, {
        status: "Won",
        reason,
        updatedBy,
      });
  
      if (!res.data.success) {
        throw new Error("Failed to update lead status");
      }
  
      alert("Lead status updated to Won");
  
      // Reset modal and input fields after successful update
      setShowModal(false);
      setWinReason("");
      setSelectedLeadId(null);
  
      // Re-fetch the updated data
      fetchData();
    } catch (err) {
      console.error("Error updating lead:", err);
      alert("Failed to update lead status");
  
      // Revert UI on failure
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === id ? { ...lead, status: "Pending" } : lead
        )
      );
    }
  };
  
  
  const renderList = (data, isLead = false, disableWonButton = false) =>
    data.map((item, index) => (
      <div key={index} className="bg-white p-4 rounded shadow mb-4">
        <h4 className="font-bold text-lg">{item.name}</h4>
        <p>Email: {item.email}</p>
        <p>Mobile: {item.mobile}</p>
        <p>City: {item.city}</p>
        {item.status && <p>Status: {item.status}</p>}
        {item.reason && item.status === "Won" && (
          <p className="text-sm text-green-700">Reason: {item.reason}</p>
        )}

        {isLead && (
          <div className="flex gap-2 mt-3">
            <button
              disabled={item.status === "Won"}
              onClick={() => {
                setSelectedLeadId(item._id);
                setShowModal(true);
              }}
              className={`px-3 py-1 rounded text-sm ${
                item.status === "Won"
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
            >
              Won
            </button>
            <button
              className="px-3 py-1 rounded text-sm bg-yellow-500 text-white"
              disabled
            >
              Pending
            </button>
          </div>
        )}
      </div>
    ));

  const filteredActiveLeads = leads.filter((lead) => lead.email !== userEmail);
  const filteredSubmittedLeads = leads.filter((lead) => lead.email === userEmail);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <div className="flex border rounded-lg overflow-hidden shadow-md h-[500px]">
          <div className="w-1/4 bg-gray-100 p-4">
            <h3 className="text-xl font-semibold mb-4">Dashboard</h3>
            <div className="flex flex-col gap-2">
              <button
                className={`text-left px-4 py-2 rounded ${
                  activeTab === "partners"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
                onClick={() => setActiveTab("partners")}
              >
                Partners
              </button>
              <button
                className={`text-left px-4 py-2 rounded ${
                  activeTab === "suppliers"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
                onClick={() => setActiveTab("suppliers")}
              >
                Clients / Suppliers
              </button>
              <div>
                <button
                  className={`text-left px-4 py-2 rounded w-full ${
                    activeTab === "leads"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                  onClick={() => {
                    setActiveTab("leads");
                    setLeadSubTab("");
                  }}
                >
                  Leads ▾
                </button>
                {activeTab === "leads" && (
                  <div className="pl-4 mt-2">
                    <button
                      className={`text-left px-4 py-1 block w-full rounded ${
                        leadSubTab === "active"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setLeadSubTab("active")}
                    >
                      Active
                    </button>
                    <button
                      className={`text-left px-4 py-1 block w-full rounded mt-1 ${
                        leadSubTab === "submitted"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setLeadSubTab("submitted")}
                    >
                      Submitted
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-px bg-gray-300"></div>

          <div className="w-3/4 p-6 overflow-y-auto">
            {activeTab === "partners" && (
              <>
                <h3 className="text-xl font-semibold mb-4">Partners List</h3>
                {renderList(partners)}
              </>
            )}
            {activeTab === "suppliers" && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Clients / Suppliers List
                </h3>
                {renderList(suppliers)}
              </>
            )}
            {activeTab === "leads" && leadSubTab === "active" && (
              <>
                <h3 className="text-xl font-semibold mb-4">Active Leads</h3>
                {renderList(filteredActiveLeads, true)}
              </>
            )}
            {activeTab === "leads" && leadSubTab === "submitted" && (
              <>
                <h3 className="text-xl font-semibold mb-4">Submitted Leads</h3>
                {renderList(filteredSubmittedLeads, true, true)}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Mark Lead as Won</h3>
            <p className="mb-2 text-sm text-gray-600">Email: {userEmail}</p>
            <textarea
              placeholder="Why did you win this lead?"
              className="w-full border rounded p-2 mb-4"
              rows={4}
              value={winReason}
              onChange={(e) => setWinReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setShowModal(false);
                  setWinReason("");
                  setSelectedLeadId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                disabled={!winReason.trim()}
                onClick={() => handleStatusUpdate(selectedLeadId)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardTabs;
