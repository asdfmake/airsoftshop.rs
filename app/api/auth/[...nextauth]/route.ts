import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@/prisma/prisma";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID ?? "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Check if user exists in DB
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email! },
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email: user.email!,
                        username: user.name?.trim() || user.email?.split("@")[0] || "unknown",
                        profilePicture: user.image,
                        provider: account?.provider ?? "unknown",
                    },
                });
            }
            return true;
        }
    },
    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     // error: '/auth/error', // Error code passed in query string as ?error=
    //     // verifyRequest: '/auth/verify-request', // (used for check email message)
    //     // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // }
})

export { handler as GET, handler as POST }