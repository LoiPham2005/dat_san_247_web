import { useAuthStore } from '@/lib/store/auth.store';
import { authService } from '@/lib/api/services/auth.service';
import { LoginCredentials, RegisterData, UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useAuth = () => {
    const { data: session, status } = useSession();
    const { user, token, isAuthenticated, setAuth, logout: logoutStore } = useAuthStore();
    const router = useRouter();

    // Sync NextAuth session with local Zustand store for axios interceptors
    useEffect(() => {
        if (status === 'authenticated' && session?.user && (session as any).accessToken) {
            const sessionUser: any = {
                id: (session.user as any).id,
                email: session.user.email!,
                fullName: (session.user as any).fullName || session.user.name || '',
                role: (session.user as any).role,
                isActive: true, // Assuming active if logged in
                createdAt: new Date().toISOString(), // Placeholder
            };

            // Only update if token changed to avoid infinite loops if setAuth triggers something
            if (token !== (session as any).accessToken) {
                setAuth(sessionUser, (session as any).accessToken);
            }
        } else if (status === 'unauthenticated' && token) {
            // If NextAuth says unauthenticated but we have a token, clear it
            logoutStore();
        }
    }, [session, status, setAuth, token, logoutStore]);


    const login = async (credentials: LoginCredentials) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: credentials.email,
                password: credentials.password,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            // Get session manually to get the role for redirection
            const session = await getSession();
            const role = (session?.user as any)?.role;

            // Redirect based on role
            if (role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN) {
                router.push('/admin/dashboard');
            } else if (role === UserRole.STAFF) {
                router.push('/staff/support');
            } else if (role === UserRole.OWNER) {
                router.push('/owner/dashboard');
            } else if (role === UserRole.VENUE_STAFF) {
                router.push('/venue-staff/dashboard');
            } else {
                router.push('/');
            }

            router.refresh();
        } catch (error) {
            console.error('Login error', error);
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            await authService.register(userData);
            // After register, auto login
            await login({ email: userData.email, password: userData.password });
        } catch (error) {
            throw error;
        }
    };

    const logout = async (shouldRedirect = false) => {
        try {
            await signOut({ redirect: false });
            logoutStore();
            if (shouldRedirect) {
                router.push('/login');
            }
        } catch (error) {
            logoutStore();
            if (shouldRedirect) {
                router.push('/login');
            }
        }
    };

    return {
        user,
        token,
        isAuthenticated: !!token, // use store truth
        login,
        register,
        logout,
        isLoading: status === 'loading',
    };
};
