"use client";

import { useState, useEffect } from "react";
import { IProduct, IVariant } from "@/lib/cautrucdata";

interface Props {
    product: IProduct;
    onSelectVariant: (index: number) => void;
}

export default function ProductVariant({ product, onSelectVariant }: Props) {
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);


    const getOptions = (type: keyof IVariant) => {
        return Array.from(
            new Set(
                product.ProductVariants
                    .map((v) => v[type])
                    .filter((v) => v !== "" && v !== null && v !== undefined)
            )
        ) as string[];
    };

    useEffect(() => {
        const variants = product.ProductVariants;

        const foundIndex = variants.findIndex((v) =>
            (selectedStyle ? v.style === selectedStyle : true) &&
            (selectedSize ? v.size === selectedSize : true) &&
            (selectedFlavor ? v.flavor === selectedFlavor : true) &&
            (selectedUnit ? v.unit === selectedUnit : true)
        );

        if (foundIndex !== -1) {
            onSelectVariant(foundIndex);
        }

    }, [selectedStyle, selectedSize, selectedFlavor, selectedUnit]);

    return (
        <form className="mt-4 !mb-[20px] !border-b-1 !border-[#ccc]">

            {/* STYLE */}
            {getOptions("style").length > 0 && (
                <div className="">
                    <p className="font-medium !text-[14px] mb-3">Kiểu dáng:</p>
                    <div className="flex gap-2 !pb-[20px]">
                        {getOptions("style").map((style, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedStyle(style)}
                                className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded 
                                    ${selectedStyle === style ? "border-black bg-gray-100" : "bg-gray-100"}`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* SIZE */}
            {getOptions("size").length > 0 && (
                <div className="">
                    <p className="font-medium !text-[14px] mb-3">Kích thước:</p>
                    <div className="flex gap-2 !pb-[20px]">
                        {getOptions("size").map((size, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded 
                                    ${selectedSize === size ? "border-black bg-gray-100" : "bg-gray-100"}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* UNIT */}
            {getOptions("unit").length > 0 && (
                <div className="">
                    <p className="font-medium !text-[14px] mb-3">Khối lượng:</p>
                    <div className="flex gap-2 !pb-[20px]">
                        {getOptions("unit").map((unit, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedUnit(unit)}
                                className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded 
                                   ${selectedUnit === unit ? "border-black bg-gray-100" : "bg-gray-100"}`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* FLAVOR */}
            {getOptions("flavor").length > 0 && (
                <div className="">
                    <p className="font-medium !text-[14px] mb-3">hương vị:</p>
                    <div className="flex gap-2 !pb-[20px]">
                        {getOptions("flavor").map((flavor, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedFlavor(flavor)}
                                className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded 
                                    ${selectedFlavor === flavor ? "border-black bg-gray-100" : "bg-gray-100"}`}
                            >
                                {flavor}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </form>
    );
}
