import { Router } from "express";
import { userNameValidation } from "../controller/userNameValidation.controller.js";
const router = Router();
router.get('/check-ussername', userNameValidation);
export default router;
