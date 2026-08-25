import { Router } from "express";
import { getUserPosts } from "../controller/get.userPosts.controller.js";
const router = Router();
router.get("/user/:userName", getUserPosts);
export default router;
