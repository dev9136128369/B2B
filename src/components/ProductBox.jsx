import Link from 'next/link';

const ProductBox = ({ product }) => {
  if (!product) {
    return (
      <div className="border p-3 rounded-lg h-[400px] flex flex-col animate-pulse">
        <div className="flex-shrink-0 h-48 bg-gray-200 rounded-lg"></div>
        <div className="flex-grow mt-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/store/product-detail/${product.id}`}>
      <div className="border p-3 rounded-lg hover:shadow-lg cursor-pointer h-[400px] flex flex-col">
        {/* Image */}
        <div className="flex-shrink-0 h-48 overflow-hidden aspect-square">
          <img
            src={product.image || "/placeholder-image.jpg"}
            alt={product.title || "Product Image"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-grow mt-3">
          <h3 className="text-lg font-semibold line-clamp-2">
            {product.title || "No Title Available"}
          </h3>
          <p className="text-gray-700 mt-2">
            ${product.price || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductBox;