import { prisma } from "../lib/prisma.js";
export const getSavedPosts = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                unauthorized: true,
            });
        }
        const userId = req.user.id;
        const savedPosts = await prisma.savedPost.findMany({
            where: {
                userId,
            },
            include: {
                post: {
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
