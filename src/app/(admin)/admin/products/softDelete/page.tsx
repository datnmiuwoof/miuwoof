"use client";
import { useEffect, useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

export default function DeletedProducts() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    useEffect(() => {
        fetchDeleted();
    }, [page]);

    const fetchDeleted = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/products/deleted?page=${page}&limit=10`);
            const json = await res.json();

            const mapped = json?.data?.map((p) => ({
                ...p,
                category_name: p?.Categories?.[0]?.name,
                price: p?.ProductVariants?.[0]?.price,
                image: p?.ProductVariants?.[0]?.ProductImages?.[0]?.image,
            }));

            setProducts(mapped || []);
            setPagination(json.pagination || { currentPage: 1, totalPages: 1 });
        } catch (err) {
            console.error(err);
            setProducts([]);
        }
    };

    const handleRestore = async (id) => {
        if (!confirm("Khôi phục sản phẩm này?")) return;

        const res = await fetch(`http://localhost:3000/api/products/${id}/restore`, {
            method: "PATCH",
        });

        if (res.ok) {
            alert("Khôi phục thành công!");
            fetchDeleted();
        } else {
            alert("Khôi phục thất bại!");
        }
    };

    return (
        <div className="main p-6">
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm đã xóa"
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả danh mục</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-end">
                        <a href="/admin/products" className="text-center rounded-sm px-4 py-2 bg-gray-600 text-white">
                            Quay lại danh sách sản phẩm
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-200">
                <h2 className="text-m font-semibold text-gray-800">Sản phẩm đã xóa mềm</h2>
            </div>

            {products.length === 0 ? (
                <p className="text-center py-10 text-gray-500 text-lg">Mục này trống</p>
            ) : (
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm mt-2">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mã SP</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Giá bán</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày xóa</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="font-medium text-gray-900">{p.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-gray-700 text-sm">{`SP00${p.id}`}</td>

                                <td className="px-6 py-4 text-gray-700 text-sm">{p.category_name || "—"}</td>

                                <td className="px-6 py-4 text-gray-700 text-sm">{Number(p.price)?.toLocaleString("vi-VN")} VND</td>

                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {new Date(p.updatedAt).toLocaleDateString("vi-VN")}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    <button
                                        onClick={() => handleRestore(p.id)}
                                        className="text-blue-600 hover:text-blue-800 px-2"
                                    >
                                        Khôi phục
                                    </button>
                                    <button
                                        // onClick={() => handleDelete(p.id)}
                                        className="text-blue-600 hover:text-blue-800 px-2"
                                    >
                                        xóa vĩnh viễn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="p-[10px]">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="border px-3 py-1 rounded disabled:opacity-50"
                >Trước</button>
                <span className="mx-2">Trang {page}</span>
                <button
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="border px-3 py-1 rounded disabled:opacity-50"
                >Sau</button>
            </div>
        </div>
    );
}
