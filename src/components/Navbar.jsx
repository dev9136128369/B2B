// "use client";
// import React, { useState } from 'react';
// import styles from "@/styles/header.module.css";
// import Container from "./Container";
// import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
// import Link from 'next/link';

// const Navbar = ({ onSearch, onProductClick }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleProductsDropdown = () => {
//     setIsProductsDropdownOpen(!isProductsDropdownOpen);
//   };

//   // Products data
//   const products = [
//     { id: 1, name: "RecentlyAdded" },
//     { id: 2, name: "FeaturedProduct" },
//     { id: 4, name: "ClothProduct" },
//     { id: 5, name: "ManufacturingProduct" },
//     { id: 6, name: "Product 5" },
//   ];

//   return (
//     <header className={`${styles.header} py-3 px-1 `}>
//       <Container className='flex justify-between items-center'>
//         {/* Logo */}
//         <div className='flex items-center '>
//           <span className='text-custom-orange font-bold text-4xl'>UpSale<b className='text-white'>.</b></span>
//         </div>

//         {/* Search Bar (Desktop) */}
//         <div className={`${styles.searchBar} hidden md:flex items-center`}>
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type='text'
//               placeholder='Search for products...'
//               className={styles.searchinput}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className={styles.searchButton}>
//               <FiSearch size={18} />
//             </button>
//           </form>
//         </div>

//         {/* Hamburger Menu (Mobile) */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
//             {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* NavBar (Desktop) */}
//         <div className="hidden md:flex">
//           <NavBar toggleProductsDropdown={toggleProductsDropdown} isProductsDropdownOpen={isProductsDropdownOpen} />
//         </div>

//         {/* Mobile Menu (Dropdown) */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <div className="px-4 py-2">
//               {/* Search Bar (Mobile) */}
//               <div className={`${styles.searchBar} flex items-center mb-4`}>
//                 <form onSubmit={handleSearch} className="flex w-full">
//                   <input
//                     type='text'
//                     placeholder='Search for products...'
//                     className={`${styles.searchinput} flex-grow`}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <button type="submit" className={styles.searchButton}>
//                     <FiSearch size={18} />
//                   </button>
//                 </form>
//               </div>

//               {/* NavBar (Mobile) */}
//               <NavBar isMobile toggleProductsDropdown={toggleProductsDropdown} isProductsDropdownOpen={isProductsDropdownOpen} />
//             </div>
//           </div>
//         )}

//         {/* Products Dropdown (Desktop) */}
//         {isProductsDropdownOpen && (
//           <div className="absolute top-16 right-80 me-20 bg-white shadow-lg rounded-lg p-4">
//             <ul>
//               {products.map(product => (
//                 <li key={product.id} className="py-2">
//                   <button
//                     onClick={() => onProductClick(product.id)} // Product par click karne par parent component ko inform karein
//                     className="text-black hover:text-pink-500"
//                   >
//                     {product.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </Container>
//     </header>
//   );
// };

// export default Navbar;

// const NavBar = ({ isMobile = false, toggleProductsDropdown, isProductsDropdownOpen }) => {
//   return (
//     <nav className={`flex ${isMobile ? 'flex-col' : 'items-center gap-5'}`}>
//       <ul className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-7'} font-semibold`}>
//         {/* <li className={styles.navLink}>
//           <Link href={"/"}>Home</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/about"}>About Us</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/store"} className='text-1xl'>Store</Link>
//         </li> */}
//         <li className={styles.navLink}>
//           <Link href={"/partner-form"} className='text-1xl'>partner
          
//           </Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/supplier-form"} className='text-1xl'>supplier
          
//           </Link>
//         </li>
//         {/* <li className={styles.navLink}>
//           <Link href={"/DashboardTabs"} className='text-1xl'>dashboard
//           </Link>
//         </li> */}
//         {/* <li className={styles.navLink}>
//           <button onClick={toggleProductsDropdown} className="flex items-center gap-1">
//             Products <FiChevronDown />
//           </button>
//         </li> */}
//         <li className={styles.navLink}>
//           <Link href={"/contact"} className='text-1xl'>Contact Us</Link>
//         </li>
//         <button className="bg-blue-500 py-1 px-4 rounded text-pink-600">
//           <a href={"/Login"} className='text-white  hover:text-pink-500'>Login</a>
//         </button>
//         <button className="bg-blue-500 py-1 px-4 rounded text-pink-600">
//           <a href={"/SignUp"} className='text-white  hover:text-pink-500'>Sign Up</a>
//         </button>
//       </ul>
//       {/* <div className={`flex ${isMobile ? 'mt-4' : 'items-center gap-4'}`}>
//         <div className='relative'>
//           <a href='#Recentproduct'>
//           <FiShoppingCart color='black' size={24} />
//           <span className={`${styles.cartBadge} absolute top-[-15px] right-[-20px] bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>3</span>
//           </a>
//         </div>
//       </div> */}
//     </nav>
//   );
// };

