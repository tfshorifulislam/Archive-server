import { Router } from "express";
import { healthCheck } from '../controller/health.controller.js'
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get('/', requireAuth, healthCheck);

export default router;