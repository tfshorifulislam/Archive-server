import { Request, Response } from "express";
import { auth } from "../lib/auth";

export const getSession = async (
  req: Request,
  res: Response
) => {
  try {
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(
          key,
          Array.isArray(value) ? value.join(", ") : value
        );
      }
    }

    const session = await auth.api.getSession({
      headers,
    });

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