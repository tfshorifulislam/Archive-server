import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getSavedPosts = async (
    req: Request,
    res: Response
) => {
    try {
        const { userId } = req.query;

        if (
            !userId ||
            typeof userId !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
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

        const savedPosts =
            await prisma.savedPost.findMany({
                where: {
                    userId,
                },
                include: {
                    post: {
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
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

        return res.status(200).json({
            success: true,
            savedPosts,
        });
    } catch (error) {
        console.error(
            "GET SAVED POSTS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to get saved posts",
        });
    }
};