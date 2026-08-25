import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const toggleLikePost = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                liked: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.id;
        const postId = String(req.params.postId);

        if (!postId) {
            return res.status(400).json({
                success: false,
                liked: false,
                message: "Post ID is required",
            });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
            },
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                liked: false,
                message: "Post not found",
            });
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });

            const likeCount = await prisma.like.count({
                where: {
                    postId,
                },
            });

            return res.status(200).json({
                success: true,
                liked: false,
                likeCount,
                message: "Post unliked successfully",
            });
        }

        await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });

        const likeCount = await prisma.like.count({
            where: {
                postId,
            },
        });

        return res.status(200).json({
            success: true,
            liked: true,
            likeCount,
            message: "Post liked successfully",
        });
    } catch (error) {
        console.error("TOGGLE LIKE ERROR:", error);

        return res.status(500).json({
            success: false,
            liked: false,
            message: "Failed to toggle like",
        });
    }
};