// models/Partner.js
import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
  },
  address: {
    type: String,
    required: true,
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
    match: [/^\d{6}$/, 'Pin code must be 6 digits'],
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
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
