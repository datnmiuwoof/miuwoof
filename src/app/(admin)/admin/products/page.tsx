'use client'
import { useEffect, useState } from "react";
import { IProduct, IVariant } from "@/lib/cautrucdata";

import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
export default function Product() {
    const [products, setproducts] = useState<IProduct[]>([]);
    const [page, setpage] = useState(1);
    const [pagination, setPagination] = useState<{ currentPage: number, totalPages: number }>({ currentPage: 1, totalPages: 1 })

    useEffect(() => {
        fetchData()
    }, [page])



    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/products?page=${page}&limit=10`, { credentials: "include" });
            const json = await res.json();
            // Sau khi fetch data từ API
            const products = json?.data.map((p: IProduct) => ({
                ...p,
                category_name: p?.Categories?.[0]?.name,
                price: p.ProductVariants?.[0]?.price,
                image: p.ProductVariants?.[0]?.ProductImages?.[0]?.image,
            }));

            setproducts(products || []);
            setPagination(json.pagination || { totalItems: 1, currentPage: 1 })
        } catch (error) {
            console.log(error)
        }

    };

    const handleSoftDelete = async (id: any) => {
        if (confirm('bạn có mún xóa sản phẩm này không')) {
            const softDelete = await fetch(`http://localhost:3000/api/products/${id}/soft-delete`, {
                method: "PUT",
                credentials: "include",
            });
            if (softDelete.ok) {
                alert("Đã xóa thành công!");
                await fetchData();
            } else {
                alert("Xóa thất bại!");
            }
        }

    }

    console.log(page);
    return (
        <div className="main p-6">
            {/* <!-- Filter Section --> */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Ô tìm kiếm */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm"
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Bộ lọc trạng thái */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            id="statusFilter"
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="completed">đang hot</option>
                            <option value="processing">nhiều lượt xem</option>
                            <option value="shipping">Hàng mới</option>
                            <option value="cancelled">hàng cũ</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>


                    <div className="flex space-x-1 items-center justify-end">
                        <a href="/admin/products/softDelete" className="text-center rounded-sm px-4 py-2 bg-blue-600 text-white">sản phẩm đã bị xóa</a>
                        <a href="/admin/products/addProduct" className="text-center rounded-sm px-4 py-2 bg-blue-600 text-white">thêm sản phẩm</a>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="border-b border-gray-200">
                    <h2 className="text-m font-semibold text-gray-800">Danh sách sản phẩm</h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Sản phẩm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mã SP
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Giá bán
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tồn kho
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {products.map((p) => (
                            <tr
                                key={p.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* SẢN PHẨM */}
                                <td className="px-6 py-4">
                                    <div className="table__name flex items-center">
                                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0">
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="ml-3">
                                            <div className="line-clamp font-medium text-gray-900">{p.name}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* MÃ SP */}
                                <td className="px-6 py-4 text-gray-700 text-sm">{`SP00${p.id}`}</td>

                                {/* DANH MỤC */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {p.category_name || "—"}
                                </td>

                                {/* GIÁ BÁN */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {Number(p.price)?.toLocaleString("vi-VN")} VND
                                </td>

                                {/* TỒN KHO */}
                                <td className="relative group cursor-pointer">
                                    {/* Tính tổng tồn kho */}
                                    <span className="text-center block">
                                        {p.ProductVariants?.reduce(
                                            (sum, v) => sum + Number(v.available_quantity || 0),
                                            0
                                        )}
                                    </span>

                                    {/* Popup hiển thị chi tiết */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-white border rounded-lg shadow-xl p-3 z-50 w-[400px]">
                                        <p className="font-semibold text-sm mb-2 text-center">Chi tiết biến thể</p>
                                        <table className="w-full text-sm border">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border px-1">Size</th>
                                                    <th className="border px-1">Style</th>
                                                    <th className="border px-1">Unit</th>
                                                    <th className="border px-1">Flavor</th>
                                                    <th className="border px-1">Giá</th>
                                                    <th className="border px-1">SL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {p.ProductVariants?.map((v, i) => (
                                                    <tr key={i}>
                                                        <td className="border px-1">{v.size || '-'}</td>
                                                        <td className="border px-1">{v.style || '-'}</td>
                                                        <td className="border px-1">{v.unit || '-'}</td>
                                                        <td className="border px-1">{v.flavor || '-'}</td>
                                                        <td className="border px-1 text-right">{Number(v.price).toLocaleString()}đ</td>
                                                        <td className="border px-1 text-right">{v.available_quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>


                                {/* TRẠNG THÁI */}
                                <td className="px-6 py-4">
                                    {p.is_active ? (
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                            Đang bán
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                                            Hết hàng
                                        </span>
                                    )}
                                </td>

                                {/* THAO TÁC */}
                                <td className="px-6 py-4 text-sm">
                                    <a
                                        href={`/admin/products/${p.id}`}
                                        className="text-blue-600 hover:text-blue-800 px-2"
                                    >
                                        Sửa
                                    </a>
                                    <button
                                        className="text-red-600 hover:text-red-800 px-2"
                                        onClick={() => handleSoftDelete(p.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-[10px]">
                <button
                    disabled={page === 1}
                    onClick={() => setpage(page - 1)}
                    className="border px-3 py-1 rounded disabled:opacity-50"
                >trước</button>
                <span>trang {page}</span>
                <button
                    disabled={page >= pagination.totalPages}
                    onClick={() => setpage(page + 1)}
                    className="border px-3 py-1 rounded disabled:opacity-50"
                >sau</button>
            </div>
        </div>
    );
}
