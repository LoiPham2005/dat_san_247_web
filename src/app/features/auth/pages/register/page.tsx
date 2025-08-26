"use client";

import React, { useState } from "react";
import { useUserStore } from "../../store/userStore";

const RegisterPage = () => {
  const { register, loading, error } = useUserStore();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(fullname, username, email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>

        <input
          type="text"
          placeholder="Họ và tên"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
