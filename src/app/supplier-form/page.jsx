// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';

// const indianStates = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
//   "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
//   "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
//   "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
//   "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh"
// ];

// const SupplierForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     address: '',
//     state: '',
//     pinCode: '',
//     gstin: '',
//     noGstin: false
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const temp = {};
//     if (!formData.name.trim()) temp.name = 'Name is required.';
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = 'Valid email required.';
//     if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) temp.mobile = '10-digit mobile number required.';
//     if (!formData.address.trim()) temp.address = 'Address is required.';
//     if (!formData.pinCode || !/^\d{6}$/.test(formData.pinCode)) temp.pinCode = 'Valid 6-digit pin code required.';
//     if (!formData.state) temp.state = 'Please select a state.';
//     if (!formData.noGstin && !formData.gstin) temp.gstin = 'Provide GSTIN or select "No GSTIN".';
//     setErrors(temp);
//     return Object.keys(temp).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log('Form submitted:', formData);
//       // Perform API call or further logic here
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-2xl my-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">Supplier Details Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block font-medium mb-1">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border p-2 rounded"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <small className="text-red-600">{errors.name}</small>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             className="w-full border p-2 rounded"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <small className="text-red-600">{errors.email}</small>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Mobile Number</label>
//           <input
//             type="text"
//             name="mobile"
//             className="w-full border p-2 rounded"
//             value={formData.mobile}
//             onChange={handleChange}
//           />
//           {errors.mobile && <small className="text-red-600">{errors.mobile}</small>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Address</label>
//           <textarea
//             name="address"
//             className="w-full border p-2 rounded"
//             rows={3}
//             value={formData.address}
//             onChange={handleChange}
//           ></textarea>
//           {errors.address && <small className="text-red-600">{errors.address}</small>}
//         </div>

//         <div className="flex gap-4">
//           <div className="w-1/2">
//             <label className="block font-medium mb-1">State</label>
//             <select
//               name="state"
//               className="w-full border p-2 rounded"
//               value={formData.state}
//               onChange={handleChange}
//             >
//               <option value="">-- Select State --</option>
//               {indianStates.map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//             {errors.state && <small className="text-red-600">{errors.state}</small>}
//           </div>
//           <div className="w-1/2">
//             <label className="block font-medium mb-1">Pin Code</label>
//             <input
//               type="text"
//               name="pinCode"
//               className="w-full border p-2 rounded"
//               value={formData.pinCode}
//               onChange={handleChange}
//             />
//             {errors.pinCode && <small className="text-red-600">{errors.pinCode}</small>}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="noGstin"
//             checked={formData.noGstin}
//             onChange={handleChange}
//           />
//           <label className="text-sm">I do not have a GSTIN</label>
//         </div>

//         <div>
//           <label className="block font-medium mb-1">GSTIN Number</label>
//           <input
//             type="text"
//             name="gstin"
//             className="w-full border p-2 rounded"
//             value={formData.gstin}
//             onChange={handleChange}
//             disabled={formData.noGstin}
//           />
//           {errors.gstin && <small className="text-red-600">{errors.gstin}</small>}
//         </div>

//         <Link href="/AddProducts" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
//   Submit Details
// </Link>

// // Option 2: onClick handler use karein
// <button
//   onClick={() => router.push('/AddProducts')}
//   className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
// >
//   Submit Details
// </button>
//       </form>
//     </div>
//   );
// };

// export default SupplierForm;

// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from "@/components/Navbar";

// const indianStates = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
//   "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
//   "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
//   "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
//   "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh"
// ];

// const SupplierForm = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     address: '',
//     state: '',
//     pinCode: '',
//     gstin: '',
//     noGstin: false
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const temp = {};
//     if (!formData.name.trim()) temp.name = 'Name is required.';
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = 'Valid email required.';
//     if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) temp.mobile = '10-digit mobile number required.';
//     if (!formData.address.trim()) temp.address = 'Address is required.';
//     if (!formData.pinCode || !/^\d{6}$/.test(formData.pinCode)) temp.pinCode = 'Valid 6-digit pin code required.';
//     if (!formData.state) temp.state = 'Please select a state.';
//     if (!formData.noGstin && !formData.gstin) temp.gstin = 'Provide GSTIN or select "No GSTIN".';
//     setErrors(temp);
//     return Object.keys(temp).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       // Send the form data to the API route
//       try {
//         const response = await fetch('/api/supplier', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });
  
//         if (!response.ok) {
//           const errorData = await response.text(); // Get response text
//           console.error('Error:', errorData);
//           throw new Error('Failed to submit form');
//         }
  
//         const result = await response.json();
//         console.log('Supplier data saved:', result);
//         router.push('/AddProducts'); // Redirect to the next page
//       } catch (error) {
//         console.error('Error during form submission:', error);
//       }
//     }
//   };
  

//   return (
//     <>
//     <Navbar />

