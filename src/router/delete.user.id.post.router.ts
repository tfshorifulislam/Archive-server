import { Router } from "express";
import { deletePost } from "../controller/delete.user.id.post.js";

const router = Router();

router.delete("/:postId", deletePost);

export default router;