// "use client";
// import React, { useState } from 'react';
// import styles from "@/styles/header.module.css";
// import Container from "./Container";
// import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
// import Link from 'next/link';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import Image from 'next/image';

// const Navbar = ({ onSearch, onProductClick }) => {
//   const { data: session } = useSession();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleProductsDropdown = () => {
//     setIsProductsDropdownOpen(!isProductsDropdownOpen);
//   };

//   // Products data
//   const products = [
//     { id: 1, name: "RecentlyAdded" },
//     { id: 2, name: "FeaturedProduct" },
//     { id: 4, name: "ClothProduct" },
//     { id: 5, name: "ManufacturingProduct" },
//     { id: 6, name: "Product 5" },
//   ];

//   return (
//     <header className={`${styles.header} py-3 px-1`}>
//       <Container className='flex justify-between items-center'>
//         {/* Logo */}
//         <div className='flex items-center'>
//           <span className='text-custom-orange font-bold text-4xl'>UpSale<b className='text-white'>.</b></span>
//         </div>

//         {/* Search Bar (Desktop) */}
//         <div className={`${styles.searchBar} hidden md:flex items-center`}>
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type='text'
//               placeholder='Search for products...'
//               className={styles.searchinput}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className={styles.searchButton}>
//               <FiSearch size={18} />
//             </button>
//           </form>
//         </div>

//         {/* Hamburger Menu (Mobile) */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
//             {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* NavBar (Desktop) */}
//         <div className="hidden md:flex">
//           <NavBar 
//             toggleProductsDropdown={toggleProductsDropdown} 
//             isProductsDropdownOpen={isProductsDropdownOpen}
//             session={session}
//           />
//         </div>

//         {/* Mobile Menu (Dropdown) */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <div className="px-4 py-2">
//               {/* Search Bar (Mobile) */}
//               <div className={`${styles.searchBar} flex items-center mb-4`}>
//                 <form onSubmit={handleSearch} className="flex w-full">
//                   <input
//                     type='text'
//                     placeholder='Search for products...'
//                     className={`${styles.searchinput} flex-grow`}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <button type="submit" className={styles.searchButton}>
//                     <FiSearch size={18} />
//                   </button>
//                 </form>
//               </div>

//               {/* NavBar (Mobile) */}
//               <NavBar 
//                 isMobile 
//                 toggleProductsDropdown={toggleProductsDropdown} 
//                 isProductsDropdownOpen={isProductsDropdownOpen}
//                 session={session}
//               />
//             </div>
//           </div>
//         )}

//         {/* Products Dropdown (Desktop) */}
//         {isProductsDropdownOpen && (
//           <div className="absolute top-16 right-80 me-20 bg-white shadow-lg rounded-lg p-4 z-50">
//             <ul>
//               {products.map(product => (
//                 <li key={product.id} className="py-2">
//                   <button
//                     onClick={() => {
//                       onProductClick(product.id);
//                       setIsProductsDropdownOpen(false);
//                     }}
//                     className="text-black hover:text-pink-500"
//                   >
//                     {product.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </Container>
//     </header>
//   );
// };

// const NavBar = ({ 
//   isMobile = false, 
//   toggleProductsDropdown, 
//   isProductsDropdownOpen,
//   session 
// }) => {
//   return (
//     <nav className={`flex ${isMobile ? 'flex-col' : 'items-center gap-5'}`}>
//       <ul className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-7'} font-semibold`}>
//         <li className={styles.navLink}>
//           <Link href={"/partner-form"} className='text-1xl'>Partner</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/supplier-form"} className='text-1xl'>Supplier</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/contact"} className='text-1xl'>Contact Us</Link>
//         </li>
        
