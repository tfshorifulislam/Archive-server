import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    message: "Archive API is running, everything is okay",
  });
};