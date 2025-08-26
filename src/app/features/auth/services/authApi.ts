import { BaseResponse } from "@/app/shared/constants/baseResponse";
import api from "@/app/shared/utils/api";
import { Data } from "../types/userType";
import endpoints from "@/app/shared/constants/endpoints";

export const authService = {
  // Đăng nhập
  login: async (email: string, password: string) => {
    const res = await api.post<BaseResponse<Data>>(endpoints.auth.login, { email, password });
    return res.data;
  },

  // Đăng ký
  register: async (fullname: string, username: string, email: string, password: string) => {
    const res = await api.post<BaseResponse<Data>>(endpoints.auth.register, {
      fullname,
      username,
      email,
      password,
    });
    return res.data;
  },

  // đăng xuất
  logout: async () => {
    const res = await api.post<BaseResponse<Data>>(endpoints.auth.logout);
    return res.data;
  },
};