//         {/* Conditional rendering based on auth status */}
//         {session ? (
//           <>
//             <li className="flex items-center gap-2">
//               {session.user?.image && (
//                 <Image 
//                   src={session.user.image} 
//                   alt="Profile" 
//                   width={32} 
//                   height={32}
//                   className="rounded-full"
//                 />
//               )}
//               <button 
//                 onClick={() => signOut()}
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <button 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//                 onClick={() => signIn('google')}
//               >
//                 Google Login
//               </button>
//             </li>
//             <li>
//               <Link 
//                 href={"/Login"} 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 href={"/SignUp"} 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Sign Up
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
      
//       {!isMobile && (
//         <div className="flex items-center gap-4">
//           <div className='relative'>
//             <Link href='/cart'>
//               <FiShoppingCart color='black' size={24} />
//               <span className={`${styles.cartBadge} absolute top-[-15px] right-[-20px] bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>3</span>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
















//Yashveer

// 'use client';

// import { useSession, signIn, signOut } from 'next-auth/react';
// import { useState } from 'react';
// import styles from "@/styles/header.module.css";
// import Container from "./Container";
// import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
// import Link from 'next/link';
// import Image from 'next/image';

// const Navbar = ({ onSearch, onProductClick }) => {
//   const { data: session } = useSession();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className={`${styles.header} py-3 px-1`}>
//       <Container className='flex justify-between items-center'>
//         {/* Logo */}
//         <div className='flex items-center'>
//           <span className='text-custom-orange font-bold text-4xl'>UpSale<b className='text-white'>.</b></span>
//         </div>

//         {/* Search Bar */}
//         <div className={`${styles.searchBar} hidden md:flex items-center`}>
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type='text'
//               placeholder='Search for products...'
//               className={styles.searchinput}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className={styles.searchButton}>
//               <FiSearch size={18} />
//             </button>
//           </form>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
//             {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex">
//           <NavBar session={session} />
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <div className="px-4 py-2">
//               <NavBar isMobile session={session} />
//             </div>
//           </div>
//         )}
//       </Container>
//     </header>
//   );
// };

// const NavBar = ({ isMobile = false, session }) => {
//   return (
//     <nav className={`flex ${isMobile ? 'flex-col' : 'items-center gap-5'}`}>
//       <ul className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-7'} font-semibold`}>
//         <li className={styles.navLink}>
//           <Link href={"/partner-form"}>Partner</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/supplier-form"}>Supplier</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/contact"}>Contact Us</Link>
//         </li>
        
//         {session ? (
//           <>
//             <li className="flex items-center gap-4">
//               {session.user?.image && (
//                 <Image 
//                   src={session.user.image} 
//                   alt="Profile" 
//                   width={32} 
//                   height={32}
//                   className="rounded-full"
//                 />
//               )}
//               <button 
//                 onClick={() => signOut()}
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               {/* <button 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//                 onClick={() => signIn('google')}
//               >
//                 Google Login
//               </button> */}
//             </li>
//             <li>
//               <Link 
//                 href={"/Login"} 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 href={"/SignUp"} 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Sign Up
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;













//sagar 






// 'use client';

// import { useSession, signIn, signOut } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import styles from "@/styles/header.module.css";
// import Container from "./Container";
// import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
// import Link from 'next/link';
// import Image from 'next/image';
// import FormHam from '@/components/FormHam';

// const Navbar = ({ onSearch, onProductClick }) => {
//   const { data: session } = useSession();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className={`${styles.header} py-3 px-1`}>
//       <Container className='flex justify-between items-center'>
//         {/* Logo */}
//         <div className='flex items-center'>
//           <span className='text-custom-orange font-bold text-4xl'>UpSale<b className='text-white'>.</b></span>
//         </div>

//         {/* Search Bar */}
//         <div className={`${styles.searchBar} hidden md:flex items-center`}>
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type='text'
//               placeholder='Search for products...'
//               className={styles.searchinput}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className={styles.searchButton}>
//               <FiSearch size={18} />
//             </button>
//           </form>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
//             {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex">
//           <NavBar session={session} />
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <div className="px-4 py-2">
//               <NavBar isMobile session={session} />
//             </div>
//           </div>
//         )}
//       </Container>
//     </header>
//   );
// };

// const NavBar = ({ isMobile = false, session }) => {
//   const [localEmail, setLocalEmail] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showFormComponent, setShowFormComponent] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const email = localStorage.getItem('authToken');
//       setLocalEmail(email);
//     }
//   }, []);

//   const isLoggedIn = session || localEmail;

