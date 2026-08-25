import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const toggleSavePost = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                unauthorized: true,
            });
        }

        const userId = req.user.id;
        const postId = String(req.params.postId);

        if (!postId) {
            return res.status(400).json({
                success: false,
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
                message: "Post not found",
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

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id,
                },
            });

            return res.status(200).json({
                success: true,
                saved: false,
                message: "Post removed from saved posts",
            });
        }

        await prisma.savedPost.create({
            data: {
                userId,
                postId,
            },
        });

        return res.status(200).json({
            success: true,
            saved: true,
            message: "Post saved successfully",
        });
    } catch (error) {
        console.error("TOGGLE SAVE POST ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to toggle saved post",
        });
    }
};