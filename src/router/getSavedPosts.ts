import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getSavedPosts } from "../controller/getSavedPosts.js";

const router = Router();

router.get("/", getSavedPosts);

export default router;