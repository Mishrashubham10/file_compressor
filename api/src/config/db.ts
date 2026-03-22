import mongoose from 'mongoose';

/*
 ************ MONGOOSE DB CONNECTION *************
 */
export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
};