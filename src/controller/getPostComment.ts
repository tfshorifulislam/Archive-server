import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

type CommentWithReplies = {
    id: string;
    content: string;
    userId: string;
    postId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        name: string | null;
        userName: string;
        image: string | null;
    };
    replies: CommentWithReplies[];
};

export const getPostComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId as string;
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = 20;
        const skip = (page - 1) * limit;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "asc" },
            skip,
            take: limit,
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

        const commentMap = new Map<string, CommentWithReplies>();

        comments.forEach((comment) => {
            commentMap.set(comment.id, {
                ...comment,
                replies: [],
            });
        });

        const nestedComments: CommentWithReplies[] = [];

        comments.forEach((comment) => {
            const current = commentMap.get(comment.id);

            if (!current) return;

            if (!comment.parentId) {
                nestedComments.push(current);
                return;
            }

            const parent = commentMap.get(comment.parentId);

            if (parent) {
                parent.replies.push(current);
            }
        });

        return res.status(200).json({
            success: true,
            comments: nestedComments,
            page,
            limit,
            hasMore: comments.length === limit,
        });
    } catch (error) {
        console.error("GET POST COMMENTS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch comments",
        });
    }
};