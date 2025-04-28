// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Container from "@/components/Container";

// import Navbar from "@/components/Navbar"


// export default function SignUpPage() {
//   // State for form fields and validation
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate form fields
//     const newErrors = {};
//     if (!name) {
//       newErrors.name = "Name is required";
//     }
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!mobile) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(mobile)) {
//       newErrors.mobile = "Mobile number is invalid";
//     }
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Confirm Password is required";
//     } else if (confirmPassword !== password) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     if (!agreeTerms) {
//       newErrors.agreeTerms = "You must agree to the terms and conditions";
//     }

//     // If there are errors, set them and stop submission
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // If no errors, proceed with form submission
//     setErrors({});
//     console.log("Form submitted successfully!");
//     // Add your form submission logic here (e.g., API call)
//   };

//   const handleEmailSubmit = async () => {
//   const res = await fetch('/api/send-email', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name,
//       email,
//       mobile,
//       message: "This is a test from the app router form",
//     }),
//   });

//   const data = await res.json();
//   if (res.ok) {
//     alert('Email sent successfully!');
//   } else {
//     alert('Error: ' + data.message);
//   }
// };

//   return (
//     <><Navbar/>
//     <Container>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         {/* Main Container - Flexbox with Equal Height and No Gap */}
//         <div className="flex flex-wrap items-stretch w-full max-w-6xl">
//           {/* Left Side - Sign Up Form */}
//           <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full md:w-1/2">
//             <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
//               Sign Up
//             </h1>

//             {/* Name Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Mobile Number Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your mobile number"
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//               />
//               {errors.mobile && (
//                 <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Confirm your password"
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             {/* Terms and Conditions Checkbox */}
//             <div className="mb-6">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-4 w-4 text-blue-500"
//                   checked={agreeTerms}
//                   onChange={(e) => setAgreeTerms(e.target.checked)}
//                 />
//                 <span className="ml-2 text-sm">
//                   I agree to the{" "}
//                   <a href="#" className="text-blue-500 hover:underline">
//                     terms and conditions
//                   </a>
//                 </span>
//               </label>
//               {errors.agreeTerms && (
//                 <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
//               )}
//             </div>

//             {/* Sign Up Button */}
//             <button
//               className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={handleSubmit}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Right Side - Image Container */}
//           <div className="w-full md:w-1/2 mt-8 md:mt-0">
//             <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
//               <Image
//                 src="/images/signup.jpeg" // Replace with your image path
//                 alt="Sign Up Image"
//                 fill
//                 className="rounded-lg object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//     </>
//   );
// }






"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password, // Added password
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }
  
      alert(`Signup successful! Confirmation sent to ${formData.email}`);
      router.push('/');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.message}\nPlease try again later.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="flex flex-wrap items-stretch w-full max-w-6xl">
            {/* Left Side - Sign Up Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full md:w-1/2">
              <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
                Sign Up
              </h1>
              <div className="w-[100px] h-1 bg-pink-500 mx-auto mt-2 rounded-full mb-5"></div>


              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full border  p-2 rounded-2xl transition duration-300"
                    style={{
                      boxShadow: '0 0 0 transparent',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full border  p-2 rounded-2xl transition duration-300"
                    style={{
                      boxShadow: '0 0 0 transparent',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    className="w-full border  p-2 rounded-2xl transition duration-300"
                    style={{
                      boxShadow: '0 0 0 transparent',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full border  p-2 rounded-2xl transition duration-300"
                  style={{
                    boxShadow: '0 0 0 transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full border  p-2 rounded-2xl transition duration-300"
                    style={{
                      boxShadow: '0 0 0 transparent',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      className="form-checkbox h-4 w-4 text-blue-500"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-blue-500 hover:underline">
                        terms and conditions
                      </a>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
                  )}
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="text-lg w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Sign Up"}
                </button>
              </form>
            </div>

            {/* Right Side - Image Container */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
                <Image
                  src="/images/signup.jpeg"
                  alt="Sign Up Image"
                  fill
                  className="rounded-lg object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
