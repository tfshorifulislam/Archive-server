import { prisma } from "../lib/prisma.js";
export const getSavedPosts = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId || typeof userId !== "string") {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const savedPosts = await prisma.savedPost.findMany({
            where: {
                userId,
            },
            include: {
                post: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            savedPosts,
        });
    }
    catch (error) {
        console.error("GET SAVED POSTS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get saved posts",
        });
    }
};
