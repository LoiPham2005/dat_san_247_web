import { useAuthStore } from '@/lib/store/auth.store';
import { authService } from '@/lib/api/services/auth.service';
import { LoginCredentials, RegisterData } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const { user, token, isAuthenticated, setAuth, logout: logoutStore } = useAuthStore();
    const router = useRouter();

    const login = async (credentials: LoginCredentials) => {
        try {
            const data = await authService.login(credentials);
            setAuth(data.user, data.token);

            // Redirect based on role
            switch (data.user.role) {
                case 'ADMIN':
                    router.push('/admin/dashboard');
                    break;
                case 'OWNER':
                    router.push('/owner/dashboard');
                    break;
                case 'STAFF':
                    router.push('/staff/dashboard');
                    break;
                default:
                    router.push('/');
            }
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            const data = await authService.register(userData);
            setAuth(data.user, data.token);
            router.push('/');
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            logoutStore();
            router.push('/login');
        } catch (error) {
            logoutStore();
            router.push('/login');
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
    };
};
