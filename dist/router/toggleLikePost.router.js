import { Router } from "express";
import { toggleLikePost, } from "../controller/toggleLikePost.controller.js";
const router = Router();
router.post("/:postId", toggleLikePost);
export default router;
