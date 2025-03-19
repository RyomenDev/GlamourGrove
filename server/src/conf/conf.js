import dotenv from "dotenv";
// dotenv.config();
dotenv.config({
  path: "./.env",
});

const requiredEnvVars = [
  "MONGO_DB_URL",
  "STRIPE_SECRET_KEY",
  "PORT",
  "CORS_ORIGIN1",
  "CORS_ORIGIN2",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRY",
  "NODE_ENV",
  "CLIENT_URL",
];

// Check for missing environment variables
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1); // Exit process if a required env variable is missing
  }
});

const conf = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  PORT: parseInt(process.env.PORT, 10) || 5000, // Ensuring PORT is a number
  CORS_ORIGIN1: process.env.CORS_ORIGIN1,
  CORS_ORIGIN2: process.env.CORS_ORIGIN2,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m", // Default expiry
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d", // Default expiry
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default conf;

// import dotenv from "dotenv";
// dotenv.config();

// const conf = {
//   MONGODB_URI: String(process.env.MONGO_DB_URL),
//   STRIPE_SECRET_KEY: String(process.env.STRIPE_SECRET_KEY),
//   PORT: String(process.env.PORT),
//   CORS_ORIGIN1: String(process.env.CORS_ORIGIN1),
//   CORS_ORIGIN2: String(process.env.CORS_ORIGIN2),
//   ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
//   ACCESS_TOKEN_EXPIRY: String(process.env.ACCESS_TOKEN_EXPIRY),
//   REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
//   REFRESH_TOKEN_EXPIRY: String(process.env.REFRESH_TOKEN_EXPIRY),
// };

// export default conf;
