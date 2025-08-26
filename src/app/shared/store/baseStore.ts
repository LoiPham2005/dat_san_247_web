import { create } from "zustand";
import axios from "axios";

export interface BaseState<T> {
  data: T[];
  loading: boolean;
  error: string | null;

  // CRUD cơ bản
  fetchData: () => Promise<void>;
  addItem: (item: Omit<T, "id">) => Promise<void>;
  updateItem: (id: number, updatedItem: Partial<T>) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

export function createApiStore<T>(endpoints: {
  getUrl: string;
  postUrl: string;
  updateUrl: (id: number) => string;
  deleteUrl: (id: number) => string;
}) {
  return create<BaseState<T>>((set, get) => ({
    data: [],
    loading: false,
    error: null,

    // GET ALL
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axios.get<T[]>(endpoints.getUrl);
        set({ data: res.data, loading: false });
      } catch (err: any) {
        set({ error: err.response?.data?.message || err.message, loading: false });
      }
    },

    // POST
    addItem: async (item) => {
      set({ loading: true, error: null });
      try {
        const res = await axios.post<T>(endpoints.postUrl, item);
        set({ data: [...get().data, res.data], loading: false });
      } catch (err: any) {
        set({ error: err.response?.data?.message || err.message, loading: false });
      }
    },

    // PUT
    updateItem: async (id, updatedItem) => {
      set({ loading: true, error: null });
      try {
        const res = await axios.put<T>(endpoints.updateUrl(id), updatedItem);
        const updated = res.data;
        const data = get().data.map((item: any) =>
          (item as any).id === id ? updated : item
        );
        set({ data, loading: false });
      } catch (err: any) {
        set({ error: err.response?.data?.message || err.message, loading: false });
      }
    },

    // DELETE
    deleteItem: async (id) => {
      set({ loading: true, error: null });
      try {
        await axios.delete(endpoints.deleteUrl(id));
        const data = get().data.filter((item: any) => (item as any).id !== id);
        set({ data, loading: false });
      } catch (err: any) {
        set({ error: err.response?.data?.message || err.message, loading: false });
      }
    },
  }));
}


