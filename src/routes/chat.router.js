import { Router } from "express";
import { getMessages } from "../controllers/messages.controller.js";
import { roluser } from "../../middlewares/auth.js";
const router = Router();
router.get("/chat",roluser, getMessages);

export default router;