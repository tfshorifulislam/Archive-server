import { Router } from "express";
import { getPostComments, } from "../controller/getPostComment.js";

const router = Router();

router.get("/:postId",getPostComments);

export default router;