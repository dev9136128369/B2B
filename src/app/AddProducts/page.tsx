// 'use client';

// import { useState, useEffect } from 'react';
// import Navbar from "@/components/Navbar";
// import Container from "@/components/Container";

// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   photos: string[];
//   quality: string;
//   price: string;
//   clientId: string;
//   email: string;
// }

// const compressImage = async (
//   file: File,
//   maxWidth = 800,
//   maxHeight = 800,
//   quality = 0.7
// ): Promise<string> => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         let width = img.width;
//         let height = img.height;

//         if (width > height && width > maxWidth) {
//           height *= maxWidth / width;
//           width = maxWidth;
//         } else if (height > maxHeight) {
//           width *= maxHeight / height;
//           height = maxHeight;
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d')!;
//         ctx.drawImage(img, 0, 0, width, height);
//         resolve(canvas.toDataURL('image/jpeg', quality));
//       };
//       img.src = event.target!.result as string;
//     };
//     reader.readAsDataURL(file);
//   });
// };

// export default function ProductPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [currentClientId] = useState('client123');
//   const [currentEmail, setCurrentEmail] = useState('');

//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     photos: [] as string[],
//     quality: '',
//     price: '',
//     email: '',
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     category: '',
//     photos: '',
//     quality: '',
//     price: '',
//   });

//   // Load user email from localStorage
//   useEffect(() => {
//     const userData = localStorage.getItem("user")||localStorage.getItem("authToken");
//     if (userData) {
//       const parsed = JSON.parse(userData);
//       setCurrentEmail(parsed.email);
//     }
//   }, []);

//   // Load products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('');
//         const data = await res.json();
//         if (data.success) setProducts(data.data);
//         else console.error('Failed to fetch:', data.error);
//       } catch (error) {
//         console.error('Fetch error:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleImageClick = (photo: string) => {
//     setSelectedImage(photo);
//   };

//   const handleDeleteProduct = async (productId: string, productEmail: string) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;
//     if (productEmail !== currentEmail) {
//       alert('Not authorized to delete this product.');
//       return;
//     }
  
//     try {
//       const res = await fetch(`/api/products?id=${productId}&email=${currentEmail}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success) {
//         setProducts(products.filter((p) => p._id !== productId));
//       } else {
//         alert('Delete failed: ' + data.error);
//       }
//     } catch (error) {
//       alert('API error.');
//     }
//   };
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const files = Array.from(e.target.files);

//     if (files.length + product.photos.length > 10) {
//       setErrors((prev) => ({ ...prev, photos: 'Maximum 10 photos allowed' }));
//       return;
//     }

//     try {
//       const compressed = await Promise.all(files.map((f) => compressImage(f)));
//       setProduct((prev) => ({ ...prev, photos: [...prev.photos, ...compressed] }));
//     } catch (error) {
//       console.error(error);
//       setErrors((prev) => ({ ...prev, photos: 'Image error' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: '',
//       category: '',
//       photos: '',
//       quality: '',
//       price: '',
//     };

//     if (!product.name.trim()) newErrors.name = 'Product name required';
//     if (!product.category) newErrors.category = 'Category required';
//     if (product.photos.length < 1) newErrors.photos = 'At least 5 photos required';
//     if (!product.quality.trim()) newErrors.quality = 'Quality required';
//     if (!product.price.trim() || !/^\d+(\.\d{1,2})?$/.test(product.price))
//       newErrors.price = 'Enter a valid price';

//     setErrors(newErrors);
//     return Object.values(newErrors).every((e) => !e);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;
  
//     const newProduct = {
//       ...product,
//       email: currentEmail,  // Make sure this is correctly set
//       clientId: currentClientId,
//     };
  
//     try {
//       const res = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProduct),  // Sending the product data including email
//       });
  
//       const data = await res.json();
//       if (data.success) {
//         setProducts((prev) => [...prev, data.data]);
//         setProduct({ name: '', category: '', photos: [], quality: '', price: '', email: '' });
//         alert('Product added!');
//       } else {
//         alert('Add failed');
//       }
//     } catch (error) {
//       alert('API error');
//     }
//   };
  

//   return (
//     <>
//       <Navbar onSearch={handleSearchChange} onProductClick={(id) => console.log(id)} />
//       <Container className="p-4">
//         {/* Form */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block">Product Name</label>
//               <input type="text" name="name" value={product.name} onChange={handleChange}
//                 className="w-full p-2 border rounded" />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="block">Category</label>
//               <select name="category" value={product.category} onChange={handleChange}
//                 className="w-full p-2 border rounded">
//                 <option value="">Select</option>
//                 <option value="electronics">Electronics</option>
//                 <option value="clothing">Clothing</option>
//                 <option value="manufacturing">Manufacturing</option>
//               </select>
//               {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
//             </div>
//             <div>
//               <label className="block">Upload Photos (Min 1)</label>
//               <input type="file" accept="image/*" multiple onChange={handlePhotoChange}
//                 className="w-full p-2 border rounded" />
//               {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {product.photos.map((photo, i) => (
//                   <img key={i} src={photo} alt="Preview" className="w-16 h-16 object-cover rounded" />
//                 ))}
//               </div>
//             </div>
//             <div>
//               <label className="block">Quantity</label>
//               <input type="text" name="quality" value={product.quality} onChange={handleChange}
//                 className="w-full p-2 border rounded" />
//               {errors.quality && <p className="text-red-500 text-sm">{errors.quality}</p>}
//             </div>
//             <div>
//               <label className="block">Price</label>
//               <input type="text" name="price" value={product.price} onChange={handleChange}
//                 className="w-full p-2 border rounded" />
//               {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//             </div>
//             <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//               Add Product
//             </button>
//           </form>
//         </div>