//   const handleLogout = () => {
//     if (session) {
//       signOut(); // NextAuth logout
//     } else {
//       localStorage.removeItem('email');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//       window.location.reload();
//     }
//   };

//   const handleFormClick = () => {
//     setShowFormComponent(true);
//     setShowDropdown(false); // close dropdown when form opens
//   };

//   return (
//     <nav className={`flex ${isMobile ? 'flex-col' : 'items-center gap-5'}`}>
//       <ul className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-7'} font-semibold`}>
//         <li className={styles.navLink}>
//           <Link href={"/partner-form"}>Partner</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/supplier-form"}>Supplier</Link>
//         </li>
//         <li className={styles.navLink}>
//           <Link href={"/contact"}>Contact Us</Link>
//         </li>

//         {isLoggedIn ? (
//           <li className="flex items-center gap-2 relative">
//             {session?.user?.image && (
//               <Image 
//                 src={session.user.image} 
//                 alt="Profile" 
//                 width={32} 
//                 height={32}
//                 className="rounded-full"
//               />
//             )}
//             <button 
//               onClick={handleLogout}
//               className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//             >
//               Logout
//             </button>

//             {/* Hamburger Icon */}
//             <button 
//               onClick={() => setShowDropdown(!showDropdown)} 
//               className="ml-2 text-black focus:outline-none"
//             >
//               <FiMenu size={22} />
//             </button>

//             {/* Dropdown */}
//             {showDropdown && (
//               <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 p-2 z-50">
//                 <button 
//                   onClick={handleFormClick}
//                   className="w-full text-left hover:bg-gray-100 px-3 py-2 rounded"
//                 >
//                   Form
//                 </button>
//               </div>
//             )}

//             {/* Form Component */}
//             {showFormComponent && (
//               <div className="absolute top-[70px] right-0 bg-white shadow-xl rounded-md p-4 z-50 w-96">
//                 <FormHam />
//               </div>
//             )}
//           </li>
//         ) : (
//           <>
//             <li>
//               <Link 
//                 href={"/Login"} 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 href={"/SignUp"} 
//                 className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
//               >
//                 Sign Up
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

















'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from "@/styles/header.module.css";
import Container from "./Container";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = ({ onSearch, onProductClick }) => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} py-3 px-1`}>
      <Container className='flex justify-between items-center'>
        <div className='flex items-center'>
          <span className='text-custom-orange font-bold text-4xl'>UpSale<b className='text-white'>.</b></span>
        </div>

        <div className={`${styles.searchBar} hidden md:flex items-center`}>
          <form onSubmit={handleSearch} className="flex">
            <input
              type='text'
              placeholder='Search for products...'
              className={styles.searchinput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>
              <FiSearch size={18} />
            </button>
          </form>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex">
          <NavBar session={session} />
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2">
              <NavBar isMobile session={session} />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

const NavBar = ({ isMobile = false, session }) => {
  const [localEmail, setLocalEmail] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('authToken');
      setLocalEmail(email);
    }
  }, []);

  const isLoggedIn = session || localEmail;

  const handleLogout = () => {
    if (session) {
      signOut();
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.reload();
    }
  };

  const handleFormClick = () => {
    setShowDropdown(false);
    router.push('/form-hamburger');
  };

  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'items-center gap-5'}`}>
      <ul className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-7'} font-semibold`}>
        <li className={styles.navLink}>
          <Link href={"/partner-form"}>Partner</Link>
        </li>
        <li className={styles.navLink}>
          <Link href={"/supplier-form"}>Supplier</Link>
        </li>
        <li className={styles.navLink}>
          <Link href={"/contact"}>Contact Us</Link>
        </li>

        {isLoggedIn ? (
          <li className="flex items-center gap-2 relative">
            {session?.user?.image && (
              <Image 
                src={session.user.image} 
                alt="Profile" 
                width={32} 
                height={32}
                className="rounded-full"
              />
            )}
            <button 
              onClick={handleLogout}
              className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
            >
              Logout
            </button>

            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              className="ml-2 text-black focus:outline-none"
            >
              <FiMenu size={22} />
            </button>

            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 p-2 z-50">
                <button 
                  onClick={handleFormClick}
                  className="w-full text-left hover:bg-gray-100 px-3 py-2 rounded"
                >
                  Form
                </button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link 
                href={"/Login"} 
                className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                href={"/SignUp"} 
                className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
