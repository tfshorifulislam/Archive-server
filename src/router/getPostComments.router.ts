import { Router } from "express";

import { getPostComments, } from "../controller/comment.controller.js";

const router = Router();

router.get("/:postId", getPostComments);

export default router;