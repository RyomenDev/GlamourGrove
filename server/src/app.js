import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import conf from "./conf/conf.js";
import bodyParser from "body-parser";
import helmet from "helmet";

const app = express();
app.use(bodyParser.json());

// Apply security headers using Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, 
  })
);

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN.replace(/\/$/, ""),
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        conf.CORS_ORIGIN1.replace(/\/$/, ""),
        conf.CORS_ORIGIN2.replace(/\/$/, ""),
        conf.CLIENT_URL.replace(/\/$/, ""),
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Additional security headers
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import stripe from "./routes/stripe.js";
import orderRouter from "./routes/order.route.js";
import commentRouter from "./routes/comment.route.js";
import resetpasswordRouter from "./routes/resetpassword.route.js";

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/stripe", stripe);
app.use("/api/order", orderRouter);
app.use("/api/comment", commentRouter);
app.use("/api/auth", resetpasswordRouter);

export { app };
