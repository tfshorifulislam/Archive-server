import { prisma } from "../lib/prisma.js";
import { uploadToCloudinary } from "../lib/cloudinary_config/uploadToCloudinary.js";
export const createPost = async (req, res) => {
    try {
        const { title, content, tags, userId } = req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required",
            });
        }
        // Check user exists
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        let parsedTags = [];
        if (tags) {
            try {
                parsedTags = JSON.parse(tags);
            }
            catch {
                parsedTags = [];
            }
        }
        let mediaUrl = null;
        let mediaType = null;
        if (req.file) {
            mediaUrl = await uploadToCloudinary(req.file.buffer);
            mediaType = req.file.mimetype.startsWith("video/")
                ? "video"
                : "image";
        }
        const post = await prisma.post.create({
            data: {
                title: title || null,
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
    }
    catch (error) {
        console.error("CREATE POST ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};
