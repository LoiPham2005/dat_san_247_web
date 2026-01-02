"use client";

import { useState, useEffect } from "react";
import { useSportCategoryStore } from "../store/sportCategoryStore";
import { SportCategory } from "../types/sportCategoryTypes";

export default function SportCategoryManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<SportCategory | null>(
        null
    );
    const [formData, setFormData] = useState({
        categoryName: "",
        description: "",
        iconUrl: "",
        displayOrder: 0,
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        categories,
        loading,
        error,
        fetchCategories,
        createCategories,
        updateCategory,
        deleteCategory,
    } = useSportCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("categoryName", formData.categoryName);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("displayOrder", formData.displayOrder.toString());

            // Thêm file nếu có
            if (selectedFile) {
                formDataToSend.append("iconUrl", selectedFile);
            }

            if (editingCategory) {
                await updateCategory(editingCategory.categoryId, formDataToSend);
            } else {
                await createCategories(formDataToSend);
            }

            setIsModalOpen(false);
            setEditingCategory(null);
            setSelectedFile(null);
            setFormData({
                categoryName: "",
                description: "",
                iconUrl: "",
                displayOrder: 0,
            });
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Preview image
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, iconUrl: imageUrl });
        }
    };

    const handleEdit = (category: SportCategory) => {
        setEditingCategory(category);
        setFormData({
            categoryName: category.categoryName,
            description: category.description,
            iconUrl: category.iconUrl,
            displayOrder: category.displayOrder,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Bạn có chắc muốn xóa danh mục này không?")) {
            try {
                await deleteCategory(id);
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-green-700">
                    ⚽ Quản lý danh mục sân thể thao
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md"
                >
                    ➕ Thêm danh mục
                </button>
            </div>

            {/* Loading / Error */}
            {loading && <p className="text-blue-500">Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Danh sách danh mục */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.categoryId}
                        className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 hover:shadow-2xl transition-shadow"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={category.iconUrl || "/default-icon.png"}
                                alt={category.categoryName}
                                className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-green-700">
                                    {category.categoryName}
                                </h3>
                                <p className="text-gray-600">{category.description}</p>
                                <div className="mt-2 text-sm text-gray-500">
                                    📌 Thứ tự hiển thị:{" "}
                                    <span className="font-semibold">
                                        {category.displayOrder}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => handleEdit(category)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                ✏️ Sửa
                            </button>
                            <button
                                onClick={() => handleDelete(category.categoryId)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                🗑️ Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal thêm/sửa danh mục */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200">
                        <h2 className="text-2xl font-bold mb-4 text-green-700">
                            {editingCategory ? "✏️ Sửa danh mục" : "➕ Thêm danh mục mới"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Form content */}
                            <div className="space-y-4">
                                {/* Tên danh mục */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tên danh mục
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.categoryName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, categoryName: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    />
                                </div>
                                {/* Mô tả */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mô tả
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                </div>

                                {/* File upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ảnh Icon
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full text-sm text-gray-600 
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    />
                                    {formData.iconUrl && (
                                        <div className="mt-3">
                                            <img
                                                src={formData.iconUrl}
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded-full border-2 border-green-500"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Thứ tự hiển thị */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Thứ tự hiển thị
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.displayOrder}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                displayOrder: parseInt(e.target.value),
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingCategory(null);
                                    }}
                                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    {editingCategory ? "Cập nhật" : "Thêm mới"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
