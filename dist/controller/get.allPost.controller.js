import { prisma } from "../lib/prisma.js";
export const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        userName: true,
                        image: true
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            posts,
        });
    }
    catch (error) {
        console.error("GET ALL POSTS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
        });
    }
};
