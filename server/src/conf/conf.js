import dotenv from "dotenv";
dotenv.config();

const conf = {
  MONGODB_URI: String(process.env.MONGO_DB_URL),
  STRIPE_SECRET_KEY: String(process.env.STRIPE_SECRET_KEY),
  PORT: String(process.env.PORT),
  CORS_ORIGIN1: String(process.env.CORS_ORIGIN1),
  CORS_ORIGIN2: String(process.env.CORS_ORIGIN2),
  CORS_ORIGIN3: String(process.env.CORS_ORIGIN3),
};

export default conf;
