import nodemailer from 'nodemailer';
import connectMongo from '@/lib/mongodb'; 
import Partner from '@/models/Partner'; 

export async function POST(req) {
  try {
    const formData = await req.json();


    // Connect to DB
    await connectMongo(); 

    const newPartner = new Partner(formData); 
    await newPartner.save(); 

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailBody = `
      <h3>New Partner Submission</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Mobile:</strong> ${formData.mobile}</p>
      <p><strong>Role:</strong> ${formData.role}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Partner Registration',
      html: emailBody,
    });

    return new Response(JSON.stringify({ message: 'Email sent and data saved successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}