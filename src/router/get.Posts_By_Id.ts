import { Router } from "express";
import { getPostById } from "../controller/get.post_By_Id.js";

const router = Router();

router.get("/posts/:id", getPostById);

export default router;