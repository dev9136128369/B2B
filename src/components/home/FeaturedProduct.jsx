"use client";
import Container from "@/components/Container";
import ProductBox from "@/components/ProductBox"; // Correct import
import React, { useEffect, useState } from 'react';

const FeaturedProduct = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("https://fakestoreapi.in/api/products?page=2");
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((prod) =>
    prod?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="bg-gray-100 p-3">
      <Container>
        <h1 className="text-center text-3xl font-bold">Featured Products</h1>
        <div className="my-4 grid grid-cols-5 gap-3">
          {filteredProducts.map((prod) => (
            <ProductBox key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProduct;