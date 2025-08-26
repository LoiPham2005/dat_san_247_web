import api from "@/app/shared/utils/api";
import { SportCategory } from "../types/sportCategoryTypes";
import endpoints from "@/app/shared/constants/endpoints";
import { BaseResponse } from "@/app/shared/constants/baseResponse";

export const sportCategoryApi = {
  getAll: async (): Promise<BaseResponse<SportCategory[]>> => {
    const res = await api.get<BaseResponse<SportCategory[]>>(endpoints.sportCategories.getAll);
    return res.data;
  },

  create: async (category: SportCategory) => {
    const res = await api.post<BaseResponse<SportCategory>>(endpoints.sportCategories.create, category);
    return res.data;
  }
};
