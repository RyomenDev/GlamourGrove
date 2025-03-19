import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
import conf from "../conf/conf.js";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${conf.MONGO_DB_URL}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