//         {/* Product Grid */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Product List</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredProducts.map((product) => (
//               <div key={product._id} className="bg-white shadow p-4 rounded border">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-sm text-gray-600">Category: {product.category}</p>
//                 <p className="text-sm text-gray-600">Quantity: {product.quality}</p>
//                 <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
//                 <div className="flex gap-2 overflow-x-auto mt-2">
//                   {product.photos.map((photo, i) => (
//                     <img key={i} src={photo} alt="Product" className="h-20 w-20 object-cover rounded cursor-pointer"
//                       onClick={() => handleImageClick(photo)} />
//                   ))}
//                 </div>
//                 <div className="flex justify-between mt-4">
//                   <button onClick={() => handleDeleteProduct(product._id, product.email)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
//                     Delete
//                   </button>
//                   <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
//                     Purchase
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

interface Product {
  _id: string;
  name: string;
  category: string;
  photos: string[];
  quality: string;
  price: string;
  clientId: string;
  email: string;
}

const compressImage = async (
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        } else if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = event.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentClientId] = useState('client123');
  const [currentEmail, setCurrentEmail] = useState('');

  const [product, setProduct] = useState({
    name: '',
    category: '',
    photos: [] as string[],
    quality: '',
    price: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    category: '',
    photos: '',
    quality: '',
    price: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem("user") || localStorage.getItem("authToken");
    if (userData) {
      const parsed = JSON.parse(userData);
      setCurrentEmail(parsed.email);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?email=${currentEmail}`);
        const data = await res.json();
        if (data.success) setProducts(data.data);
        else console.error('Failed to fetch:', data.error);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (currentEmail) fetchProducts();
  }, [currentEmail]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleImageClick = (photo: string) => {
    setSelectedImage(photo);
  };

  const handleDeleteProduct = async (productId: string, productEmail: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    if (productEmail !== currentEmail) {
      alert('Not authorized to delete this product.');
      return;
    }

    try {
      const res = await fetch(`/api/products?id=${productId}&email=${currentEmail}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        alert('Delete failed: ' + data.error);
      }
    } catch (error) {
      alert('API error.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (files.length + product.photos.length > 10) {
      setErrors((prev) => ({ ...prev, photos: 'Maximum 10 photos allowed' }));
      return;
    }

    try {
      const compressed = await Promise.all(files.map((f) => compressImage(f)));
      setProduct((prev) => ({ ...prev, photos: [...prev.photos, ...compressed] }));
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, photos: 'Image error' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      category: '',
      photos: '',
      quality: '',
      price: '',
    };

    if (!product.name.trim()) newErrors.name = 'Product name required';
    if (!product.category) newErrors.category = 'Category required';
    if (product.photos.length < 1) newErrors.photos = 'At least 1 photo required';
    if (!product.quality.trim()) newErrors.quality = 'Quality required';
    if (!product.price.trim() || !/^\d+(\.\d{1,2})?$/.test(product.price))
      newErrors.price = 'Enter a valid price';

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProduct = {
      ...product,
      email: currentEmail,
      clientId: currentClientId,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [...prev, data.data]);
        setProduct({ name: '', category: '', photos: [], quality: '', price: '', email: '' });
        alert('Product added!');
      } else {
        alert('Add failed');
      }
    } catch (error) {
      alert('API error');
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearchChange} onProductClick={(id) => console.log(id)} />
      <Container className="p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Add Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Product Name</label>
              <input type="text" name="name" value={product.name} onChange={handleChange}
                className="w-full p-2 border rounded" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block">Category</label>
              <select name="category" value={product.category} onChange={handleChange}
                className="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div>
              <label className="block">Upload Photos (Min 1)</label>
              <input type="file" accept="image/*" multiple onChange={handlePhotoChange}
                className="w-full p-2 border rounded" />
              {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                {product.photos.map((photo, i) => (
                  <img key={i} src={photo} alt="Preview" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            <div>
              <label className="block">Quantity</label>
              <input type="text" name="quality" value={product.quality} onChange={handleChange}
                className="w-full p-2 border rounded" />
              {errors.quality && <p className="text-red-500 text-sm">{errors.quality}</p>}
            </div>
            <div>
              <label className="block">Price</label>
              <input type="text" name="price" value={product.price} onChange={handleChange}
                className="w-full p-2 border rounded" />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Add Product
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow p-4 rounded border">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Quantity: {product.quality}</p>
                <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                <div className="flex gap-2 overflow-x-auto mt-2">
                  {product.photos.map((photo, i) => (
                    <img key={i} src={photo} alt="Product" className="h-20 w-20 object-cover rounded cursor-pointer"
                      onClick={() => handleImageClick(photo)} />
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button onClick={() => handleDeleteProduct(product._id, product.email)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                    Delete
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
