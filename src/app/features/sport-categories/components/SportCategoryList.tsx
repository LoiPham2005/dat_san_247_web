"use client";

import { useEffect } from "react";
import { useSportCategoryStore } from "../store/sportCategoryStore";

export default function SportCategoryList() {
  const { categories, loading, error, fetchCategories } = useSportCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh mục sân thể thao</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.categoryId} className="flex items-center space-x-3 border-b pb-2">
            <img
              src={category.iconUrl}
              alt={category.categoryName}
              className="w-10 h-10 rounded"
            />
            <div>
              <p className="font-semibold">{category.categoryName}</p>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
