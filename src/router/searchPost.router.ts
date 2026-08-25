import { Router } from "express";
import { searchPosts } from "../controller/searchPosts.controller.js";

const router = Router();

router.get("/", searchPosts);

export default router;