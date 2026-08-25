export async function requireAuth(req, res, next) {
    try {
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
