import { Request, Response } from "express"
import { prisma } from "../lib/prisma";

export const userNameValidation = async (req: Request, res: Response) => {

    try {
        const { userName } = req.body;

        if (!userName || typeof userName !== "string") {
            return res.status(400).json({
                success: false,
                message: "UserName is required"
            })
        }

        const user = await prisma.user.findMany({
            where: {
                userName: userName,
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