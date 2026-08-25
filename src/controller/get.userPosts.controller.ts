import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getUserPosts = async (
    req: Request<{ userName: string }>,
    res: Response
) => {
    try {
        const { userName } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                userName,
            },
            select: {
                id: true,
                name: true,
                userName: true,
                image: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const posts = await prisma.post.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
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

        return res.status(200).json({
            success: true,
            message: "User posts fetched successfully",
            posts,
        });
    } catch (error) {
        console.error("GET USER POSTS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user posts",
        });
    }
};