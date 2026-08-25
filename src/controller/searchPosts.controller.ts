import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const searchPosts = async (
    req: Request,
    res: Response
) => {
    try {
        const search = String(
            req.query.search || ""
        ).trim();

        if (!search) {
            return res.status(200).json({
                success: true,
                posts: [],
            });
        }

        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        content: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        tags: {
                            has: search,
                        },
                    },
                    {
                        user: {
                            userName: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
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

            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        console.error(
            "SEARCH POSTS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to search posts",
        });
    }
};