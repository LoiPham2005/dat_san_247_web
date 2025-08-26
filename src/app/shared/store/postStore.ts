import { create } from "zustand";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostState {
  data: Post[];
  loading: boolean;
  error: string | null;

  // CRUD Functions
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: number, updatedPost: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  data: [],
  loading: false,
  error: null,

  // 🟢 READ
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await res.json();
      set({ data: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🟢 CREATE
  addPost: async (post: Omit<Post, "id">) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const newPost: Post = await res.json();
      set({ data: [...get().data, newPost], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🟡 UPDATE
  updatePost: async (id: number, updatedPost: Partial<Post>) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      const data: Post = await res.json();
      const updatedPosts = get().data.map((p) =>
        p.id === id ? { ...p, ...data } : p
      );

      set({ data: updatedPosts, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔴 DELETE
  deletePost: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });

      const filteredPosts = get().data.filter((p) => p.id !== id);
      set({ data: filteredPosts, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
