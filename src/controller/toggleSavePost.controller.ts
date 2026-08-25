import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const toggleSavePost = async (
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
        console.error(
            "TOGGLE SAVE POST ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to toggle saved post",
        });
    }
};