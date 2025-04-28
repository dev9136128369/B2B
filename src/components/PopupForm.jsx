'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast, { Toaster } from 'react-hot-toast'

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  mobile: z.string().min(10, { message: 'Mobile number must be 10 digits' }).max(10),
  product: z.string().min(1, { message: 'Please select a product' })
})

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Form methods
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  // Popup open karein when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000) // 3 seconds after page load
    
    return () => clearTimeout(timer)
  }, [])

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      // ✅ Add Leap tag
      const newSupplier = {
        ...data,
        type: 'Leap'
      };
  
      // ✅ Store to localStorage
      const existing = JSON.parse(localStorage.getItem('suppliers')) || [];
      localStorage.setItem('suppliers', JSON.stringify([...existing, newSupplier]));
  
      // ✅ Send email using your API route
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSupplier)
      });
  
      if (!res.ok) {
        throw new Error('Email sending failed');
      }
  
      toast.success('Form submitted & emailed successfully!');
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error('Submission failed. Please try again.');
      console.error(error);
    }
  };
  
  // Product options
  const products = [
    'Website Development',
    'Mobile App',
    'Digital Marketing',
    'SEO Services',
    'Graphic Design'
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Get a Free Consultation</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name*</label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number*</label>
            <input
              {...register('mobile')}
              type="tel"
              className="w-full p-2 border rounded"
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
            )}
          </div>
          
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Product/Service*</label>
            <select
              {...register('product')}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
            {errors.product && (
              <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}