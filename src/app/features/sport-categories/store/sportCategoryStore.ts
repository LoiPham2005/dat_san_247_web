import { create } from "zustand";
import { sportCategoryApi } from "../service/sportCategoryApi";
import { SportCategory } from "../types/sportCategoryTypes";

interface SportCategoryState {
  categories: SportCategory[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategories: (formData: FormData) => Promise<void>;
  updateCategory: (id: number, formData: FormData) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
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
  createCategories: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const res = await sportCategoryApi.create(formData);
      const currentCategories = get().categories;
      set({
        categories: [...currentCategories, res.data],
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Cập nhật danh mục
  updateCategory: async (id: number, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const res = await sportCategoryApi.update(id, formData);
      const updatedCategories = get().categories.map((cat) =>
        cat.categoryId === id ? res.data : cat
      );
      set({ categories: updatedCategories, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Xóa danh mục
  deleteCategory: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await sportCategoryApi.delete(id);
      const filteredCategories = get().categories.filter(
        (cat) => cat.categoryId !== id
      );
      set({ categories: filteredCategories, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
