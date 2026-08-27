import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


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