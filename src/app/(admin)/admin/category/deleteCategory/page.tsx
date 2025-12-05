"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Trash2, RotateCcw, X, Calendar } from 'lucide-react';


const CategoryTrash = () => {

    const router = useRouter();
    const [categories, setCategories] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch('http://localhost:3000/api/categorys/softDelete', { credentials: 'include' });
        const res = await data.json();

        setCategories(res.data)
        console.log(res)
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

    const categoriesWithChildren = categoryParent(categories);

    const handleRestore = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/api/categorys/${id}/restore`, {
                method: "PATCH",
                credentials: "include"
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.message || "Khôi phục thất bại!");
                return;
            }

            alert("Khôi phục danh mục thành công!");
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra!");
        }
    };




    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Trash2 className="w-8 h-8 text-red-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Thùng rác danh mục</h1>
                </div>
                <p className="text-gray-600">Quản lý các danh mục đã xóa. Bạn có thể khôi phục hoặc xóa vĩnh viễn.</p>
            </div>

            {/* Stats & Actions Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Tổng số danh mục</p>
                            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {categories.length > 0 && (
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
                                onClick={() => router.push('/admin/category')}
                            >
                                Quay về danh mục
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục đã xóa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            {categories.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Trash2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Thùng rác trống</h3>
                    <p className="text-gray-500">Chưa có danh mục nào bị xóa.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Tên danh mục
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Mô tả
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Số sản phẩm
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Ngày xóa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((category: any) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-gray-900">{category.name}</div>
                                                {category.parent_id === null && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Danh mục: <span className="font-medium">cha</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 text-sm max-w-xs truncate">
                                            {category.description || '—'}
                                        </td>
                                        <td className="px-6 py-4 text-center">

                                            {category.parent_id === null ? (
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-800 font-semibold rounded-full">
                                                    {
                                                        categoriesWithChildren.map(p => p.quantity)
                                                    }
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-800 font-semibold rounded-full">
                                                    {category.Products?.length || 0}
                                                </span>
                                            )}

                                        </td>
                                        <td className="px-6 py-4 text-gray-700 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {new Date(category.updatedAt).toLocaleDateString("vi-VN")}

                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="flex items-center gap-1 text-green-600 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                                                    onClick={() => handleRestore(category.id)}
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                    Khôi phục
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryTrash;