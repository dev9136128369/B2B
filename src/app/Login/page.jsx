// "use client";
// import { useState } from "react";
// import { FaGoogle, FaApple, FaMobileAlt } from "react-icons/fa";
// import Image from "next/image";
// import Container from "@/components/Container";

// import Navbar from "@/components/Navbar"


// export default function LoginPage() {
//   // State for form fields and validation
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate form fields
//     const newErrors = {};
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
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

//   return (
//     <><Navbar/>
//     <Container>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         {/* Main Container - Flexbox with Equal Height and No Gap */}
//         <div className="flex flex-wrap items-stretch w-full max-w-6xl">
//           {/* Left Side - Login Form */}
//           <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full md:w-1/2">
//             <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
//               Login
//             </h1>

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

//             {/* Forget Password Link */}
//             <div className="text-right mb-6">
//               <a href="/reset-password" className="text-sm text-blue-500 hover:underline">
//                 Forget Password?
//               </a>
//             </div>

//             {/* Sign In Button */}
//             <button
//               className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={handleSubmit}
//             >
//               Login
//             </button>

//             {/* Social Login Buttons */}
//             {/* <div className="mt-6 space-y-4">
//               <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
//                 <FaGoogle className="text-black-500" />
//                 Sign in with Google
//               </button>
//               <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
//                 <FaMobileAlt className="text-black-500" />
//                 Sign in with Mobile Number
//               </button>
//               <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
//                 <FaApple className="text-black" />
//                 Sign in with Apple
//               </button>
//             </div> */}

//             {/* Sign Up Link */}
//             <div className="mt-6 text-center">
//               <p className="text-sm">
//                 Don't have an account?{" "}
//                 <a href="/SignUp" className="text-blue-500 hover:underline">
//                   Sign Up
//                 </a>
//               </p>
//             </div>
//           </div>

//           {/* Right Side - Image Container */}
//           <div className="w-full md:w-1/2 mt-8 md:mt-0">
//             <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
//               <Image
//                 src="/images/Logins.jpg" // Replace with your image path
//                 alt="Login Image"
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












// yashveer

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import SignIn from '@/components/SignIn'
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("/api/login-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save JWT Token to localStorage or cookies
        localStorage.setItem("authToken", email);
        setMessage("Login successful!");
        router.push("/DashboardTabs"); // Redirect to Dashboard
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong while logging in.");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
          <div className="flex flex-wrap items-stretch w-full max-w-6xl">
            <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg w-full md:w-1/2">
              <h1 className="text-2xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Login</h1>
              <div className="w-[100px] h-1 bg-pink-500 mx-auto mt-2 rounded-full mb-5"></div>

              <SignIn />
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border p-2 rounded-2xl transition duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border p-2 rounded-2xl transition duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="text-right mb-6">
                  <a href="/reset-password" className="text-sm text-blue-500 hover:underline">
                    Forget Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="text-lg w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </form>

              {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}

              <div className="mt-6 text-center">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <a href="/SignUp" className="text-blue-500 hover:underline">
                    Sign Up
                  </a>
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
                <Image src="/images/Logins.jpg" alt="Login Image" fill className="rounded-lg object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}






