// router/profile.router.ts
import { Router } from "express";
import { updateProfile } from "../controller/ProfileUpdate.Controller.js";
const router = Router();
router.patch("/", updateProfile);
export default router;
