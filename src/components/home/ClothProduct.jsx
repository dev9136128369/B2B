// "use client";
// import React, { useEffect, useState } from 'react';
// import Container from "@/components/Container";
// import ProductBox from "@/components/ProductBox";

// const ClothProduct = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getProducts = async () => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data || []);
//     } catch (error) {
//       console.error(error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const filteredProducts = products.filter((prod) =>
//     prod?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-100 p-3">
//       <Container>
//         <h1 className="text-center text-3xl font-bold">Cloth Products</h1>
//         <div className="my-4 grid grid-cols-5 gap-3">
//           {filteredProducts.map((prod) => (
//             <ProductBox key={prod.id} product={prod} />
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ClothProduct;

"use client";
import Container from "@/components/Container";
import ClothProductBox from "@/components/ClothProductBox"; // Correct import
import React, { useEffect, useState } from 'react';

const ClothProduct = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("API Response:", data); // Debugging log
      setProducts(data); // Directly set the array
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Set products to an empty array in case of error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products?.filter((prod) =>
    prod?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  ) || []; // Fallback to an empty array

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  return (
    <div className="bg-gray-100 p-3">
      <Container>
        <h1 className="text-center text-3xl font-bold">Featured Products</h1>
        <div className="my-4 grid grid-cols-5 gap-3">
          {filteredProducts.map((prod) => (
            <ClothProductBox key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ClothProduct;