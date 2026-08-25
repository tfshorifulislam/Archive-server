import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const checkSavedPost = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                saved: false,
                unauthorized: true,
                message: "Unauthorized",
            });
        }

        const userId = req.user.id;
        const postId = String(req.params.postId);

        if (!postId) {
            return res.status(400).json({
                success: false,
                saved: false,
                message: "Post ID is required",
            });
        }

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        return res.status(200).json({
            success: true,
            saved: !!savedPost,
        });
    } catch (error) {
        console.error("CHECK SAVED POST ERROR:", error);

        return res.status(500).json({
            success: false,
            saved: false,
            message: "Failed to check saved post",
        });
    }
};