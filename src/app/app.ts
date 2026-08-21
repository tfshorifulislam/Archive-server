import express from "express";
import { setupRoutes } from "./routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL,
    credentials: true,
  })
);

setupRoutes(app);

export default app;