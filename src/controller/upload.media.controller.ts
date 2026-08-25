
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { uploadToCloudinary } from "../lib/cloudinary_config/uploadToCloudinary.js";

export const createPost = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            title,
            content,
            tags,
            userId,
        } = req.body;


        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }


        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Content is required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
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

        let parsedTags: string[] = [];

        if (tags) {
            try {
                const parsed = JSON.parse(tags);

                if (Array.isArray(parsed)) {
                    parsedTags = parsed
                        .filter(
                            (tag): tag is string =>
                                typeof tag === "string"
                        )
                        .map((tag) => tag.trim())
                        .filter(Boolean);
                }
            } catch (error) {
                console.error(
                    "TAGS PARSE ERROR:",
                    error
                );

                parsedTags = [];
            }
        }


        let mediaUrl: string | null = null;
        let mediaType: string | null = null;

        if (req.file) {
            mediaUrl = await uploadToCloudinary(
                req.file.buffer
            );

            mediaType =
                req.file.mimetype.startsWith("video/")
                    ? "video"
                    : "image";
        }



        const post = await prisma.post.create({
            data: {
                title: title?.trim() || null,
                content,
                mediaUrl,
                mediaType,
                tags: parsedTags,
                userId,
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
        console.error(
            "CREATE POST ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};