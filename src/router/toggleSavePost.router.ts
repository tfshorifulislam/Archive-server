import { Router } from "express";
import { toggleSavePost } from "../controller/toggleSavePost.controller";

const router = Router();

router.post("/:postId", toggleSavePost);

export default router;