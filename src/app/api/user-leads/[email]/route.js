import { NextResponse } from "next/server";
import connectMongo from '@/app/lib/mongodb.js';
import Lead from '@/models/lead';

export async function GET(_req, context) {
  try {
    await connectMongo();

    // Decode the email parameter
    const email = decodeURIComponent(context.params.email);

    // Fetch leads from the database based on email
    const leads = await Lead.find({ email }).sort({ updatedAt: -1 });

    // Return the leads data in the response
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching leads', error: error.message },
      { status: 500 }
    );
  }
}