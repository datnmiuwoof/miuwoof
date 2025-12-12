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

    // Thêm useEffect này vào component (đặt sau các useState)
    useEffect(() => {
        // Auto select first available option for each attribute
        const styleOptions = getOptions("style");
        const sizeOptions = getOptions("size");
        const unitOptions = getOptions("unit");
        const flavorOptions = getOptions("flavor");

        // Select first available style
        if (styleOptions.length > 0 && !selectedStyle) {
            setSelectedStyle(styleOptions[0]);
        }

        // Select first available size
        if (sizeOptions.length > 0 && !selectedSize) {
            setSelectedSize(sizeOptions[0]);
        }

        // Select first available unit
        if (unitOptions.length > 0 && !selectedUnit) {
            setSelectedUnit(unitOptions[0]);
        }

        // Select first available flavor
        if (flavorOptions.length > 0 && !selectedFlavor) {
            setSelectedFlavor(flavorOptions[0]);
        }
    }, [product]); // Chạy lại khi product thay đổi

    return (
        <form className="!mt-4 !mb-[20px] !border-b !border-[#ccc] !pb-4">

            {/* STYLE */}
            {getOptions("style").length > 0 && (
                <div className="!mb-5">
                    <p className="!font-medium !text-[14px] !mb-3">Kiểu dáng:</p>
                    <div className="!flex !flex-wrap !gap-2">
                        {getOptions("style").map((style, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedStyle(style)}
                                className={`!px-[10px] !py-[8px] !inline-block !text-[14px] !border !rounded !transition-all !duration-200
                            ${selectedStyle === style
                                        ? "!border-black !bg-black !text-white"
                                        : "!border-gray-300 !bg-white !text-gray-700 hover:!border-gray-400"}`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* SIZE */}
            {getOptions("size").length > 0 && (
                <div className="!mb-5">
                    <p className="!font-medium !text-[14px] !mb-3">Kích thước:</p>
                    <div className="!flex !flex-wrap !gap-2">
                        {getOptions("size").map((size, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`!px-[10px] !py-[8px] !inline-block !text-[14px] !border !rounded !transition-all !duration-200
                            ${selectedSize === size
                                        ? "!border-black !bg-black !text-white"
                                        : "!border-gray-300 !bg-white !text-gray-700 hover:!border-gray-400"}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* UNIT */}
            {getOptions("unit").length > 0 && (
                <div className="!mb-5">
                    <p className="!font-medium !text-[14px] !mb-3">Khối lượng:</p>
                    <div className="!flex !flex-wrap !gap-2">
                        {getOptions("unit").map((unit, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedUnit(unit)}
                                className={`!px-[10px] !py-[8px] !inline-block !text-[14px] !border !rounded !transition-all !duration-200
                            ${selectedUnit === unit
                                        ? "!border-black !bg-black !text-white"
                                        : "!border-gray-300 !bg-white !text-gray-700 hover:!border-gray-400"}`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* FLAVOR */}
            {getOptions("flavor").length > 0 && (
                <div className="!mb-5">
                    <p className="!font-medium !text-[14px] !mb-3">Hương vị:</p>
                    <div className="!flex !flex-wrap !gap-2">
                        {getOptions("flavor").map((flavor, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedFlavor(flavor)}
                                className={`!px-[10px] !py-[8px] !inline-block !text-[14px] !border !rounded !transition-all !duration-200
                            ${selectedFlavor === flavor
                                        ? "!border-black !bg-black !text-white"
                                        : "!border-gray-300 !bg-white !text-gray-700 hover:!border-gray-400"}`}
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

//   <form className="mt-4 !mb-[20px] !border-b-1 !border-[#ccc]">

//             {/* STYLE */}
//             {getOptions("style").length > 0 && (
//                 <div className="">
//                     <p className="font-medium !text-[14px] mb-3">Kiểu dáng:</p>
//                     <div className="flex gap-2 !pb-[20px]">
//                         {getOptions("style").map((style, i) => (
//                             <button
//                                 key={i}
//                                 type="button"
//                                 onClick={() => setSelectedStyle(style)}
//                                 className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded
//                                     ${selectedStyle === style ? "border-black bg-gray-100" : "bg-gray-100"}`}
//                             >
//                                 {style}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* SIZE */}
//             {getOptions("size").length > 0 && (
//                 <div className="">
//                     <p className="font-medium !text-[14px] mb-3">Kích thước:</p>
//                     <div className="flex gap-2 !pb-[20px]">
//                         {getOptions("size").map((size, i) => (
//                             <button
//                                 key={i}
//                                 type="button"
//                                 onClick={() => setSelectedSize(size)}
//                                 className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded
//                                     ${selectedSize === size ? "border-black bg-gray-100" : "bg-gray-100"}`}
//                             >
//                                 {size}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* UNIT */}
//             {getOptions("unit").length > 0 && (
//                 <div className="">
//                     <p className="font-medium !text-[14px] mb-3">Khối lượng:</p>
//                     <div className="flex gap-2 !pb-[20px]">
//                         {getOptions("unit").map((unit, i) => (
//                             <button
//                                 key={i}
//                                 type="button"
//                                 onClick={() => setSelectedUnit(unit)}
//                                 className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded
//                                    ${selectedUnit === unit ? "border-black bg-gray-100" : "bg-gray-100"}`}
//                             >
//                                 {unit}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* FLAVOR */}
//             {getOptions("flavor").length > 0 && (
//                 <div className="">
//                     <p className="font-medium !text-[14px] mb-3">hương vị:</p>
//                     <div className="flex gap-2 !pb-[20px]">
//                         {getOptions("flavor").map((flavor, i) => (
//                             <button
//                                 key={i}
//                                 type="button"
//                                 onClick={() => setSelectedFlavor(flavor)}
//                                 className={`px-[10px] font-extralight py-[8px] inline-block !text-[14px] border rounded
//                                     ${selectedFlavor === flavor ? "border-black bg-gray-100" : "bg-gray-100"}`}
//                             >
//                                 {flavor}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//         </form>