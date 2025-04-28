'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Container from "@/components/Container"; // Import Container as a component

interface Product {
  id: number;
  name: string;
  category: string;
  photos: string[]; // Array of base64 strings
  quality: string;
  price: string;
  clientId: string; // Unique identifier for the client who added the product
}

export default function CombinedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For modal
  const [currentClientId, setCurrentClientId] = useState('client123'); // Example: Hardcoded client ID

  const [product, setProduct] = useState({
    id: 0,
    name: '',
    category: '',
    photos: [] as string[], // Define photos as string[]
    quality: '',
    price: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    category: '',
    photos: '',
    quality: '',
    price: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    // Clear error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Convert new files to base64 strings
    const newBase64Photos = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file); // Convert file to base64
          reader.onload = () => resolve(reader.result as string); // Resolve with base64 string
        });
      })
    );

    // Append new photos to the existing photos array
    setProduct((prevProduct) => ({
      ...prevProduct,
      photos: [...prevProduct.photos, ...newBase64Photos],
    }));
    // Clear photo error when files are uploaded
    setErrors((prevErrors) => ({ ...prevErrors, photos: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      category: '',
      photos: '',
      quality: '',
      price: '',
    };

    // Validate Product Name
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required.';
    } else if (product.name.trim().length < 3) {
      newErrors.name = 'Product name must be at least 3 characters.';
    }

    // Validate Category
    if (!product.category) {
      newErrors.category = 'Category is required.';
    }

    // Validate Photos
    if (product.photos.length < 5) {
      newErrors.photos = 'Please upload at least 5 photos.';
    }

    // Validate Quality
    if (!product.quality.trim()) {
      newErrors.quality = 'Quality is required.';
    } else if (product.quality.trim().length < 3) {
      newErrors.quality = 'Quality must be at least 3 characters.';
    }

    // Validate Price
    if (!product.price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (!/^\d+(\.\d{1,2})?$/.test(product.price.trim())) {
      newErrors.price = 'Please enter a valid price (e.g., 100 or 100.50).';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error); // Return true if no errors
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const isFormValid = validateForm();
    if (!isFormValid) return;

    // Local storage se existing products nikalna
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // New product ko add karna
    const newProduct = { ...product, id: Date.now() }; // Unique ID generate karna
    const updatedProducts = [...existingProducts, newProduct];

    // Local storage mein save karna
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert('Product added successfully!');
    setProduct({ id: 0, name: '', category: '', photos: [], quality: '', price: '' }); // Form reset
  };

  return (
    <>
      <Navbar
        onSearch={handleSearchChange} // Pass handleSearchChange as onSearch prop
        onProductClick={(productId: number) => console.log('Product Clicked:', productId)} // Example onProductClick
      />
      <Container className="p-4"> {/* Add className prop here */}
        <div>
          {/* Add Product Form */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
    
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="manufacturing">Manufacturing</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div>
          <label className="block">Upload At Least 5 Photos</label>
          <input
            type="file"
            name="photos"
            onChange={handlePhotoChange}
            multiple // Allow multiple file selection
            className="w-full p-2 border rounded"
            required
          />
          {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
        </div>
        {/* Display uploaded images with labels */}
        <div className="flex flex-wrap gap-2">
          {product.photos.map((photo, index) => (
            <div key={index} className="text-center">
              <img
                src={photo} // Use base64 string directly
                alt={`Uploaded ${index}`}
                className="w-24 h-24 object-cover rounded"
              />
              <p className="text-sm mt-1">Uploaded {index}</p>
            </div>
          ))}
        </div>
        <div>
          <label className="block">Quality</label>
          <input
            type="text"
            name="quality"
            value={product.quality}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.quality && <p className="text-red-500 text-sm">{errors.quality}</p>}
        </div>
        <div>
          <label className="block">Price (INR, Rs, $)</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
         </form>
          </div>

          {/* Search Products Section */}
          <div>
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
        </div>
      </Container>
    </>
  );
}