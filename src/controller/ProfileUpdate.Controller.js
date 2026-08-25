import { prisma } from "../lib/prisma.js";
import { getCurrentSession } from "../lib/auth.service.js";
export const updateProfile = async (req, res) => {
    try {
        const session = await getCurrentSession(req);
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { name, userName } = req.body;
        if (!name || !userName) {
            return res.status(400).json({
                success: false,
                message: "Name and username are required",
            });
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                userName,
                NOT: {
                    id: session.user.id,
                },
            },
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username already exists",
            });
        }
        const user = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name,
                userName,
            },
            select: {
                id: true,
                name: true,
                userName: true,
                image: true,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    }
    catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};
