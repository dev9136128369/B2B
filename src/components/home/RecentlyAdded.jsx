"use client";
import Container from "@/components/Container";
import React, { useEffect, useState } from 'react';
import ProductBox from "@/components/ProductBox";

const RecentlyAdded = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.in/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className='bg-gray-100 p-3' id="Recentproduct">
      <Container>
        <h1 className='text-center text-3xl font-bold'>Recently Added Products</h1>
        <div className="my-4 grid grid-cols-5 gap-3">
          {filteredProducts.map((prod) => (
            <ProductBox key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecentlyAdded;