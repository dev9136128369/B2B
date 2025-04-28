

const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
// library.js

// Fetch categories
export const getCategories = async () => {
    const response = await fetch('https://fakestoreapi.in/api/products/category');
    const data = await response.json();
    return data.categories;
  };
  
  // Fetch products
  export const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.in/api/products');
    const data = await response.json();
    return data.products;
  };
  
  // Fetch product by ID
  // Fetch product by ID
export const getProductById = async (id) => {
    const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
    const data = await response.json();
    console.log(data); // API response ko debug karne ke liye
    return data.product; // Return `product` object
  };



  