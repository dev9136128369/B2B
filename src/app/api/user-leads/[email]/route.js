import { NextResponse } from "next/server";
import connectMongo from '@/app/lib/mongodb.js';
import Lead from '@/models/lead';

export async function GET(_req, context) {
    try {
      await connectMongo();
  
      const email = decodeURIComponent(context.params.email);
      const leads = await Lead.find({ email });
  
      return NextResponse.json(leads, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching leads", error: error.message },
        { status: 500 }
      );
    }
  }
  