import { Router } from "express";
import { getUserPosts } from "../controller/get.userPosts.controller";

const router = Router();

router.get("/user/:userName", getUserPosts);

export default router;