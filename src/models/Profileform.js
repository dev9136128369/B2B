import mongoose from 'mongoose';

const profileformSchema = new mongoose.Schema({
  name: String,
  companyName: String,
  companyWebsite: String,
  numberOfEmployees: String,
  turnover: String,
  numberOfBranches: String,
  area: String,
  areaInSqFt: String,
  bankName: String,
  bankAddress: String,
  accountNumber: String,
  ifsc: String,
  gstNumber: String,
  state: String,
  city: String,
  pinCode: String,
  mobile: String,
  email: String,
  address: String,
  panCardPath: String,
  msmemCardPath: String,
  aadhaarCardPath: String,
}, { timestamps: true });

export default mongoose.models.Profileform || mongoose.model('Profileform', profileformSchema);
