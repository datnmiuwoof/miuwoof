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
        <form className="mt-4">

            {/* STYLE */}
            {getOptions("style").length > 0 && (
                <div className="mb-4">
                    <p className="font-medium">Style:</p>
                    <div className="flex gap-2">
                        {getOptions("style").map((style, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedStyle(style)}
                                className={`px-4 py-2 border rounded 
                                    ${selectedStyle === style ? "bg-black text-white" : "bg-gray-100"}`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* SIZE */}
            {getOptions("size").length > 0 && (
                <div className="mb-4">
                    <p className="font-medium">Size:</p>
                    <div className="flex gap-2">
                        {getOptions("size").map((size, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded 
                                    ${selectedSize === size ? "bg-black text-white" : "bg-gray-100"}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* UNIT */}
            {getOptions("unit").length > 0 && (
                <div className="mb-4">
                    <p className="font-medium">Unit:</p>
                    <div className="flex gap-2">
                        {getOptions("unit").map((unit, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedUnit(unit)}
                                className={`px-4 py-2 border rounded 
                                    ${selectedUnit === unit ? "bg-black text-white" : "bg-gray-100"}`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* FLAVOR */}
            {getOptions("flavor").length > 0 && (
                <div className="mb-4">
                    <p className="font-medium">Flavor:</p>
                    <div className="flex gap-2">
                        {getOptions("flavor").map((flavor, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedFlavor(flavor)}
                                className={`px-4 py-2 border rounded 
                                    ${selectedFlavor === flavor ? "bg-black text-white" : "bg-gray-100"}`}
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
