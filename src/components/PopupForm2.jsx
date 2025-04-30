// "use client"
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import toast, { Toaster } from 'react-hot-toast';

// // Form validation schema
// const formSchema = z.object({
//   name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
//   email: z.string().email({ message: 'Invalid email address' }),
//   mobile: z.string().min(10, { message: 'Mobile number must be 10 digits' }).max(10),
// });

// export default function PopupForm2() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Form methods
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset
//   } = useForm({
//     resolver: zodResolver(formSchema)
//   });

//   // Popup open karein when page loads
//   useEffect(() => {
//     console.log('useEffect triggered');
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//       console.log('Form should be open now'); // Check if it's being triggered
//     }, 8000); // 8 seconds after page load

//     return () => clearTimeout(timer);
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const newSupplier = { ...data, type: 'Leap' };
//       const existing = JSON.parse(localStorage.getItem('suppliers')) || [];
//       localStorage.setItem('suppliers', JSON.stringify([...existing, newSupplier]));
      
//       // Make sure the fetch API is pointing to the correct route
//       const res = await fetch('/api/send-leadData', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newSupplier)
//       });
      
//       if (!res.ok) throw new Error('Email sending failed');
      
//       toast.success('Form submitted & emailed successfully!');
//       reset();
//       setIsOpen(false);
//     } catch (error) {
//       toast.error('Submission failed. Please try again.');
//       console.error(error);
//     }
//   };

//   console.log(isOpen); 

//   if (!isOpen) return null; 

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Lead</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name*</label>
//             <input
//               {...register('name')}
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter your name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Email*</label>
//             <input
//               {...register('email')}
//               type="email"
//               className="w-full p-2 border rounded"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Mobile Field */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Mobile Number*</label>
//             <input
//               {...register('mobile')}
//               type="tel"
//               className="w-full p-2 border rounded"
//               placeholder="Enter 10-digit mobile number"
//             />
//             {errors.mobile && (
//               <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }








//yashveer
// "use client";

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation'; // ✅ Needed for redirection

// // Form validation schema
// const formSchema = z.object({
//   name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
//   email: z.string().email({ message: 'Invalid email address' }),
//   mobile: z.string().min(10, { message: 'Mobile number must be 10 digits' }).max(10),
// });

// export default function PopupForm2() {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 8000); // Open popup after 8 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset
//   } = useForm({
//     resolver: zodResolver(formSchema)
//   });

//   const onSubmit = async (data) => {
//     try {
//       // ✅ Check if authtoken exists
//       const token = localStorage.getItem('authtoken');
//       if (!token) {
//         setIsOpen(false); // 👈 Close popup immediately if no token
//         toast.error('You must be logged in to submit!');
//         router.push('/Login');
//         return;
//       }

//       const newSupplier = { ...data, type: 'Leap' };
//       const existing = JSON.parse(localStorage.getItem('suppliers')) || [];
//       localStorage.setItem('suppliers', JSON.stringify([...existing, newSupplier]));

//       const res = await fetch('/api/send-leadData', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newSupplier)
//       });

//       if (!res.ok) throw new Error('Email sending failed');

//       toast.success('Form submitted & emailed successfully!');
//       reset();
//       setIsOpen(false); // 👈 Close popup after successful submit
//     } catch (error) {
//       toast.error('Submission failed. Please try again.');
//       console.error(error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Lead</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name*</label>
//             <input
//               {...register('name')}
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter your name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Email*</label>
//             <input
//               {...register('email')}
//               type="email"
//               className="w-full p-2 border rounded"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Mobile Field */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Mobile Number*</label>
//             <input
//               {...register('mobile')}
//               type="tel"
//               className="w-full p-2 border rounded"
//               placeholder="Enter 10-digit mobile number"
//             />
//             {errors.mobile && (
//               <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }










//sagar 
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  mobile: z.string().min(10, { message: 'Mobile number must be 10 digits' }).max(10),
});

export default function PopupForm2() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    // ❌ If both token and user are missing, redirect to login
    if (!token && !user) {
      toast.error('Please log in first');
      router.push('/Login');
      return;
    }

    // ✅ Proceed with form submission
    try {
      const newSupplier = { ...data, type: 'Leap' };
      const existing = JSON.parse(localStorage.getItem('suppliers')) || [];
      localStorage.setItem('suppliers', JSON.stringify([...existing, newSupplier]));

      const res = await fetch('/api/send-leadData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
      });

      if (!res.ok) throw new Error('Email sending failed');

      toast.success('Form submitted successfully!');
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error('Submission failed. Try again.');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lead</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name*</label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number*</label>
            <input
              {...register('mobile')}
              type="tel"
              className="w-full p-2 border rounded"
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
