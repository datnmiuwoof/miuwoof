"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, X, Upload, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AddCategoryPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent_id: '',
        is_active: true,
    });

    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [parent, setParent] = useState([]);

    useEffect(() => {
        parentcategory()
    }, [])

    const parentcategory = async () => {
        const data = await fetch(`http://localhost:3000/api/categorys`, { credentials: "include" });
        const res = await data.json();

        const categoryParent = res.data.filter((p: any) => p.parent_id === null)
        setParent(categoryParent)
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Xóa lỗi khi người dùng bắt đầu nhập
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };



    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên danh mục không được để trống';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Tên danh mục phải có ít nhất 2 ký tự';
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendFormData = {
        ...formData,
        parent_id: formData.parent_id === "" ? null : formData.parent_id
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form data:', formData);
            alert('Thêm danh mục thành công!');
        }
        const submitData = await fetch(`http://localhost:3000/api/categorys/create`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendFormData),
            credentials: "include",
        });

        if (submitData.ok) {
            alert("thêm danh mục thành công");
            setFormData({
                name: '',
                description: '',
                parent_id: '',
                is_active: true,
            })
            router.push("/admin/category")
        }
    };

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ bị mất.')) {
            setFormData({
                name: '',
                description: '',
                parent_id: '',
                is_active: true,
            });
            setErrors({});
        }
    };

    console.log(formData)

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                        onClick={() => { router.push('/admin/category') }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Quay lại danh sách</span>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Thêm danh mục mới</h1>
                    <p className="text-gray-600 mt-1">Điền thông tin để tạo danh mục sản phẩm mới</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">

                    {/* Tên danh mục */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tên danh mục <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nhập tên danh mục..."
                            className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Danh mục cha */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Danh mục cha
                        </label>

                        <select
                            name="parent_id"
                            value={formData.parent_id ?? ""}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer"
                        >
                            <option value="">Không có danh mục</option>
                            {parent.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <p className="mt-1 text-xs text-gray-500">
                            Chọn danh mục cha nếu đây là danh mục con. Để trống nếu là danh mục chính.
                        </p>
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Nhập mô tả cho danh mục..."
                            rows={4}
                            className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors`}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            {formData.description.length}/500 ký tự
                        </p>
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleInputChange}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <div>
                                <span className="text-sm font-semibold text-gray-700">Kích hoạt danh mục</span>
                                <p className="text-xs text-gray-500">Danh mục sẽ hiển thị công khai trên website</p>
                            </div>
                        </label>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Save className="w-4 h-4" />
                            Lưu danh mục
                        </button>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-semibold text-blue-900 mb-1">Lưu ý khi tạo danh mục</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Tên danh mục nên ngắn gọn, rõ ràng và dễ hiểu</li>
                                <li>• Nếu tạo danh mục con, hãy chọn đúng danh mục cha phù hợp</li>
                                <li>• Hình ảnh giúp người dùng dễ nhận diện danh mục hơn</li>
                                <li>• Chỉ kích hoạt khi đã sẵn sàng hiển thị trên website</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryPage;