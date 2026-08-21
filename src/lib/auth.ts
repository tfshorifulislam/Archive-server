import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend";
import { emailOTP } from "better-auth/plugins";
import { verifyEmailTemplate } from "./email/VerificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    plugins: [
        emailOTP({
            sendVerificationOTP: async ({ email, otp, type }) => {
                await resend.emails.send({
                    from: 'MyApp <noreply@myapp.com>',
                    to: email,
                    subject:
                        type === 'sign-in' ? 'Your sign-in code' : 'Your verification code',
                    html: `Your code is <strong>${otp}</strong>.`,
                });
            },
        }),
    ],


    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: user.email,
                subject: 'Reset your password',
                html: `Click <a href="${url}">here</a> to reset your password.`,
            });
        },
    },

    emailVerification: {
        expiresIn: 60 * 5,

        sendVerificationEmail: async ({ user, url }) => {
            const verificationUrl = new URL(url);

            verificationUrl.searchParams.set(
                "callbackURL",
                `${process.env.FRONTEND_URL}/email-verified`
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