import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


// ============================================
// GET NESTED COMMENTS
// ============================================

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


        // Get all comments of this post
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


        // ========================================
        // CREATE COMMENT MAP
        // ========================================

        const commentMap = new Map<string, any>();


        comments.forEach((comment) => {
            commentMap.set(comment.id, {
                ...comment,
                replies: [],
            });
        });


        // ========================================
        // CREATE NESTED TREE
        // ========================================

        const nestedComments: any[] = [];


        comments.forEach((comment) => {
            const currentComment = commentMap.get(
                comment.id
            );


            // Top-level comment
            if (!comment.parentId) {
                nestedComments.push(currentComment);
                return;
            }


            // Reply
            const parentComment = commentMap.get(
                comment.parentId
            );


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


// ============================================
// CREATE COMMENT / REPLY
// ============================================

export const createComment = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            userId,
            postId,
            content,
            parentId,
        } = req.body;


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !userId ||
            !postId ||
            !content?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "userId, postId and content are required",
            });
        }


        // ========================================
        // CHECK USER
        // ========================================

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // ========================================
        // CHECK POST
        // ========================================

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });


        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }


        // ========================================
        // CHECK PARENT COMMENT
        // ========================================

        if (parentId) {
            const parentComment =
                await prisma.comment.findUnique({
                    where: {
                        id: parentId,
                    },
                });


            if (!parentComment) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Parent comment not found",
                });
            }


            // Parent must belong to same post
            if (
                parentComment.postId !== postId
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Parent comment does not belong to this post",
                });
            }
        }


        // ========================================
        // CREATE COMMENT / REPLY
        // ========================================

        const comment =
            await prisma.comment.create({
                data: {
                    content: content.trim(),
                    userId,
                    postId,
                    parentId: parentId || null,
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


        return res.status(201).json({
            success: true,

            message: parentId
                ? "Reply created successfully"
                : "Comment created successfully",

            comment,
        });

    } catch (error) {
        console.error(
            "CREATE COMMENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create comment",
        });
    }
};