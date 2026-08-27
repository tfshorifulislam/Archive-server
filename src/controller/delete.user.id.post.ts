import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId as string;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own post",
            });
        }

        await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Post DELETED successfully",
        });
    } catch (error) {
        console.log("DELETE POST ERROR", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete post",
        });
    }
};