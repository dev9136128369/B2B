// models/Lead.js
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  type: { type: String, default: 'Leap' },
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;
