import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const checkLikePost = async (
    req: Request,
    res: Response
) => {
    try {
        const postId = String(
            req.params.postId
        );

        const userId = req.query.userId;

        // User ID না থাকলে
        if (
            !userId ||
            typeof userId !== "string"
        ) {
            const likeCount =
                await prisma.like.count({
                    where: {
                        postId,
                    },
                });

            return res.status(200).json({
                success: true,
                liked: false,
                likeCount,
            });
        }

        const existingLike =
            await prisma.like.findUnique({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });

        const likeCount =
            await prisma.like.count({
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
        console.error(
            "CHECK LIKE POST ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to check like",
        });
    }
};