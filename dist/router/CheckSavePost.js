import { Router } from "express";
import { checkSavedPost } from "../controller/checkSavedPost.js";
const router = Router();
router.get("/:postId", checkSavedPost);
export default router;
