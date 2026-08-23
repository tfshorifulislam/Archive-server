import { Request, Response } from "express";
import { getCurrentSession } from "../lib/auth.service";
import { uploadToCloudinary } from "../lib/uploadToCloudinary";
import { prisma } from "../lib/prisma";

export const createPost = async (
    req: Request,
    res: Response
) => {
    try {
        const session = await getCurrentSession(req);

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { title, content } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required",
            });
        }

        let mediaUrl: string | null = null;
        let mediaType: string | null = null;

        // Upload image/video
        if (req.file) {
            mediaUrl = await uploadToCloudinary(
                req.file.buffer
            );

            mediaType = req.file.mimetype.startsWith("video/")
                ? "video"
                : "image";
        }

        // Create post
        const post = await prisma.post.create({
            data: {
                title: title || null,
                content,
                mediaUrl,
                mediaType,
                userId: session.user.id,
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
            message: "Post created successfully",
            post,
        });

    } catch (error) {
        console.error("CREATE POST ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};