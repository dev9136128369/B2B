import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    city: String,
    status: { type: String, default: "Pending" },
    reason: { type: String, default: "" },
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
