import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb success")
  } catch (error) {
  console.error("❌ MongoDB failed:");
  console.error(error.message);
  process.exit(1);
}
};

export default connectDB;
