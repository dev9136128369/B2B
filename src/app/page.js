// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);

//   // Local storage se products fetch karna
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//     setProducts(storedProducts);
//   }, []);

//   // Search functionality
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Search Products</h1>
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="border p-4 rounded">
//             <img
//               src={URL.createObjectURL(product.photos[0])} // Display uploaded photo
//               alt={product.name}
//               className="w-full h-48 object-cover"
//             />
//             <h2 className="text-xl font-bold mt-2">{product.name}</h2>
//             <p>Quality: {product.quality}</p>
//             <p>Price: {product.price}</p>
//             <button className="bg-green-500 text-white p-2 rounded mt-2">
//               Purchase
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









//Yashveer

'use client'; // Add this if you make the entire layout client-side

import { SessionProvider } from 'next-auth/react';
// ... other imports

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <Navbar />
          {children}
          <PopupForm />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}




