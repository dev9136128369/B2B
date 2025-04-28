import mongoose from "mongoose";

const PartnerFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    default: "", // Optional field
  },
}, {
  timestamps: true, // createdAt, updatedAt
});

// Export model safely
export default mongoose.models.Supplier || mongoose.model('Supplier', PartnerFormSchema);
