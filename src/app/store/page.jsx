"use client"; // Client-side component banane ke liye
import Container from "@/components/Container";
import React, { useState } from 'react';
import { getCategories, getProducts } from '@/library';
import ProductBox from "@/components/ProductBox";

import Navbar from "@/components/Navbar"


const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category ko track karne ke liye
  const [products, setProducts] = React.useState([]); // All products ko store karne ke liye

  // Fetch all products on component mount
  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <><Navbar/>
    <Container className="grid grid-cols-5 gap-3">
      <CategoryListing
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductListing products={filteredProducts} />
    </Container>
    </>
    
  );
};

export default StorePage;

const CategoryListing = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = React.useState([]);

  // Fetch categories on component mount
  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="sticky top-0 h-screen overflow-y-auto">
      <ul>
        <li
          className={`p-2 border my-2 cursor-pointer ${
            selectedCategory === null ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          ALL CATEGORIES
        </li>
        {categories.map((d, i) => (
          <li
            className={`p-2 border my-2 cursor-pointer ${
              selectedCategory === d ? "bg-blue-500 text-white" : "bg-white"
            }`}
            key={"category" + i}
            onClick={() => setSelectedCategory(d)}
          >
            {d.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductListing = ({ products }) => {
  if (!Array.isArray(products)) {
    console.error("Products data is not an array:", products);
    return <p className="text-red-500">Error loading products</p>;
  }

  return (
    <div className="col-span-4 grid grid-cols-3 gap-5 mt-3">
      {products.length > 0 ? (
        products.map((d) => <ProductBox product={d} key={"product-" + d.id} />)
      ) : (
        <p className="text-gray-500">No products available</p>
      )}
    </div>
  );
};