import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import Profileform from '@/models/Profileform';

export async function GET(request) {
  const url = new URL(request.url);
  const email = decodeURIComponent(url.pathname.split("/").pop());

  await connectMongo();

  try {
    const profile = await Profileform.findOne({ email });
    if (!profile) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }
    return NextResponse.json(profile, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching profile', error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const url = new URL(request.url);
  const email = decodeURIComponent(url.pathname.split("/").pop());
  const updatedData = await request.json();

  await connectMongo();

  try {
    const result = await Profileform.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'No profile found to update' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated', data: result }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error updating profile', error: err.message },
      { status: 500 }
    );
  }
}
