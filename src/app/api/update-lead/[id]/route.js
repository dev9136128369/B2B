import connectMongo from "@/app/lib/mongodb"; // MongoDB connection
import Lead from "@/models/Lead"; // Your Lead model

export async function PATCH(req, { params }) {
  await connectMongo(); // Ensure DB connection

  try {
    const { id } = params; // Extract the lead ID from URL params
    const { status, reason, updatedBy } = await req.json(); // Get data from the request body

    // Find and update the lead
    const lead = await Lead.findByIdAndUpdate(
      id,
      { status, reason, updatedBy },
      { new: true } // Returns the updated lead
    );

    // If lead not found, return 404 error
    if (!lead) {
      return new Response(
        JSON.stringify({ success: false, message: "Lead not found" }),
        {
          status: 404,
        }
      );
    }

    // Return the updated lead
    return new Response(
      JSON.stringify({ success: true, lead }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // If there's an error, log it and return 500 error
    console.error("Error updating lead:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      {
        status: 500,
      }
    );
  }
}
