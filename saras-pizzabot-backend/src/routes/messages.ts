import { Router } from "express";
import { getMessages, postMessage } from "../controllers/MessageController";

const router = Router();

router.get("/", getMessages);
router.post("/", postMessage);

export default router;
