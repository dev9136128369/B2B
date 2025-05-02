// src/app/api/products/route.js

import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import Product from '@/models/addproduct';

export async function GET(req) {
    await connectMongo();
    try {
      const url = new URL(req.url);
      const email = url.searchParams.get('email');
  
      if (!email) {
        return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
      }
  
      const products = await Product.find({ email });
      return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
  

// Export the POST method for creating a new product
export async function POST(req) {
  await connectMongo();
  try {
    const product = await Product.create(await req.json()); // Parse the JSON body
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

// Export the DELETE method for deleting a product by ID
// DELETE method: Deletes product only if it matches both ID and email
export async function DELETE(req) {
    await connectMongo();
  
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      const email = url.searchParams.get('email'); // 👈 get email from query
  
      if (!id || !email) {
        return NextResponse.json(
          { success: false, error: 'ID and email are required' },
          { status: 400 }
        );
      }
  
      // Find product and check if it belongs to the user
      const product = await Product.findById(id);
  
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
  
      if (product.email !== email) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 403 }
        );
      }
  
      await Product.findByIdAndDelete(id);
      return NextResponse.json({ success: true }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }
  
