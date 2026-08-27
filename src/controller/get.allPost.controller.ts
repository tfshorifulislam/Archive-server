import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getAllPosts = async (
    req: Request,
    res: Response
) => {
    try {
        const { userId } = req.query;

        const posts = await prisma.post.findMany({
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

                ...(userId &&
                    typeof userId === "string"
                    ? {
                          savedPosts: {
                              where: {
                                  userId,
                              },
                              select: {
                                  id: true,
                              },
                          },
                      }
                    : {}),
            },
        });

        const formattedPosts = posts.map(
            (post) => {
                const postWithSaved =
                    post as typeof post & {
                        savedPosts?: {
                            id: string;
                        }[];
                    };

                return {
                    ...postWithSaved,

                    isSaved:
                        !!postWithSaved
                            .savedPosts
                            ?.length,

                    savedPosts: undefined,
                };
            }
        );

        return res.status(200).json({
            success: true,
            message:
                "Posts fetched successfully",
            posts: formattedPosts,
        });
    } catch (error) {
        console.error(
            "GET ALL POSTS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch posts",
        });
    }
};