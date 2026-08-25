import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getSavedPosts = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.id;

        const savedPosts = await prisma.savedPost.findMany({
            where: {
                userId,
            },
            include: {
                post: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            savedPosts,
        });
    } catch (error) {
        console.error("Get saved posts error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get saved posts",
        });
    }
};