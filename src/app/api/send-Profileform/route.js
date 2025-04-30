// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs';
// import connectMongo from '@/app/lib/mongodb.js';
// import Profileform from '@/models/Profileform';

// export async function POST(req) {
//   try {
//     await connectMongo();
//     const data = await req.formData();

//     const fields = {};
//     for (const [key, value] of data.entries()) {
//       if (typeof value === "string") {
//         fields[key] = value;
//       }
//     }

//     // Save uploaded files
//     const uploadDir = path.join(process.cwd(), "/public/uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     const saveFile = async (file) => {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const filename = `${Date.now()}_${file.name}`;
//       const filepath = path.join(uploadDir, filename);
//       fs.writeFileSync(filepath, buffer);
//       return `/uploads/${filename}`;
//     };

//     const panCard = data.get("panCard");
//     const msmemCard = data.get("msmemCard");
//     const aadhaarCard = data.get("aadhaarCard");

//     if (panCard && panCard.name) fields.panCardPath = await saveFile(panCard);
//     if (msmemCard && msmemCard.name) fields.msmemCardPath = await saveFile(msmemCard);
//     if (aadhaarCard && aadhaarCard.name) fields.aadhaarCardPath = await saveFile(aadhaarCard);

//     // Save to database
//     const profileform = new Profileform(fields);
//     await profileform.save();

//     return NextResponse.json({ success: true, message: "Form submitted successfully" });
//   } catch (err) {
//     console.error("Submission error:", err);
//     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
//   }
// }







import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import connectMongo from '@/app/lib/mongodb.js';
import Profileform from '@/models/Profileform';

export async function POST(req) {
  try {
    // Step 1: Connect to MongoDB
    await connectMongo();
    console.log("Connected to DB");

    // Step 2: Get the form data
    const data = await req.formData();
    const fields = {};

    // Step 3: Prepare the fields to be saved
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") {
        fields[key] = value;
      }
    }

    // Step 4: Define the directory for file uploads
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Step 5: Function to save the file
    const saveFile = async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const extension = path.extname(file.name);
      const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}${extension}`;
      const filepath = path.join(uploadDir, filename);
      
      // Write the file to the file system
      await fs.promises.writeFile(filepath, buffer);
      return `/uploads/${filename}`;
    };

    // Step 6: Handle file uploads
    const panCard = data.get("panCard");
    const msmemCard = data.get("msmemCard");
    const aadhaarCard = data.get("aadhaarCard");

    if (panCard && panCard.name) fields.panCardPath = await saveFile(panCard);
    if (msmemCard && msmemCard.name) fields.msmemCardPath = await saveFile(msmemCard);
    if (aadhaarCard && aadhaarCard.name) fields.aadhaarCardPath = await saveFile(aadhaarCard);

    // Step 7: Log the fields before saving to DB
    console.log("Prepared fields for DB:", fields);

    // Step 8: Save the data to the database
    const savedProfile = await Profileform.create(fields);

    // Step 9: Log the saved data
    console.log("Saved to DB:", savedProfile);

    // Step 10: Return success response
    return NextResponse.json({ success: true, message: "Form submitted and saved to DB" });

  } catch (err) {
    // Error handling
    console.error("ERROR:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
