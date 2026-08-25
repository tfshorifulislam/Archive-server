import { auth } from "../lib/auth.js";
export async function requireAuth(req, res, next) {
    try {
        console.log("METHOD:", req.method);
        console.log("COOKIE:", req.headers.cookie);
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
            if (value !== undefined) {
                headers.set(key, Array.isArray(value) ? value.join(", ") : value);
            }
        }
        const session = await auth.api.getSession({
            headers,
        });
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.user = session.user;
        next();
    }
    catch (error) {
        console.error("AUTH MIDDLEWARE ERROR:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}
