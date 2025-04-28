// app/api/send-partner/route.js
import connectMongo from '@/app/lib/mongodb.js';
import Partner from '@/models/Partner';
import nodemailer from 'nodemailer';

export async function POST(req) {
  await connectMongo();

  try {
    const formData = await req.json();

    // Save to MongoDB
    const newPartner = new Partner(formData);
    await newPartner.save();

    // Send Email
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
      <p><strong>Address:</strong> ${formData.address}</p>
      <p><strong>State:</strong> ${formData.state}</p>
      <p><strong>City:</strong> ${formData.city}</p>
      <p><strong>Pin Code:</strong> ${formData.pinCode}</p>
      <h4>Bank Details</h4>
      <p><strong>Account Number:</strong> ${formData.accountNumber}</p>
      <p><strong>IFSC:</strong> ${formData.ifsc}</p>
      ${formData.gstNumber ? `<p><strong>GST Number:</strong> ${formData.gstNumber}</p>` : ''}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'New Partner Registration',
      html: emailBody,
    });

    return new Response(JSON.stringify({ message: 'Partner saved and email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
