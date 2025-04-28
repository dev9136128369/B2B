"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import HeroSection from "@/components/home/heroSection";
import ClothProduct from "@/components/home/ClothProduct"; // New Component
import ManufacturingProduct from "@/components/home/ManufacturingProduct"; // New Component

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeComponent, setActiveComponent] = useState("recent");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductClick = (productId: number) => {
    // Product ID ke hisab se component set karein
    if (productId === 1) {
      setActiveComponent("recent"); // Recently Added
    } else if (productId === 2) {
      setActiveComponent("featured"); // Featured Product
    } else if (productId === 4) {
      setActiveComponent("cloth"); // Cloth Product
    } else if (productId === 5) {
      setActiveComponent("manufacturing"); // Manufacturing Product
    } else {
      setActiveComponent("recent"); // Default
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} onProductClick={handleProductClick} />
      <HeroSection />
      {activeComponent === "recent" ? (
        <RecentlyAdded searchQuery={searchQuery} />
      ) : activeComponent === "featured" ? (
        <FeaturedProduct searchQuery={searchQuery} />
      ) : activeComponent === "cloth" ? (
        <ClothProduct searchQuery={searchQuery} />
      ) : (
        <ManufacturingProduct searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default HomePage;
















