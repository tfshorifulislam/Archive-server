import {
    Request,
    Response,
    NextFunction,
} from "express";

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        next();
    } catch (error) {
        console.error("AUTH MIDDLEWARE ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}