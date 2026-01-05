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

            if (email.includes('admin_staff')) role = 'ADMIN_STAFF';
            else if (email.includes('admin')) role = 'ADMIN';
            else if (email.includes('owner')) role = 'OWNER';
            else if (email.includes('staff')) role = 'VENUE_STAFF';

            const user: any = {
                id: '1',
                email: credentials.email,
                name: role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') + ' User',
                role: role as any,
                isActive: true,
                createdAt: new Date().toISOString(),
                phone: '0123456789'
            };

            const token = 'fake-jwt-token';
            setAuth(user, token);

            // Redirect based on role
            if (role === 'ADMIN_STAFF') {
                router.push('/admin-staff/support');
            } else if (role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else if (role === 'OWNER') {
                router.push('/owner/dashboard');
            } else if (role === 'VENUE_STAFF') {
                router.push('/venue-staff/dashboard');
            } else {
                router.push('/');
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
