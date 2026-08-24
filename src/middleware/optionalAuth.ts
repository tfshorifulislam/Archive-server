import {
    Request,
    Response,
    NextFunction,
} from "express";

import { auth } from "../lib/auth";

export async function optionalAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const headers = new Headers();

        for (const [key, value] of Object.entries(req.headers)) {
            if (value !== undefined) {
                headers.set(
                    key,
                    Array.isArray(value)
                        ? value.join(", ")
                        : value
                );
            }
        }

        const session = await auth.api.getSession({
            headers,
        });

        if (session) {
            req.user = session.user;
        }

        next();
    } catch (error) {
        // Guest হলে error না দিয়ে সামনে যেতে দাও
        next();
    }
}