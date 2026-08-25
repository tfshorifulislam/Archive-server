import express from "express";
import { setupRoutes } from "./routes.js";
import cors from "cors";
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
setupRoutes(app);
export default app;
