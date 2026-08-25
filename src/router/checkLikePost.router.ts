import { Router } from "express";

import { checkLikePost } from "../controller/checkLikePost.controller.js";

const router = Router();

router.get(
    "/:postId",
    checkLikePost
);

export default router;