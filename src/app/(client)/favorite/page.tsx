"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { setFavorites } from "@/lib/favoriteSlice";
import { IProduct } from "@/lib/cautrucdata";

export default function Favorite() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { userId, loading } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) return;

        const fetchFavorites = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/favorites", {
                    credentials: "include"
                });

                if (!res.ok) {
                    throw new Error("Không thể tải danh sách yêu thích");
                }

                const result = await res.json();



                const listProducts = result.data.map((item: any) => item.Product);
                setProducts(listProducts);
                const listIds = listProducts.map((p: any) => p.id);
                dispatch(setFavorites(listIds));

            } catch (error) {
                console.error(error);
            }
        };

        fetchFavorites();
    }, [userId, dispatch]);

    if (loading) return <div className="p-10 text-center">Đang tải...</div>;
    if (!userId) return <div className="p-10 text-center">Vui lòng đăng nhập để xem yêu thích</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br to-rose-50 py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header với hiệu ứng */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <svg className="w-8 h-8 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                                Sản phẩm yêu thích
                            </h1>
                            <svg className="w-8 h-8 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
                    </div>

                    {products.length > 0 && (
                        <p className="text-gray-600 mt-4 text-lg">
                            Bạn đang có <span className="font-bold text-red-500">{products.length}</span> sản phẩm yêu thích
                        </p>
                    )}
                </div>

                <section className="product product-sales !mt-[50px]">
                    <div className="main-content">
                        {products.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                                Bạn chưa yêu thích sản phẩm nào. <br />
                                Hãy dạo một vòng và thả tim nhé!
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {products.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* CSS cho animation */}
            <style jsx>{`
        @keyframes fade-in {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in {
            animation: fade-in 0.6s ease-out;
        }
    `}</style>
        </div>
    );
}