import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🛢 Database connection successful");
  } catch (error) {
    console.log("❌ Error connecting to database:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
