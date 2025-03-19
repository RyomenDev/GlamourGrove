import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";
import conf from "./src/conf/conf.js";

connectDB();

const port = conf.PORT || 5000;

app.listen(port, () => {
  console.log(`⚙️ Server is running at port : ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});
