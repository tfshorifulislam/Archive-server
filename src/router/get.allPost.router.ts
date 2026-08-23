import { Router } from "express";
import { getAllPosts } from "../controller/get.allPost.controller";

const router = Router();

router.get("/", getAllPosts);

export default router;