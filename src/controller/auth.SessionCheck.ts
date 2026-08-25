import { Request, Response } from "express";
import { getCurrentSession } from "../lib/auth.service.js";

export const getSession = async (
  req: Request,
  res: Response
) => {
  try {
    const session = await getCurrentSession(req);

    if (!session) {
      return res.status(401).json({
        authenticated: false,
      });
    }

    return res.status(200).json({
      authenticated: true,
      user: session.user,
    });
  } catch (error) {
    console.error("GET SESSION ERROR:", error);

    return res.status(500).json({
      authenticated: false,
      message: "Failed to check session",
    });
  }
};