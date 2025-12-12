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
        <div className="container mx-auto py-10 px-4">
            <div className="main-content text-center !my-[20px]">
                <h1 className="!text-[20px] !font-bold !mb-6 !border-b !pb-2">Sản phẩm yêu thích</h1>
            </div>

            <section className="product product-sales">
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
    );
}