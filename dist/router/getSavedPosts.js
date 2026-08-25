import { Router } from "express";
import { getSavedPosts } from "../controller/getSavedPosts.js";
const router = Router();
router.get("/", getSavedPosts);
export default router;
