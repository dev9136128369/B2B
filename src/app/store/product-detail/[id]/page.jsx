import React from "react";
import { getProductById } from "@/library";
import Container from "@/components/Container";
import BuyNowButton from "@/components/BuyNowButton/page";

const ProductDetail = async ({ params }) => {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    return <div className="text-red-500">❌ Product not found</div>;
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.title || "Product Image"}
            className="w-full h-auto"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title || "No Title"}</h1>
          <p className="text-gray-700 mt-3">{product.description || "No Description Available"}</p>
          <p className="text-lg font-semibold mt-3">Price: ${product.price}</p>
          <p className="text-lg text-gray-800 mt-2">Category: {product.category}</p>
          <p className="text-lg text-gray-800 mt-2">Brand: {product.brand}</p>
          <p className="text-lg text-gray-800 mt-2">Model: {product.model}</p>
          <p className="text-lg text-gray-800 mt-2">Color: {product.color}</p>
          <p className="text-lg text-gray-800 mt-2 mb-3">Discount: {product.discount}%</p>
          <BuyNowButton productId={product.id} />
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;