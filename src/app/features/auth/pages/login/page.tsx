"use client";

import React, { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "next/navigation";
import routesApp from "@/app/shared/constants/routes";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, loading, error } = useUserStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(identifier, password);
      alert("Đăng nhập thành công!");
      router.push(routesApp.home); // Sửa lại đường dẫn
      // router.push('/features/home/pages')
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

        <input
          type="text"
          placeholder="Email hoặc Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
