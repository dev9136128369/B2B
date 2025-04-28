// // app/forgot-password/page.js
// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('/api/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage(data.error);
//       }
//     } catch (error) {
//       setMessage('An error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        
//         {message && (
//           <div className={`mb-4 p-2 rounded ${message.includes('sent') ? 'bg-green-100' : 'bg-red-100'}`}>
//             {message}
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// }

"use client"
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="mb-3">{message}</p>}
        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
}
