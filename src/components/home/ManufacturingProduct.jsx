"use client";
import React, { useEffect, useState } from 'react';
import Container from "@/components/Container";
import ProductBox from "@/components/ProductBox";
import { useRouter } from 'next/navigation';

const ManufacturingProduct = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products/category/electronics');
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

 

  return (
    <div className="bg-gray-100 p-3">
      <Container>
        <h1 className="text-center text-3xl font-bold">Manufacturing Product</h1>
        <div className="my-4 grid grid-cols-5 gap-3">
          {filteredProducts.map((prod) => (
            <ProductBox key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ManufacturingProduct;