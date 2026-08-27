import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getPostById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const { userId } = req.query;

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

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const postWithSaved = post as typeof post & {
            savedPosts?: {
                id: string;
            }[];
        };

        const isSaved =
            !!postWithSaved.savedPosts?.length;

        const formattedPost = {
            ...postWithSaved,
            isSaved,
            savedPosts: undefined,
        };

        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            post: formattedPost,
        });
    } catch (error) {
        console.error(
            "GET POST ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch post",
        });
    }
};