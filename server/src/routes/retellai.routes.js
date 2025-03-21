import express from "express";
const router = express.Router();
// import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { RetellAiController } from "../controllers/retellai.controller.js";

router.post("/connect-retellai", RetellAiController);

export default router;
