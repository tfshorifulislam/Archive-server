import { Router } from "express";
import { getSession } from "../controller/auth.SessionCheck.js";

const router = Router();

router.get("/session", getSession);

export default router;