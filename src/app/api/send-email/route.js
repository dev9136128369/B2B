// import nodemailer from 'nodemailer';
// import connectMongo from '@/app/lib/mongodb.js';
// import User from '@/models/User';

// export async function POST(request) {
//   try {
//     const { name, email, mobile, password } = await request.json();

//     // Log the data to debug
//     console.log('Received data:', { name, email, mobile, password });

//     if (!name || !email || !mobile || !password) {
//       throw new Error('Missing required fields');
//     }

//     await connectMongo(); 

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ success: false, error: 'User already exists' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     // Create new user
//     const newUser = new User({ name, email, mobile, password });
//     await newUser.save();

//     // Setup transporter
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

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.messageId);

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



















import nodemailer from 'nodemailer';
import connectMongo from '@/app/lib/mongodb.js';
import bcrypt from 'bcryptjs';  // Import bcryptjs for hashing passwords
import User from '@/models/User';

export async function POST(request) {
  try {
    const { name, email, mobile, password } = await request.json();

    // Log the data to debug
    console.log('Received data:', { name, email, mobile, password });

    if (!name || !email || !mobile || !password) {
      throw new Error('Missing required fields');
    }

    await connectMongo(); 

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, error: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save();

    // Setup transporter for email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    await transporter.verify();

    // Prepare email options
    const mailOptions = {
      from: `"ERP System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Signup Notification',
      html: `
        <h2>New User Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Send the email notification
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    // Return response after saving user and sending email
    return new Response(JSON.stringify({
      success: true,
      message: 'User saved and email sent successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
