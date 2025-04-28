// 'use client';

// import { useState, useEffect } from 'react';

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   photos: string[]; // Array of base64 strings
//   quality: string;
//   price: string;
//   clientId: string; // Unique identifier for the client who added the product
// }

// export default function SearchProduct() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null); // For modal
//   const [currentClientId, setCurrentClientId] = useState('client123'); // Example: Hardcoded client ID

//   // Fetch products from localStorage
//   useEffect(() => {
//     const storedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
//     setProducts(storedProducts);
//   }, []);

//   // Filter products based on search term
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle image click to open modal
//   const handleImageClick = (photo: string) => {
//     setSelectedImage(photo);
//   };

//   // Handle product deletion
//   const handleDeleteProduct = (productId: number, productClientId: string) => {
//     // Confirmation dialog
//     const isConfirmed = window.confirm('Are you sure you want to delete this product?');
//     if (!isConfirmed) return;

//     // Check if the current client is the owner of the product
//     if (productClientId !== currentClientId) {
//       alert('You are not authorized to delete this product.');
//       return;
//     }

//     // Filter out the product to be deleted
//     const updatedProducts = products.filter((product) => product.id !== productId);

//     // Update localStorage
//     localStorage.setItem('products', JSON.stringify(updatedProducts));

//     // Update state
//     setProducts(updatedProducts);

//     alert('Product deleted successfully!');
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Search Products</h1>
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="border p-4 rounded">
//             <div className="flex flex-wrap gap-2">
//               {product.photos.map((photo, index) => (
//                 <img
//                   key={index}
//                   src={photo} // Use base64 string directly
//                   alt={`Product ${product.name} - Image ${index + 1}`}
//                   className="w-24 h-24 object-cover rounded cursor-pointer"
//                   onClick={() => handleImageClick(photo)}
//                 />
//               ))}
//             </div>
//             <h2 className="text-xl font-bold mt-2">{product.name}</h2>
//             <p>Quality: {product.quality}</p>
//             <p>Price: {product.price}</p>
//             <div className="flex gap-2 mt-2">
//               <button className="bg-green-500 text-white p-2 rounded">
//                 Purchase
//               </button>
//               {/* Show delete button only if the current client is the owner */}
//               {product.clientId === currentClientId && (
//                 <button
//                   className="bg-red-500 text-white p-2 rounded"
//                   onClick={() => handleDeleteProduct(product.id, product.clientId)}
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for viewing images */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
//           <div className="bg-white p-4 rounded-lg max-w-2xl">
//             <img
//               src={selectedImage}
//               alt="Selected Product"
//               className="w-full h-auto rounded"
//             />
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="mt-4 bg-red-500 text-white p-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  photos: string[]; // Array of base64 strings
  quality: string;
  price: string;
  clientId: string; // Unique identifier for the client who added the product
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For modal
  const [currentClientId, setCurrentClientId] = useState('client123'); // Example: Hardcoded client ID

  // Fetch products from localStorage
  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle image click to open modal
  const handleImageClick = (photo: string) => {
    setSelectedImage(photo);
  };

  // Handle product deletion
  const handleDeleteProduct = (productId: number, productClientId: string) => {
    // Confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (!isConfirmed) return;

    // Check if the current client is the owner of the product
    if (productClientId !== currentClientId) {
      alert('You are not authorized to delete this product.');
      return;
    }

    // Filter out the product to be deleted
    const updatedProducts = products.filter((product) => product.id !== productId);

    // Update localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update state
    setProducts(updatedProducts);

    alert('Product deleted successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <div className="flex flex-wrap gap-2">
              {product.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo} // Use base64 string directly
                  alt={`Product ${product.name} - Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded cursor-pointer"
                  onClick={() => handleImageClick(photo)}
                />
              ))}
            </div>
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p>Quality: {product.quality}</p>
            <p>Price: {product.price}</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-green-500 text-white p-2 rounded">
                Purchase
              </button>
              {/* Show delete button only if the current client is the owner */}
              {product.clientId === currentClientId && (
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteProduct(product.id, product.clientId)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing images */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg max-w-2xl">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-auto rounded"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}