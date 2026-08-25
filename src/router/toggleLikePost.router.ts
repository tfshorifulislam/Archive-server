import { Router } from "express";

import { toggleLikePost } from "../controller/toggleLikePost.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post(
    "/:postId",
    requireAuth,
    toggleLikePost
);

export default router;