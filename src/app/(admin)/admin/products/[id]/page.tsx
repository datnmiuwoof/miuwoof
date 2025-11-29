"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { X, Upload, Plus } from "lucide-react";

export default function UpdateProduct() {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: "",
        description: "",
        selectedCategories: [] as number[],
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [groupedCategories, setGroupedCategories] = useState<any>({});
    const [variants, setVariants] = useState<
        {
            id?: number | null;
            size: string;
            style: string;
            unit: string;
            flavor: string;
            price: number;
            available_quantity: number;
            images: File[];
            previews: string[];
            ProductImages: { id: number; image: string }[];
        }[]
    >([
        {
            id: null,
            size: "",
            style: "",
            unit: "",
            flavor: "",
            price: 0,
            available_quantity: 0,
            images: [],
            previews: [],
            ProductImages: [],
        },
    ]);

    // ✅ Lấy danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/categorys", { credentials: "include" });
                const data = await res.json();
                setCategories(data.data);
                // Group by parent_id
                const grouped: any = {};
                data.data.forEach((c: any) => {
                    if (c.parent_id) {
                        if (!grouped[c.parent_id]) grouped[c.parent_id] = [];
                        grouped[c.parent_id].push(c);
                    }
                });
                setGroupedCategories(grouped);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
    }, []);

    // ✅ Lấy sản phẩm để fill form
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/products/${id}`, { credentials: "include" });
                const data = await res.json();
                const p = data.data;

                setForm({
                    name: p.name,
                    description: p.description,
                    selectedCategories: p.ProductCategories?.map(
                        (c: any) => c.category_id
                    ) || [],
                });

                setVariants(
                    p.ProductVariants.map((v: any) => ({
                        id: v.id,
                        size: v.size,
                        style: v.style,
                        unit: v.unit,
                        flavor: v.flavor,
                        price: v.price,
                        available_quantity: v.available_quantity,
                        images: [],
                        previews: [],
                        ProductImages: v.ProductImages || [],
                    }))
                );
            } catch (err) {
                console.log(err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleCategory = (catId: number) => {
        const selected = [...form.selectedCategories];
        const index = selected.indexOf(catId);
        if (index >= 0) selected.splice(index, 1);
        else selected.push(catId);
        setForm({ ...form, selectedCategories: selected });
    };

    const getParentName = (id: number) => {
        const parent = categories.find((c) => c.id === id);
        return parent?.name || "Danh mục cha";
    };

    const handleVariantChange = (i: number, field: string, value: any) => {
        const newVariants = [...variants];
        newVariants[i] = { ...newVariants[i], [field]: value };
        setVariants(newVariants);
    };

    const handleFileChange = (i: number, files: FileList | null) => {
        if (!files) return;
        const newVariants = [...variants];
        newVariants[i].images = Array.from(files);
        newVariants[i].previews = Array.from(files).map((f) => URL.createObjectURL(f));
        setVariants(newVariants);
    };

    const removeImage = (vIndex: number, iIndex: number) => {
        const newVariants = [...variants];
        newVariants[vIndex].previews.splice(iIndex, 1);
        newVariants[vIndex].images.splice(iIndex, 1);
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                id: null,
                size: "",
                style: "",
                unit: "",
                flavor: "",
                price: 0,
                available_quantity: 0,
                images: [],
                previews: [],
                ProductImages: [],
            },
        ]);
    };

    const removeVariant = (i: number) => {
        setVariants(variants.filter((_, idx) => idx !== i));
    };

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("category_ids", JSON.stringify(form.selectedCategories));

        const toSendVariants = variants.map(({ previews, images, ...rest }) => ({
            ...rest,
            price: Number(rest.price) || 0,
            available_quantity: Number(rest.available_quantity) || 0,
        }));

        formData.append("variants", JSON.stringify(toSendVariants));
        const toKeep = variants.filter((v) => v.id).map((v) => v.id);
        formData.append("tokeepvariants", JSON.stringify(toKeep));

        variants.forEach((v, idx) => {
            v.images.forEach((file) => {
                formData.append(`variants_images_${idx}`, file);
            });
        });

        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                body: formData,
                credentials: "include",
            });
            if (res.ok) {
                alert("Cập nhật thành công!");
                window.location.href = "/admin/products";
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-lg p-5 mb-3">
                    <h1 className="text-sm font-bold text-gray-800 mb-2">
                        Cập nhật Sản Phẩm
                    </h1>
                    <p className="text-gray-600">Điền thông tin sản phẩm và biến thể của bạn</p>
                </div>

                <form onSubmit={handlerSubmit} className="space-y-6">
                    {/* Thông tin cơ bản */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            Thông tin cơ bản
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Tên sản phẩm *
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="VD: Áo hoodie cho chó size M"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Mô tả sản phẩm *
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Mô tả chi tiết về sản phẩm..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Chọn danh mục */}
                    <div className="bg-white rounded-2xl shadow-lg p-5">
                        <h2 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                            Chọn danh mục (có thể chọn nhiều)
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Đã chọn: {form.selectedCategories.length} danh mục
                        </p>

                        <div className="space-y-6">
                            {Object.entries(groupedCategories).map(([parentId, cats]) => (
                                <div key={parentId} className="border border-gray-200 rounded-xl p-3">
                                    <h3 className="font-bold text-lg text-gray-700 mb-4">
                                        {getParentName(parseInt(parentId))}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {cats.map((cat: any) => {
                                            const isSelected = form.selectedCategories.includes(cat.id);
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.id)}
                                                    className={`
                                                        px-3 py-2 rounded font-medium transition-all transform hover:scale-105
                                                        ${isSelected
                                                            ? "bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        }
                                                    `}
                                                >
                                                    {cat.name} {isSelected && "✓"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {form.selectedCategories.length === 0 && (
                            <p className="text-red-500 text-sm mt-4">
                                * Vui lòng chọn ít nhất 1 danh mục
                            </p>
                        )}
                    </div>

                    {/* Biến thể */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                Biến thể sản phẩm
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {variants.map((variant, index) => (
                                <div key={index} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="font-bold text-lg text-gray-700">
                                            Biến thể #{index + 1}
                                        </h3>
                                        {variants.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            >
                                                <X size={20} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Size
                                            </label>
                                            <input
                                                placeholder="S, M, L, XL"
                                                value={variant.size}
                                                onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Style
                                            </label>
                                            <input
                                                placeholder="Màu sắc, kiểu dáng"
                                                value={variant.style}
                                                onChange={(e) => handleVariantChange(index, "style", e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Đơn vị
                                            </label>
                                            <input
                                                placeholder="Cái, Hộp, Kg"
                                                value={variant.unit}
                                                onChange={(e) => handleVariantChange(index, "unit", e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Hương vị
                                            </label>
                                            <input
                                                placeholder="Gà, Bò, Cá"
                                                value={variant.flavor}
                                                onChange={(e) => handleVariantChange(index, "flavor", e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Giá (VNĐ) *
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="150000"
                                                value={variant.price}
                                                onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Số lượng *
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="100"
                                                value={variant.available_quantity}
                                                onChange={(e) => handleVariantChange(index, "available_quantity", e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Upload hình ảnh */}
                                    <div className="mt-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Hình ảnh biến thể
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center hover:border-blue-400 transition-all">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(index, e.target.files)}
                                                className="hidden"
                                                id={`file-input-${index}`}
                                            />
                                            <label htmlFor={`file-input-${index}`} className="cursor-pointer flex flex-col items-center gap-3">
                                                <div className="bg-blue-100 p-2 rounded-full">
                                                    <Upload className="text-blue-500 p-2" size={30} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-700">Nhấp để tải ảnh lên</p>
                                                    <p className="text-sm text-gray-500">PNG, JPG, WEBP (Có thể chọn nhiều ảnh)</p>
                                                </div>
                                            </label>
                                        </div>

                                        {variant.previews.length > 0 || variant.ProductImages.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-2">
                                                {variant.previews.map((p, idx) => (
                                                    <div key={idx} className="relative group">
                                                        <img src={p} alt={`preview-${idx}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />
                                                        <button type="button" onClick={() => removeImage(index, idx)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {variant.ProductImages.map((p) => (
                                                    <img key={p.id} src={p.image} alt={`variant-${index}`} className="w-32 h-32 object-cover rounded border" />
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button type="button" onClick={addVariant} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mt-3 px-5 py-2.5 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                            <Plus size={20} />
                            Thêm biến thể
                        </button>
                    </div>

                    {/* Submit button */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all">
                            Cập nhật Sản Phẩm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
