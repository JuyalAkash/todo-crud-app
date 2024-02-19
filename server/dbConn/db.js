import mongoose from "mongoose";

// CONNECT MONGODB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(`----${error.message}----`);
    process.exit(1);
  }
};

export default connectDB;
