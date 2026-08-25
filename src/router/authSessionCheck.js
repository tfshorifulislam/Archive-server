import { Router } from "express";
import { getSession } from "../controller/auth.SessionCheck.js";
const router = Router();
router.get("/", getSession);
export default router;