//     <div className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-2xl my-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">Supplier Details Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-5">

//         <div>
//           <label className="block font-medium mb-1">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border p-2 rounded"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <small className="text-red-600">{errors.name}</small>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             className="w-full border p-2 rounded"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <small className="text-red-600">{errors.email}</small>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Mobile Number</label>
//           <input
//             type="text"
//             name="mobile"
//             className="w-full border p-2 rounded"
//             value={formData.mobile}
//             onChange={handleChange}
//           />
//           {errors.mobile && <small className="text-red-600">{errors.mobile}</small>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Address</label>
//           <textarea
//             name="address"
//             className="w-full border p-2 rounded"
//             rows={3}
//             value={formData.address}
//             onChange={handleChange}
//           ></textarea>
//           {errors.address && <small className="text-red-600">{errors.address}</small>}
//         </div>

//         <div className="flex gap-4">
//           <div className="w-1/2">
//             <label className="block font-medium mb-1">State</label>
//             <select
//               name="state"
//               className="w-full border p-2 rounded"
//               value={formData.state}
//               onChange={handleChange}
//             >
//               <option value="">-- Select State --</option>
//               {indianStates.map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//             {errors.state && <small className="text-red-600">{errors.state}</small>}
//           </div>

//           <div className="w-1/2">
//             <label className="block font-medium mb-1">Pin Code</label>
//             <input
//               type="text"
//               name="pinCode"
//               className="w-full border p-2 rounded"
//               value={formData.pinCode}
//               onChange={handleChange}
//             />
//             {errors.pinCode && <small className="text-red-600">{errors.pinCode}</small>}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="noGstin"
//             checked={formData.noGstin}
//             onChange={handleChange}
//           />
//           <label className="text-sm">I do not have a GSTIN</label>
//         </div>

//         <div>
//           <label className="block font-medium mb-1">GSTIN Number</label>
//           <input
//             type="text"
//             name="gstin"
//             className="w-full border p-2 rounded"
//             value={formData.gstin}
//             onChange={handleChange}
//             disabled={formData.noGstin}
//           />
//           {errors.gstin && <small className="text-red-600">{errors.gstin}</small>}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//         >
//           Submit Details
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default SupplierForm;


'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

const SupplierForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    accountNumber: '',
    ifsc: '',
    gstNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [hideGstField, setHideGstField] = useState(false);
  

  const validate = () => {
    const temp = {};
    if (!formData.name.trim()) temp.name = 'Name is required.';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = 'Valid email required.';
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) temp.mobile = '10-digit mobile required.';
    if (!formData.address) temp.address = 'Address is required.';
    if (!formData.state) temp.state = 'State is required.';
    if (!formData.city) temp.city = 'City is required.';
    if (!/^\d{6}$/.test(formData.pinCode)) temp.pinCode = '6-digit pin code required.';
    if (!formData.accountNumber) temp.accountNumber = 'Account number is required.';
    if (!formData.ifsc) temp.ifsc = 'IFSC is required.';
    // if (isGstRequired && !formData.gstNumber) temp.gstNumber = 'GST Number is required.';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await fetch('/api/supplier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("suppliers", JSON.stringify([
            ...(JSON.parse(localStorage.getItem("suppliers")) || []),
            formData
          ]));
          setSuccessMsg("Supplier form submitted successfully.");
          setTimeout(() => router.push('/DashboardTabs'), 1500);
        } else {
          alert(data.message || 'Email failed to send');
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow rounded-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Supplier Registration Form</h2>
        <div className="w-[200px] h-1 bg-pink-500 mx-auto mt-2 rounded-full mb-5"></div>

        {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "mobile", "address", "city", "pinCode"].map((field) => (
              <div key={field}>
                <label className="block font-medium capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-2xl transition duration-300"
                  style={{
                    boxShadow: '0 0 0 transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                />
                {errors[field] && <small className="text-red-600">{errors[field]}</small>}
              </div>
            ))}

            <div>
              <label className="block font-medium mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <small className="text-red-600">{errors.state}</small>}
            </div>

            <div className="flex flex-col justify-end mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hideGstField}
            onChange={() => setHideGstField((prev) => !prev)}
          />
          Hide GST Number Field?
        </label>
      </div>

      {!hideGstField && (
        <div className="md:col-span-2 mt-4">
          <label className="block font-medium mb-1">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded transition duration-300"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
          />
          {errors.gstNumber && <small className="text-red-600">{errors.gstNumber}</small>}
        </div>
      )}
          </div>

          <h3 className="text-md font-semibold mt-4">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["accountNumber", "ifsc"].map((field) => (
              <div key={field}>
                <label className="block font-medium capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded transition duration-300"
                  style={{
                    boxShadow: '0 0 0 transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                />
                {errors[field] && <small className="text-red-600">{errors[field]}</small>}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          
        </form>
      </div>
    </>
  );
};

export default SupplierForm;
