import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const checkLikePost = async (
    req: Request,
    res: Response
) => {
    try {
        const postId = String(req.params.postId);

        if (!postId) {
            return res.status(400).json({
                success: false,
                liked: false,
                message: "Post ID is required",
            });
        }

        if (!req.user) {
            return res.status(200).json({
                success: true,
                liked: false,
                likeCount: await prisma.like.count({
                    where: {
                        postId,
                    },
                }),
            });
        }

        const userId = req.user.id;

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        const likeCount = await prisma.like.count({
            where: {
                postId,
            },
        });

        return res.status(200).json({
            success: true,
            liked: !!existingLike,
            likeCount,
        });
    } catch (error) {
        console.error("CHECK LIKE ERROR:", error);

        return res.status(500).json({
            success: false,
            liked: false,
            message: "Failed to check like",
        });
    }
};