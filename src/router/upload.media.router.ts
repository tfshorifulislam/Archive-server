import { Router } from "express";

import { createPost } from "../controller/upload.media.controller.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post(
    "/posts",
    upload.single("file"),
    createPost
);

export default router;