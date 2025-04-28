import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }

  await mongoose.connect(MONGODB_URI);

  console.log('Connected to MongoDB');
};

export default connectMongo;
