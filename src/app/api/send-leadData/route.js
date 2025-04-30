// import nodemailer from 'nodemailer';
// import connectMongo from '@/app/lib/mongodb.js';
// import Lead from '@/models/Lead';

// export async function POST(request) {
//   try {
//     const { name, email, mobile, password } = await request.json();

//     // Log the data to debug
//     console.log('Received data:', { name, email, mobile });

//     if (!name || !email || !mobile ) {
//       throw new Error('Missing required fields');
//     }

//     await connectMongo(); 

//     // Check if user already exists
//     const existingUser = await Lead.findOne({ email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ success: false, error: 'User already exists' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const newUser = new Lead({ name, email, mobile });
//     await newUser.save();

//     // Setup transporter for email
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false 
//       }
//     });

//     await transporter.verify();

//     // Prepare email options
//     const mailOptions = {
//       from: `"ERP System" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: 'New Signup Notification',
//       html: `
//         <h2>New User Registration</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Mobile:</strong> ${mobile}</p>
//         <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
//       `
//     };

//     // Send the email notification
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.messageId);

//     // Return response after saving user and sending email
//     return new Response(JSON.stringify({
//       success: true,
//       message: 'User saved and email sent successfully'
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }









//sagar

// import nodemailer from 'nodemailer';
// import connectMongo from '@/app/lib/mongodb.js';
// import Lead from '@/models/Lead';

// // POST: Save Lead and Send Email
// export async function POST(request) {
//   try {
//     const { name, email, mobile, password } = await request.json();

//     console.log('Received data:', { name, email, mobile });

//     if (!name || !email || !mobile) {
//       throw new Error('Missing required fields');
//     }

//     await connectMongo();

//     // Check if lead already exists
//     const existingUser = await Lead.findOne({ email });
//     // if (existingUser) {
//     //   return new Response(JSON.stringify({ success: false, error: 'User already exists' }), {
//     //     status: 400,
//     //     headers: { 'Content-Type': 'application/json' }
//     //   });
//     // }

//     // Save new lead
//     const newUser = new Lead({ name, email, mobile });
//     await newUser.save();

//     // Setup Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     await transporter.verify();

//     const mailOptions = {
//       from: `"ERP System" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: 'New Signup Notification',
//       html: `
//         <h2>New User Registration</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Mobile:</strong> ${mobile}</p>
//         <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
//       `
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');

//     return new Response(JSON.stringify({
//       success: true,
//       message: 'User saved and email sent successfully'
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

// // GET: Fetch All Leads
// export async function GET() {
//   try {
//     await connectMongo();

//     const leads = await Lead.find({});
//     return new Response(JSON.stringify(leads), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error('GET Error:', error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

























//sagar2 








// app/api/send-leadData/route.js
import connectMongo from '@/app/lib/mongodb';
import Lead from '@/models/Lead';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, mobile } = await request.json();

    if (!name || !email || !mobile) throw new Error('Missing required fields');

    await connectMongo();

    const newUser = new Lead({ name, email, mobile, status: 'Pending' });
    await newUser.save();

    // Send email (optional)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ERP System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Signup Notification',
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Status:</strong> Pending</p>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const leads = await Lead.find({});
    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
