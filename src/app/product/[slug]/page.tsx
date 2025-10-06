"use client"
import '@/app/styles/reset.css';
import '@/app/styles/detailproduct.css';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IProduct } from "@/components/ui/cautrucdata";

export default function productDetail() {
    const params = useParams();
    const { slug } = params;

    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => {
                const slugProduct = data.products.find((p: any) => p.slug === slug);
                setProduct(slugProduct);
            })
    }, [slug])

    if (!product) {
        return <p className="text-center py-10">Đang tải sản phẩm...</p>;
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
            </nav>
            <div className="p-10 bg-gray-50 min-h-screen">
                <div className="product-detail max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={product.image}
                            alt={product.alt}
                            className="w-full h-auto rounded-xl object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
                        <p className="text-gray-600 mb-3">Danh mục: {product.category_name}</p>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-red-600 text-2xl font-bold">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-gray-400 line-through">{product.originalPrice}</span>
                            )}
                            {product.sale && (
                                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-md">
                                    {product.sale}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            {product.is_new && (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                    Mới
                                </span>
                            )}
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${product.soldOut
                                    ? "bg-gray-200 text-gray-600"
                                    : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {product.soldOut ? "Tạm hết hàng" : "Còn hàng"}
                            </span>
                        </div>

                        <div className="mt-6">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}