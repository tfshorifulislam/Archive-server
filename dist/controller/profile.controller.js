import { getCurrentSession } from "../lib/auth.service.js";
import { prisma } from "../lib/prisma.js";
export const getUserProfile = async (req, res) => {
    try {
        const { userName } = req.params;
        if (!userName) {
            return res.status(400).json({
                success: false,
                message: "Username is require",
            });
        }
        if (typeof userName !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid username",
            });
        }
        // Find public profile by username
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
            }
        });
        if (!profileUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        ;
        const session = await getCurrentSession(req);
        // Check whether profile belongs to logged-in user
        const isOwnProfile = session?.user?.id === profileUser.id;
        return res.status(200).json({
            success: true,
            user: profileUser,
            isOwnProfile,
        });
    }
    catch (error) {
        console.error("GET USER PROFILE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get user Profile"
        });
    }
};
