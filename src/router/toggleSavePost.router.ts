import { Router } from "express";
import { toggleSavePost } from "../controller/toggleSavePost.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/:postId", requireAuth, toggleSavePost);

export default router;