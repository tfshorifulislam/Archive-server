import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    user: {
        additionalFields: {
            userName: {
                type: 'string',
                required: true
            }
        }
    },

    emailAndPassword: {
        enabled: true,
    },


    trustedOrigins: [process.env.FRONTEND_URL!],

    
});