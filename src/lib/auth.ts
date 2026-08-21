import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend";
import { verifyEmailTemplate } from "./email/VerificationEmail";
import { resetPasswordTemplate } from "./email/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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
                type: 'string',
                required: true
            }
        }
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url }) => {
            const resetUrl = new URL(url);

            resetUrl.searchParams.set(
                "callbackURL",
                `${process.env.FRONTEND_URL}/auth/resetPassword`
            );

            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: user.email,
                subject: "Reset your password",
                html: resetPasswordTemplate(
                    user.name,
                    resetUrl.toString()
                ),
            });
        },

    },

    emailVerification: {
        expiresIn: 60 * 5,

        sendVerificationEmail: async ({ user, url }) => {
            const verificationUrl = new URL(url);

            verificationUrl.searchParams.set(
                "callbackURL",
                `${process.env.FRONTEND_URL}/auth/email-verified`
            );

            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: user.email,
                subject: "Verify your email address",
                html: verifyEmailTemplate(
                    user.name,
                    verificationUrl.toString()
                ),
            });
        },
    },


    trustedOrigins: [process.env.FRONTEND_URL!],


}); 