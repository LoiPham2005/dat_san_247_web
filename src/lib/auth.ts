import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/lib/api/services/auth.service";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const data = await authService.login({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (data && data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            fullName: data.user.fullName,
                            role: data.user.role,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                        };
                    }
                    return null;
                } catch (error: any) {
                    // Extract error message from axios error
                    const errorMsg = error.response?.data?.message || error.message || 'Login failed';
                    throw new Error(errorMsg);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.fullName = user.fullName;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session.user as any).fullName = token.fullName;
                (session as any).accessToken = token.accessToken;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
