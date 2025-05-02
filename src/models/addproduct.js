import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  photos: { type: [String], required: true },
  quality: { type: String, required: true },
  price: { type: String, required: true },
  clientId: { type: String, required: true },
  email: { type: String, required: true },  // ✅ added this line
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
