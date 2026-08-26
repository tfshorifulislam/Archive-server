import { prisma } from "../lib/prisma.js";
export const searchPosts = async (req, res) => {
    try {
        const search = String(req.query.search || "").trim();
        if (!search) {
            return res.status(200).json({
                success: true,
                posts: [],
            });
        }
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
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
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            posts,
        });
    }
    catch (error) {
        console.error("SEARCH POSTS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to search posts",
        });
    }
};
