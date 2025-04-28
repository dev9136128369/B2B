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

"use client"
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar"
const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('partners');
  const [partners, setPartners] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [leapSuppliers, setLeapSuppliers] = useState([]);

  useEffect(() => {
    const partnerData = JSON.parse(localStorage.getItem('partners')) || [];
    const supplierData = JSON.parse(localStorage.getItem('suppliers')) || [];

    setPartners(partnerData);
    setSuppliers(supplierData);
    setLeapSuppliers(supplierData.filter(item => item.type === 'Leap')); // ✅ filter Leap only
  }, []);

  const renderList = (data) =>
    data.map((item, index) => (
      <div key={index} className="bg-white p-4 rounded shadow mb-4">
        <h4 className="font-bold text-lg">{item.name}</h4>
        <p>Email: {item.email}</p>
        <p>Mobile: {item.mobile}</p>
        <p>City: {item.city}</p>
        {item.type && <p>Type: {item.type}</p>}
      </div>
    ));

  return (
    <>
    <Navbar />

    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex border rounded-lg overflow-hidden shadow-md h-[500px]">
        {/* Left Column - Tabs */}
        <div className="w-1/4 bg-gray-100 p-4">
          <h3 className="text-xl font-semibold mb-4">Dashboard</h3>
          <div className="flex flex-col gap-2">
            <button
              className={`text-left px-4 py-2 rounded ${activeTab === 'partners' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
              onClick={() => setActiveTab('partners')}
            >
              Partners
            </button>
            <button
              className={`text-left px-4 py-2 rounded ${activeTab === 'suppliers' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
              onClick={() => setActiveTab('suppliers')}
            >
              Clients / Suppliers
            </button>
            <button
              className={`text-left px-4 py-2 rounded ${activeTab === 'leap' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
              onClick={() => setActiveTab('leap')}
            >
              Lead
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300"></div>

        {/* Right Column - Data */}
        <div className="w-3/4 p-6 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">
            {activeTab === 'partners' && 'Partners List'}
            {activeTab === 'suppliers' && 'Clients / Suppliers List'}
            {activeTab === 'leap' && 'Leap Suppliers List'}
          </h3>
          {activeTab === 'partners' && renderList(partners)}
          {activeTab === 'suppliers' && renderList(suppliers)}
          {activeTab === 'leap' && renderList(leapSuppliers)}
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardTabs;
