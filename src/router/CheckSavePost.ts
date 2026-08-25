import { Router } from "express";
import { checkSavedPost } from "../controller/checkSavedPost.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/:postId", requireAuth, checkSavedPost);

export default router;