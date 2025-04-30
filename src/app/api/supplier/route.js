// import nodemailer from 'nodemailer';
// import connectMongo from '@/app/lib/mongodb.js';
// import Supplier from '@/models/Supplier'
// export async function POST(req) {

//   await connectMongo();
//   try {
//     const formData = await req.json(); // Parse form data

//     const newSupplier = new Supplier(formData);
//     await newSupplier.save();

//     // Create a transporter for sending email (using Gmail SMTP)
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email body to send
//     const emailBody = `
//       <h3>New Supplier Submission</h3>
//       <p><strong>Name:</strong> ${formData.name}</p>
//       <p><strong>Email:</strong> ${formData.email}</p>
//       <p><strong>Mobile:</strong> ${formData.mobile}</p>
//       <p><strong>Address:</strong> ${formData.address}</p>
//       <p><strong>State:</strong> ${formData.state}</p>
//       <p><strong>Pin Code:</strong> ${formData.pinCode}</p>
//       <p><strong>GSTIN Number:</strong> ${formData.gstin || 'Not provided'}</p>
//       <p><strong>GSTIN Status:</strong> ${formData.noGstin ? 'No GSTIN' : 'Has GSTIN'}</p>
//     `;

//     // Send email with the form data
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // You can add multiple recipients if needed
//       subject: 'New Supplier Registration',
//       html: emailBody,
//     });

//     // Return a success response
//     return new Response(JSON.stringify({ message: 'Supplier details submitted successfully!' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });

//   } catch (error) {
//     // Handle any errors that may occur
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }













import connectMongo from '@/app/lib/mongodb.js';
 import Supplier from '@/models/Supplier'
import nodemailer from 'nodemailer';

// POST: Save Partner and Send Email
export async function POST(req) {
  await connectMongo(); // Connect MongoDB
  
  try {
    const formData = await req.json();

    // Save form data to MongoDB
    const newPartner = new Supplier(formData);
    await newPartner.save();

    // Send Email notification
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
      to: process.env.EMAIL_USER,
      subject: 'New Supplier Registration',
      html: emailBody,
    });

    return new Response(JSON.stringify({ message: 'Supplier saved and email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('POST Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// GET: Fetch All Partners
export async function GET() {
  await connectMongo(); // Connect MongoDB

  try {
    const partners = await Supplier.find({});
    return new Response(JSON.stringify(partners), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('GET Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
