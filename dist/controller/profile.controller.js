import { prisma } from "../lib/prisma.js";
export const getUserProfile = async (req, res) => {
    try {
        const { userName } = req.params;
        if (!userName || typeof userName !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid username",
            });
        }
        const profileUser = await prisma.user.findUnique({
            where: {
                userName,
            },
            select: {
                id: true,
                userName: true,
                name: true,
                image: true,
                createdAt: true,
            },
        });
        if (!profileUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user: profileUser,
        });
    }
    catch (error) {
        console.error("GET USER PROFILE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get user profile",
        });
    }
};
