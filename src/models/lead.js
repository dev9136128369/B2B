// models/Lead.js
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  status: {
    type: String,
    enum: ['Pending', 'Won'],
    default: 'Pending',
  },
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
export default Lead;
