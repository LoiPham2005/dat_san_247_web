import { create } from "zustand";
import { sportCategoryApi } from "../service/sportCategoryApi";
import { SportCategory } from "../types/sportCategoryTypes";

interface SportCategoryState {
  categories: SportCategory[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategories: (category: SportCategory) => Promise<void>;
}

export const useSportCategoryStore = create<SportCategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  // Lấy tất cả danh mục
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await sportCategoryApi.getAll();
      set({ categories: res.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Tạo danh mục mới
  createCategories: async (category: SportCategory) => {
    set({ loading: true, error: null });
    try {
      const res = await sportCategoryApi.create(category);
      // Dùng get() để lấy state hiện tại và nối dữ liệu mới vào
      set({ categories: [...get().categories, res.data], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
