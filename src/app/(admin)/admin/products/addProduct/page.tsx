"use client";

import { ICategory, IVariant } from "@/lib/cautrucdata";
import { useState, useEffect } from "react";
import { X, Plus, Upload, ImageIcon } from "lucide-react";


export default function AddProduct() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [groupedCategories, setGroupedCategories] = useState<{ [key: string]: ICategory[] }>({});
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const [variants, setVariants] = useState<IVariant[]>([
        {
            size: "",
            style: "",
            unit: "",
            flavor: "",
            price: "",
            available_quantity: "",
            images: [] as File[],
            previews: [] as string[],
        },
    ]);

    // Load categories và nhóm theo parent
    useEffect(() => {
        fetch('http://localhost:3000/api/categorys', { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                const allCategories = data.data;
                setCategories(allCategories);

                // Lọc chỉ lấy category con (parent_id !== null)
                const childCategories = allCategories.filter((cat: ICategory) => cat.parent_id !== null);

                // Nhóm theo parent_id
                const grouped: { [key: string]: ICategory[] } = {};
                childCategories.forEach((cat: ICategory) => {
                    const parentId = cat.parent_id?.toString() || 'other';
                    if (!grouped[parentId]) {
                        grouped[parentId] = [];
                    }
                    grouped[parentId].push(cat);
                });

                setGroupedCategories(grouped);
            })
            .catch(error => console.error('Error loading categories:', error));
    }, []);

    // Lấy tên parent category
    const getParentName = (parentId: number) => {
        const parent = categories.find(cat => cat.id === parentId);
        return parent?.name || 'Khác';
    };

    // Toggle chọn/bỏ chọn category
    const toggleCategory = (categoryId: number) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (index: number, files: FileList | null) => {
        if (files) {
            const upload = [...variants];
            const upfile = Array.from(files);
            upload[index].images = upfile;
            upload[index].previews = upfile.map((f) => URL.createObjectURL(f));
            setVariants(upload);
        }
    };

    const handleVariantChange = (index: number, field: string, value: string) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                size: "",
                style: "",
                unit: "",
                flavor: "",
                price: "",
                available_quantity: "",
                images: [] as File[],
                previews: [] as string[],
            }
        ]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const removeImage = (variantIndex: number, imageIndex: number) => {
        const updated = [...variants];
        updated[variantIndex].images = updated[variantIndex].images.filter((_, i) => i !== imageIndex);
        updated[variantIndex].previews = updated[variantIndex].previews.filter((_, i) => i !== imageIndex);
        setVariants(updated);
    };

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCategories.length === 0) {
            alert(" Vui lòng chọn ít nhất 1 danh mục!");
            return;
        }

        const formdata = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                formdata.append(key, value);
            }
        });


        formdata.append("category_ids", JSON.stringify(selectedCategories));

        const variantToSent = variants.map(v => {
            const { previews, ...rest } = v;
            return rest;
        });

        formdata.append("variants", JSON.stringify(variantToSent));

        variants.forEach((v, i) => {
            if (v.images && v.images.length > 0) {
                v.images.forEach(file => {
                    formdata.append(`variants_images_${i}`, file);
                });
            }
        });

        try {
            const res = await fetch("http://localhost:3000/api/products/create", {
                method: "POST",
                body: formdata,
                credentials: "include"
            });

            let data;
            try {
                data = await res.json();
            } catch (jsonError) {
                const text = await res.text();
                console.error("Không parse được JSON:", text);
                throw jsonError;
            }

            if (res.ok) {
                alert("Thêm sản phẩm thành công!");
                setForm({ name: "", description: "" });
                setSelectedCategories([]);
                setVariants([{
                    size: "",
                    style: "",
                    unit: "",
                    flavor: "",
                    price: "",
                    available_quantity: "",
                    images: [] as File[],
                    previews: [] as string[],
                }]);
            } else {
                console.error("Backend trả lỗi:", data);
                alert("Lỗi khi thêm sản phẩm!");
            }
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
            alert("Gửi dữ liệu thất bại!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-3xl shadow-lg p-5 mb-3">
                    <h1 className="text-sm font-bold text-gray-800 mb-2">
                        Thêm Sản Phẩm Mới
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
                            Đã chọn: {selectedCategories.length} danh mục
                        </p>

                        <div className="space-y-6">
                            {Object.entries(groupedCategories).map(([parentId, cats]) => (
                                <div key={parentId} className="border border-gray-200 rounded-xl p-3">
                                    <h3 className="font-bold text-lg text-gray-700 mb-4">
                                        {getParentName(parseInt(parentId))}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {cats.map(cat => {
                                            const isSelected = selectedCategories.includes(cat.id);
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.id)}
                                                    className={`
                                                        px-3 py-2 rounded font-medium transition-all transform hover:scale-105
                                                        ${isSelected
                                                            ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }
                                                    `}
                                                >
                                                    {cat.name}
                                                    {isSelected && ' ✓'}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedCategories.length === 0 && (
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
                                            <label
                                                htmlFor={`file-input-${index}`}
                                                className="cursor-pointer flex flex-col items-center gap-3"
                                            >
                                                <div className="bg-blue-100 p-2 rounded-full">
                                                    <Upload className="text-blue-500 p-2" size={30} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-700">
                                                        Nhấp để tải ảnh lên
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        PNG, JPG, WEBP (Có thể chọn nhiều ảnh)
                                                    </p>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Preview ảnh */}
                                        {variant.previews && variant.previews.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-2">
                                                {variant.previews.map((preview, imgIndex) => (
                                                    <div key={imgIndex} className="relative group">
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${imgIndex + 1}`}
                                                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index, imgIndex)}
                                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mt-3 px-5 py-2.5 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
                        >
                            <Plus size={20} />
                            Thêm biến thể
                        </button>
                    </div>

                    {/* Submit button */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r bg-blue-500 text-white py-2 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all"
                        >
                            Thêm Sản Phẩm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}