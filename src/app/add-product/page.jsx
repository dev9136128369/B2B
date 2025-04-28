// 'use client';

// import { useState } from 'react';

// export default function AddProduct() {
//   const [product, setProduct] = useState({
//     id: 0,
//     name: '',
//     category: '',
//     photos: [], // This will store base64 strings
//     quality: '',
//     price: '',
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     category: '',
//     photos: '',
//     quality: '',
//     price: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//     // Clear error when user starts typing
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//   };

//   const handlePhotoChange = async (e) => {
//     const files = Array.from(e.target.files || []);

//     // Convert new files to base64 strings
//     const newBase64Photos = await Promise.all(
//       files.map((file) => {
//         return new Promise((resolve) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file); // Convert file to base64
//           reader.onload = () => resolve(reader.result); // Resolve with base64 string
//         });
//       })
//     );

//     // Append new photos to the existing photos array
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       photos: [...prevProduct.photos, ...newBase64Photos],
//     }));
//     // Clear photo error when files are uploaded
//     setErrors((prevErrors) => ({ ...prevErrors, photos: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: '',
//       category: '',
//       photos: '',
//       quality: '',
//       price: '',
//     };

//     // Validate Product Name
//     if (!product.name.trim()) {
//       newErrors.name = 'Product name is required.';
//     } else if (product.name.trim().length < 3) {
//       newErrors.name = 'Product name must be at least 3 characters.';
//     }

//     // Validate Category
//     if (!product.category) {
//       newErrors.category = 'Category is required.';
//     }

//     // Validate Photos
//     if (product.photos.length < 5) {
//       newErrors.photos = 'Please upload at least 5 photos.';
//     }

//     // Validate Quality
//     if (!product.quality.trim()) {
//       newErrors.quality = 'Quality is required.';
//     } else if (product.quality.trim().length < 3) {
//       newErrors.quality = 'Quality must be at least 3 characters.';
//     }

//     // Validate Price
//     if (!product.price.trim()) {
//       newErrors.price = 'Price is required.';
//     } else if (!/^\d+(\.\d{1,2})?$/.test(product.price.trim())) {
//       newErrors.price = 'Please enter a valid price (e.g., 100 or 100.50).';
//     }

//     setErrors(newErrors);
//     return Object.values(newErrors).every((error) => !error); // Return true if no errors
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate form
//     const isFormValid = validateForm();
//     if (!isFormValid) return;

//     // Local storage se existing products nikalna
//     const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

//     // New product ko add karna
//     const newProduct = { ...product, id: Date.now() }; // Unique ID generate karna
//     const updatedProducts = [...existingProducts, newProduct];

//     // Local storage mein save karna
//     localStorage.setItem('products', JSON.stringify(updatedProducts));

//     alert('Product added successfully!');
//     setProduct({ id: 0, name: '', category: '', photos: [], quality: '', price: '' }); // Form reset
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//         </div>
//         <div>
//           <label className="block">Category</label>
//           <select
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="electronics">Electronics</option>
//             <option value="clothing">Clothing</option>
//             <option value="manufacturing">Manufacturing</option>
//           </select>
//           {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
//         </div>
//         <div>
//           <label className="block">Upload At Least 5 Photos</label>
//           <input
//             type="file"
//             name="photos"
//             onChange={handlePhotoChange}
//             multiple // Allow multiple file selection
//             className="w-full p-2 border rounded"
//             required
//           />
//           {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
//         </div>
//         {/* Display uploaded images with labels */}
//         <div className="flex flex-wrap gap-2">
//           {product.photos.map((photo, index) => (
//             <div key={index} className="text-center">
//               <img
//                 src={photo} // Use base64 string directly
//                 alt={`Uploaded ${index}`}
//                 className="w-24 h-24 object-cover rounded"
//               />
//               <p className="text-sm mt-1">Uploaded {index}</p>
//             </div>
//           ))}
//         </div>
//         <div>
//           <label className="block">Quality</label>
//           <input
//             type="text"
//             name="quality"
//             value={product.quality}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           {errors.quality && <p className="text-red-500 text-sm">{errors.quality}</p>}
//         </div>
//         <div>
//           <label className="block">Price (INR, Rs, $)</label>
//           <input
//             type="text"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    category: '',
    photos: [], // This will store base64 strings
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    // Clear error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files || []);

    // Convert new files to base64 strings
    const newBase64Photos = await Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file); // Convert file to base64
          reader.onload = () => resolve(reader.result); // Resolve with base64 string
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

  const handleSubmit = (e) => {
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
    <div className="p-4">
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
  );
}