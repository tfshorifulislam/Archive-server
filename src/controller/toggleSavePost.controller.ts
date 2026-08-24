import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const toggleSavePost = async (req: Request, res: Response) => {
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

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id,
                },
            });

            return res.json({
                success: true,
                saved: false,
            });
        }

        await prisma.savedPost.create({
            data: {
                userId,
                postId,
            },
        });

        return res.json({
            success: true,
            saved: true,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to save post",
        });
    }
};