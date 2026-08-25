import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getPostById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        userName: true,
                        image: true,
                    },
                },
            },
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            post,
        });
    } catch (error) {
        console.error("GET POST ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch post",
        });
    }
};