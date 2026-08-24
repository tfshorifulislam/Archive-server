import { Router } from "express";
import { checkSavedPost } from "../controller/checkSavedPost.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = Router();

router.get("/:postId", optionalAuth, checkSavedPost);

export default router;