import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "InternProj",
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Database Connection Failure: ${(error as Error).message}`);
    process.exit(1);
  }
};
