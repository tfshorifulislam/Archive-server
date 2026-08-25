import { prisma } from "../lib/prisma.js";
export const toggleSavePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = String(req.params.postId);
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });
        // Already saved → Unsave
        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id,
                },
            });
            return res.status(200).json({
                success: true,
                saved: false,
                message: "Post removed from saved posts",
            });
        }
        // Not saved → Save
        await prisma.savedPost.create({
            data: {
                userId,
                postId,
            },
        });
        return res.status(200).json({
            success: true,
            saved: true,
            message: "Post saved successfully",
        });
    }
    catch (error) {
        console.error("Toggle save post error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to toggle saved post",
        });
    }
};
