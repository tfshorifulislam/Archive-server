import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },

    user: {
        additionalFields: {
            userName: {
                type: "string",
                required: true,
            },
        },
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },

    trustedOrigins: [process.env.FRONTEND_URL!],
});