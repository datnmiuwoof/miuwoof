"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, X, Upload, Image } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


const CategoryEditPage = () => {

    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent_id: null,
        is_active: true,
        create_at: '',
        update_at: '',
    });
    const [parentId, setParentId] = useState(null)
    const [parentCategories, setParentCategories] = useState<any>([])

    useEffect(() => {
        dataCategory();
    }, [])

    const dataCategory = async () => {
        try {
            const data = await fetch(`http://localhost:3000/api/categorys/${id}`);
            const res = await data.json();
            const result = res.data;

            setFormData({
                name: result.category.name,
                description: result.category.description,
                parent_id: result.category.parent_id || null,
                is_active: result.category.is_active,
                create_at: result.category.createdAt,
                update_at: result.category.updatedAt,
            });
            setParentId(result.category.parent_id)
            setParentCategories(res.data.allCategories);
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const dataToSend = {
        name: formData.name,
        description: formData.description,
        is_active: formData.is_active,
        parent_id: formData.parent_id,
    };

    const handleSubmit = async () => {
        try {
            const result = await fetch(`http://localhost:3000/api/categorys/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend),
                credentials: "include"
            })

            if (result) {
                router.push("/admin/category")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancel = () => {
        if (confirm('Bạn có chắc muốn hủy? Các thay đổi sẽ không được lưu.')) {
            window.history.back();
        }
    };

    return (
        <div className="main p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Quay lại</span>
                        </button>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h1 className="text-xl font-semibold text-gray-800">Chỉnh sửa danh mục</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    Thông tin cơ bản
                                </h2>

                                {/* Tên danh mục */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên danh mục <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                                        placeholder="Nhập tên danh mục..."
                                        required
                                    />
                                </div>

                                {/* Danh mục cha */}
                                {parentId ? (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Danh mục cha
                                        </label>
                                        <select
                                            name="parentCategory"
                                            value={formData.parent_id}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                                        >
                                            {parentCategories.map((cat: any) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Chọn danh mục cha nếu đây là danh mục con
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-xs font-bold text-gray-500 mt-1">
                                        Đây là danh mục cha
                                    </p>
                                )}


                                {/* Mô tả */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mô tả
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none"
                                        placeholder="Nhập mô tả danh mục..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Trạng thái */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            Trạng thái
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Kích hoạt danh mục</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {formData.is_active
                                ? 'Danh mục đang hoạt động và hiển thị trên website'
                                : 'Danh mục không hiển thị trên website'}
                        </p>
                    </div>

                    {/* Thông tin bổ sung */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            Thông tin
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ngày tạo:</span>
                                <span className="font-medium text-gray-900">{new Date(formData.create_at).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Cập nhật:</span>
                                <span className="font-medium text-gray-900">{new Date(formData.update_at).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryEditPage;