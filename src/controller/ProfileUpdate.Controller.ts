import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, userName, userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !userName) {
      return res.status(400).json({
        success: false,
        message: "Name and username are required",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        userName,
        NOT: {
          id: userId,
        },
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        userName,
      },
      select: {
        id: true,
        name: true,
        userName: true,
        image: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};