"use client"

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import React from "react";
import { Search, Filter, ChevronDown, Plus, Edit, Trash2, ChevronRight } from 'lucide-react';

export default function CategoryManagement() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState<any>([]);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 2, 20]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const apiCategories = await fetch("http://localhost:3000/api/categorys", { credentials: "include" })
            const res = await apiCategories.json();
            setCategory(res.data)
        } catch (error) {
            console.log(error)
        }

    }



    const categoryParent = (categories: any) => {
        const parents = categories.filter((p: any) => p.parent_id === null);

        return parents.map((parent: any) => {
            const children = categories.filter((cat: any) => cat.parent_id === parent.id);


            let totalProduct = 0;

            children.forEach(child => {
                totalProduct += child.Products.length;
            });



            return {
                ...parent,
                children,
                quantity: totalProduct,
            };
        });
    };

    const categoriesWithChildren = categoryParent(category);

    const toggleExpand = (categoryId: number) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const handleDelete = async (id: any) => {
        try {
            const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
            if (!isConfirm) return;
            const res = await fetch(`http://localhost:3000/api/categorys/softDelete/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Xóa thất bại!");
                return;
            }

            alert("Xóa danh mục thành công!");
            fetchData()

        } catch (error) {
            console.error(error);
            alert("Lỗi kết nối tới server!");
        }
    };


    const statusConfig = {
        true: { label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
        false: { label: 'Không hoạt động', color: 'bg-gray-100 text-gray-800' }
    };

    // Format date
    const formatDate = (dateString: string) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="main p-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ô tìm kiếm */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div className="flex space-x-1 items-center justify-end">
                        <button className="text-center !mr-2 rounded px-4 py-2 bg-red-600 text-white hover:bg-red-400"
                            onClick={() => router.push('/admin/category/deleteCategory')}
                        >
                            Danh mục đã xóa
                        </button>
                        <button className="flex items-center gap-2 text-center rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => router.push('/admin/category/addCategory')}
                        >
                            <Plus className="w-4 h-4" />
                            Thêm danh mục
                        </button>

                    </div>
                </div>
            </div>

            <div className="">
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-m font-semibold text-gray-800 mb-2">Danh sách danh mục</h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-8">
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tên danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mô tả
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Số sản phẩm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {categoriesWithChildren.map((parentCategory: any) => {
                            const isExpanded = expandedCategories.includes(parentCategory.id);

                            return (
                                <React.Fragment key={parentCategory.id}>
                                    {/* CATEGORY CHA */}
                                    <tr
                                        key={parentCategory.id}
                                        className="hover:bg-gray-50 transition-colors duration-150 bg-blue-50"
                                    >
                                        {/* NÚT EXPAND/COLLAPSE */}
                                        <td className="px-4 py-4">
                                            {parentCategory.children.length > 0 && (
                                                <button
                                                    onClick={() => toggleExpand(parentCategory.id)}
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    <ChevronRight
                                                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                    />
                                                </button>
                                            )}
                                        </td>

                                        {/* TÊN DANH MỤC */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="font-semibold text-gray-900">{parentCategory.name}</div>
                                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded bg-purple-100 text-purple-800">
                                                    Chính
                                                </span>
                                                {parentCategory.children.length > 0 && (
                                                    <span className="text-xs text-gray-500">
                                                        ({parentCategory.children.length} danh mục con)
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* MÔ TẢ */}
                                        <td className="px-6 py-4 text-gray-700 text-sm max-w-xs truncate">
                                            {parentCategory.description || '—'}
                                        </td>

                                        {/* SỐ SẢN PHẨM */}
                                        <td className="px-6 py-4 text-gray-700 text-sm text-center">
                                            <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 font-semibold rounded-full">
                                                {parentCategory?.quantity || 0}
                                            </span>
                                        </td>

                                        {/* TRẠNG THÁI */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[parentCategory.is_active as keyof typeof statusConfig].color}`}>
                                                {statusConfig[parentCategory.is_active as keyof typeof statusConfig].label}
                                            </span>
                                        </td>

                                        {/* NGÀY TẠO */}
                                        <td className="px-6 py-4 text-gray-700 text-sm">
                                            {formatDate(parentCategory.createdAt)}
                                        </td>

                                        {/* THAO TÁC */}
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                                                    onClick={() => router.push(`/admin/category/${parentCategory.id}`)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Sửa
                                                </button>
                                                <button className="flex items-center gap-1 text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                                                    onClick={() => handleDelete(parentCategory.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* CATEGORY CON */}
                                    {isExpanded && parentCategory.children.map((childCategory: any) => (
                                        <tr
                                            key={childCategory.id}
                                            className="hover:bg-gray-50 transition-colors duration-150 bg-gray-50"
                                        >
                                            {/* EMPTY CELL */}
                                            <td className="px-4 py-4"></td>

                                            {/* TÊN DANH MỤC */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">└─</span>
                                                    <div className="font-medium text-gray-900">{childCategory.name}</div>
                                                </div>
                                            </td>

                                            {/* MÔ TẢ */}
                                            <td className="px-6 py-4 text-gray-700 text-sm max-w-xs truncate">
                                                {childCategory.description || '—'}
                                            </td>

                                            {/* SỐ SẢN PHẨM */}
                                            <td className="px-6 py-4 text-gray-700 text-sm text-center">
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-800 font-semibold rounded-full">
                                                    {childCategory.Products?.length || 0}
                                                </span>
                                            </td>

                                            {/* TRẠNG THÁI */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[childCategory.is_active as keyof typeof statusConfig].color}`}>
                                                    {statusConfig[childCategory.is_active as keyof typeof statusConfig].label}
                                                </span>
                                            </td>

                                            {/* NGÀY TẠO */}
                                            <td className="px-6 py-4 text-gray-700 text-sm">
                                                {formatDate(childCategory.createdAt)}
                                            </td>

                                            {/* THAO TÁC */}
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50">
                                                        <Edit className="w-4 h-4"
                                                            onClick={() => router.push(`/admin/category/${childCategory.id}`)}
                                                        />
                                                        Sửa
                                                    </button>
                                                    <button className="flex items-center gap-1 text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                                                        onClick={() => handleDelete(childCategory.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}