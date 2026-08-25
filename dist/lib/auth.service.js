// services/auth.service.ts
import { auth } from "../lib/auth.js";
export const getCurrentSession = async (req) => {
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
        if (value !== undefined) {
            headers.set(key, Array.isArray(value) ? value.join(", ") : value);
        }
    }
    return auth.api.getSession({
        headers,
    });
};
