"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import ProductCard from "@/components/product/ProductCard"


export default function RelatedProducts({ categoryId, productId }: any) {
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchData()
    }, [categoryId, productId]);

    const fetchData = async () => {
        try {
            const result = await fetch(`http://localhost:3000/product/related/${productId}/${categoryId}`, { credentials: "include" })

            const res = await result.json();
            setItems(res)
            console.log("long ben layout", res)
        } catch (error) {
            console.log(error)
        }
    }


    const itemsPerPage = 4;
    const maxIndex = Math.max(0, items.length - itemsPerPage);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const visibleProducts = items.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className="w-full bg-white py-8">
            <div className="main-content mx-auto">
                {/* Carousel Container */}
                <div className="relative px-4">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center transition-all ${currentIndex === 0
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:border-blue-500 hover:text-blue-500"
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Overflow container */}

                    <div className="w-full mx-auto !my-6 text-center">
                        <h2 className="!text-[30px] !font-bold">sản phẩm liên quan</h2>
                    </div>

                    <div className="overflow-hidden">
                        {/* Products Flex Container */}
                        <div
                            className="flex gap-4 transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(calc(-${currentIndex * 100}% / 4 - ${currentIndex * 16}px))`
                            }}
                        >
                            {items.map((p) => (
                                <div key={p.id} style={{ minWidth: 'calc(25% - 12px)' }}>
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center transition-all ${currentIndex >= maxIndex
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:border-blue-500 hover:text-blue-500"
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
