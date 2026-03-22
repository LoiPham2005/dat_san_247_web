import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MOCK_USERS } from "@/constants/mock-users";
import { authApi } from "@/features/auth/api/auth.api";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const response = await authApi.login({
                        email: credentials.email,
                        password: credentials.password
                    });

                    // Dựa trên Log Debug: Backend trả về { success, data: { access_token, user ... } }
                    const apiResponse = response.data; // Type: AuthResponse
                    const data = apiResponse.data;     // Type: AuthData

                    if (data && data.user) {
                        // Trích xuất role slug an toàn (Object hoặc String)
                        const roleSlug = typeof data.user.role === 'object' 
                            ? data.user.role?.slug 
                            : (data.user.role || 'customer');

                        const userResult = {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.full_name,
                            role: roleSlug,
                            isVenueStaff: (data.user as any).is_venue_staff || false,
                            image: data.user.avatar_url,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                        };

                        console.log('>>> [NEXT-AUTH DEBUG] Authorize Success:', userResult.email, 'Role:', userResult.role, 'isStaff:', userResult.isVenueStaff);
                        return userResult;
                    }

                    console.warn('>>> [NEXT-AUTH DEBUG] Authorize Failed: No user data in API data field', apiResponse);
                    return null;
                } catch (error: any) {
                    console.error(">>> [NEXT-AUTH DEBUG] Login Error:", error.response?.data || error.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.isVenueStaff = (user as any).isVenueStaff;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).isVenueStaff = token.isVenueStaff;
                (session.user as any).accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
};
