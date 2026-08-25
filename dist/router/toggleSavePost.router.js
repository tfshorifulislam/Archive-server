import { Router } from "express";
import { toggleSavePost } from "../controller/toggleSavePost.controller.js";
const router = Router();
router.post("/:postId", toggleSavePost);
export default router;
