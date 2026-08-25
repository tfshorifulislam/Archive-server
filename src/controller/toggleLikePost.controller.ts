import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const toggleLikePost = async (
    req: Request,
    res: Response
) => {
    try {
        const { userId } = req.body;
        const postId = String(req.params.postId);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Check user exists
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Check post exists
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
                message: "Post not found",
            });
        }

        // Check existing like
        const existingLike =
            await prisma.like.findUnique({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });

        // Already liked → Unlike
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
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
                liked: false,
                likeCount,
                message: "Post unliked successfully",
            });
        }

        // Not liked → Like
        await prisma.like.create({
            data: {
                userId,
                postId,
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
            liked: true,
            likeCount,
            message: "Post liked successfully",
        });
    } catch (error) {
        console.error(
            "TOGGLE LIKE POST ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to toggle like",
        });
    }
};