import { Request, Response } from "express"
import { prisma } from "../lib/prisma";

export const userNameValidation = async (req: Request, res: Response) => {

    try {
        const { userName } = req.query;

        if (!userName || typeof userName !== "string") {
            return res.status(400).json({
                success: false,
                available: false,
                message: "UserName is required"
            })
        }

        // Only letters and numbers are allowed
        const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

        if (!usernameRegex.test(userName)) {
            return res.status(400).json({
                success: false,
                available: false,
                message: "Username can only contain letters and numbers",
            });
        }

        // Check minimum length
        if (userName.length < 3) {
            return res.status(400).json({
                success: false,
                available: false,
                message: "Username must be at least 3 characters",
            });
        }


        const user = await prisma.user.findUnique({
            where: {
                userName
            },
        });

        if (user) {
            return res.status(409).json({
                success: false,
                available: false,
                message: "Username is already taken"
            })
        }

        else {
            return res.status(200).json({
                success: true,
                available: true,
                message: 'Username is available'
            })
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}