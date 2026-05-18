import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {

    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error("MONGO_URI environment variable is missing inside system logs.");
    }
    
    await mongoose.connect(mongoURI || "", {
      dbName: "InternProj",
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Database Connection Failure: ${(error as Error).message}`);
    process.exit(1);
  }
};
