import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";



export const getPostComments = async (
    req: Request,
    res: Response
) => {
    try {
        const postId = req.params.postId as string;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },

            orderBy: {
                createdAt: "asc",
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

        const commentMap = new Map<string, any>();

        comments.forEach((comment) => {
            commentMap.set(comment.id, {
                ...comment,
                replies: [],
            });
        });

        const nestedComments: any[] = [];

        comments.forEach((comment) => {
            const currentComment =
                commentMap.get(comment.id);

            // Top-level comment
            if (!comment.parentId) {
                nestedComments.push(currentComment);
                return;
            }

            // Reply
            const parentComment =
                commentMap.get(comment.parentId);

            if (parentComment) {
                parentComment.replies.push(
                    currentComment
                );
            }
        });

        return res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            comments: nestedComments,
        });

    } catch (error) {
        console.error(
            "GET POST COMMENTS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch comments",
        });
    }
};
