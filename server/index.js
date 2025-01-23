import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`⚙️ Server is running at port : ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});
