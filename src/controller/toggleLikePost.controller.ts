import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const toggleLikePost = async (
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

        const result = await prisma.$transaction(
            async (tx) => {
                const existingLike =
                    await tx.like.findUnique({
                        where: {
                            userId_postId: {
                                userId,
                                postId,
                            },
                        },
                        select: {
                            id: true,
                        },
                    });

                if (existingLike) {
                    await tx.like.delete({
                        where: {
                            id: existingLike.id,
                        },
                    });
                } else {
                    await tx.like.create({
                        data: {
                            userId,
                            postId,
                        },
                    });
                }

                const likeCount =
                    await tx.like.count({
                        where: {
                            postId,
                        },
                    });

                return {
                    liked: !existingLike,
                    likeCount,
                };
            }
        );

        return res.status(200).json({
            success: true,
            liked: result.liked,
            likeCount: result.likeCount,
            message: result.liked
                ? "Post liked successfully"
                : "Post unliked successfully",
        });
    } catch (error) {
        console.error(
            "TOGGLE LIKE POST ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to toggle like",
        });
    }
};