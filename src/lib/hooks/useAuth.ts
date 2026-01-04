import { useAuthStore } from '@/lib/store/auth.store';
import { authService } from '@/lib/api/services/auth.service';
import { LoginCredentials, RegisterData } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const { user, token, isAuthenticated, setAuth, logout: logoutStore } = useAuthStore();
    const router = useRouter();

    const login = async (credentials: LoginCredentials) => {
        try {
            // SIMULATED LOGIN LOGIC
            await new Promise(resolve => setTimeout(resolve, 800)); // Fake delay

            let role = 'CUSTOMER';
            const email = credentials.email.toLowerCase();

            if (email.includes('admin')) role = 'ADMIN';
            else if (email.includes('owner')) role = 'OWNER';
            else if (email.includes('staff')) role = 'STAFF';

            const user: any = {
                id: '1',
                email: credentials.email,
                name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
                role: role as any,
                isActive: true,
                createdAt: new Date().toISOString(),
                phone: '0123456789'
            };

            const token = 'fake-jwt-token';
            setAuth(user, token);

            // Redirect based on role
            // All management roles go to /admin for now per user request
            if (['ADMIN', 'OWNER', 'STAFF'].includes(role)) {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
                // router.push('/customer/bookings');
            }
        } catch (error) {
            console.error('Login error', error);
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
