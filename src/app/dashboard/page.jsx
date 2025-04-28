"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  // Product form state
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    inStock: false
  });

  // Supplier form state
  const [supplier, setSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    contractDate: ''
  });

  // Errors state
  const [errors, setErrors] = useState({
    product: {},
    supplier: {}
  });

  // Handle product input change
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle supplier input change
  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value
    });
  };

  // Validate product form
  const validateProduct = () => {
    const newErrors = {};
    
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.price) newErrors.price = 'Price is required';
    else if (isNaN(product.price)) newErrors.price = 'Price must be a number';
    if (!product.category) newErrors.category = 'Category is required';
    
    setErrors({...errors, product: newErrors});
    return Object.keys(newErrors).length === 0;
  };

  // Validate supplier form
  const validateSupplier = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!supplier.name.trim()) newErrors.name = 'Supplier name is required';
    if (!supplier.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(supplier.email)) newErrors.email = 'Invalid email format';
    if (!supplier.phone) newErrors.phone = 'Phone is required';
    if (!supplier.address) newErrors.address = 'Address is required';
    if (!supplier.contractDate) newErrors.contractDate = 'Contract date is required';
    
    setErrors({...errors, supplier: newErrors});
    return Object.keys(newErrors).length === 0;
  };

  // Handle product form submit
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (validateProduct()) {
      // Submit logic here
      console.log('Product submitted:', product);
      alert('Product details submitted successfully!');
    }
  };

  // Handle supplier form submit
  const handleSupplierSubmit = (e) => {
    e.preventDefault();
    if (validateSupplier()) {
      // Submit logic here
      console.log('Supplier submitted:', supplier);
      alert('Supplier details submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard | Product Management</title>
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleProductSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="product-name">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  value={product.name}
                  onChange={handleProductChange}
                  className={`w-full px-3 py-2 border ${errors.product.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.product.name && <p className="text-red-500 text-sm mt-1">{errors.product.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="product-price">
                  Price (₹)*
                </label>
                <input
                  type="text"
                  id="product-price"
                  name="price"
                  value={product.price}
                  onChange={handleProductChange}
                  className={`w-full px-3 py-2 border ${errors.product.price ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.product.price && <p className="text-red-500 text-sm mt-1">{errors.product.price}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="product-category">
                  Category*
                </label>
                <select
                  id="product-category"
                  name="category"
                  value={product.category}
                  onChange={handleProductChange}
                  className={`w-full px-3 py-2 border ${errors.product.category ? 'border-red-500' : 'border-gray-300'} rounded`}
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="groceries">Groceries</option>
                  <option value="furniture">Furniture</option>
                </select>
                {errors.product.category && <p className="text-red-500 text-sm mt-1">{errors.product.category}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="product-description">
                  Description
                </label>
                <textarea
                  id="product-description"
                  name="description"
                  value={product.description}
                  onChange={handleProductChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="product-inStock"
                  name="inStock"
                  checked={product.inStock}
                  onChange={handleProductChange}
                  className="mr-2"
                />
                <label htmlFor="product-inStock" className="text-gray-700">
                  In Stock
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Save Product
              </button>
            </form>
          </div>

          {/* Supplier Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
            <form onSubmit={handleSupplierSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplier-name">
                  Supplier Name*
                </label>
                <input
                  type="text"
                  id="supplier-name"
                  name="name"
                  value={supplier.name}
                  onChange={handleSupplierChange}
                  className={`w-full px-3 py-2 border ${errors.supplier.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.supplier.name && <p className="text-red-500 text-sm mt-1">{errors.supplier.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplier-email">
                  Email*
                </label>
                <input
                  type="email"
                  id="supplier-email"
                  name="email"
                  value={supplier.email}
                  onChange={handleSupplierChange}
                  className={`w-full px-3 py-2 border ${errors.supplier.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.supplier.email && <p className="text-red-500 text-sm mt-1">{errors.supplier.email}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplier-phone">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="supplier-phone"
                  name="phone"
                  value={supplier.phone}
                  onChange={handleSupplierChange}
                  className={`w-full px-3 py-2 border ${errors.supplier.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.supplier.phone && <p className="text-red-500 text-sm mt-1">{errors.supplier.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplier-address">
                  Address*
                </label>
                <textarea
                  id="supplier-address"
                  name="address"
                  value={supplier.address}
                  onChange={handleSupplierChange}
                  className={`w-full px-3 py-2 border ${errors.supplier.address ? 'border-red-500' : 'border-gray-300'} rounded`}
                  rows="3"
                ></textarea>
                {errors.supplier.address && <p className="text-red-500 text-sm mt-1">{errors.supplier.address}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="supplier-contractDate">
                  Contract Date*
                </label>
                <input
                  type="date"
                  id="supplier-contractDate"
                  name="contractDate"
                  value={supplier.contractDate}
                  onChange={handleSupplierChange}
                  className={`w-full px-3 py-2 border ${errors.supplier.contractDate ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.supplier.contractDate && <p className="text-red-500 text-sm mt-1">{errors.supplier.contractDate}</p>}
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save Supplier
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}