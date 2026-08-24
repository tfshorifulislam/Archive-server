import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const checkSavedPost = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user!.id;
        const postId = String(req.params.postId);

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
        console.error("Check saved post error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to check saved post",
        });
    }
};