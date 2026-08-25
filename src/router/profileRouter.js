import { Router } from "express";
import { getUserProfile } from "../controller/profile.controller.js";
const router = Router();
router.get('/:userName', getUserProfile);
export default router;
