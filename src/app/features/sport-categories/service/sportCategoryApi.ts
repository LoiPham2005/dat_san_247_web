import api from "@/app/shared/utils/api";
import { SportCategory } from "../types/sportCategoryTypes";
import endpoints from "@/app/shared/constants/endpoints";
import { BaseResponse } from "@/app/shared/constants/baseResponse";

export const sportCategoryApi = {
  getAll: async (): Promise<BaseResponse<SportCategory[]>> => {
    const res = await api.get<BaseResponse<SportCategory[]>>(endpoints.sportCategories.getAll);
    return res.data;
  },

  create: async (formData: FormData) => {
    const res = await api.post<BaseResponse<SportCategory>>(
      endpoints.sportCategories.create,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },

  update: async (id: number, formData: FormData) => {
    const res = await api.put<BaseResponse<SportCategory>>(
      endpoints.sportCategories.update(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },

  delete: async (id: number) => {
    const res = await api.delete<BaseResponse<null>>(
      endpoints.sportCategories.delete(id) // ✅ gọi function
    );
    return res.data;
  }
};
