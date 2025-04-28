"use client"; // Client-side component

import React from 'react';

const BuyNowButton = ({ productId }) => {
  const handleBuyNow = () => {
    alert(`Buy Now clicked for product ID: ${productId}`);
    // Add your payment gateway logic here
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Buy Now
    </button>
  );
};

export default BuyNowButton;