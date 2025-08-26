import { create } from "zustand";
import { Data } from "../types/userType";
import { authService } from "../services/authApi";

interface UserState {
  user: Data | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullname: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  // Đăng nhập
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(email, password);
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      set({ user: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Đăng nhập thất bại", loading: false });
    }
  },

  // Đăng ký
  register: async (fullname, username, email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.register(fullname, username, email, password);
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      set({ user: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Đăng ký thất bại", loading: false });
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null });
  },
}));
