'use client'

import React, { useState } from 'react';
import { Upload, X, Save } from 'lucide-react';

export default function AddBanner() {
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [message, setMessage] = useState('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!title || !imageFile) {
            setMessage('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('is_active', isActive ? '1' : '0');
        formData.append('image', imageFile);

        try {
            const res = await fetch('http://localhost:3000/api/banners/create', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setMessage('✅ Thêm banner thành công!');
            setTimeout(() => {
                setTitle('');
                setImageFile(null);
                setImagePreview('');
                setIsActive(true);
                setMessage('');
            }, 2000);
        } catch (err: any) {
            setMessage('❌ Có lỗi xảy ra: ' + err.message);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <h1 className="text-3xl font-bold text-indigo-900 mb-2">🎨 Thêm Banner Mới</h1>
                    <p className="text-gray-600">Tạo banner cho website của bạn</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Tiêu đề */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            📝 Tiêu đề Banner
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                            placeholder="Nhập tiêu đề banner..."
                        />
                    </div>

                    {/* Upload ảnh */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            🖼️ Hình ảnh Banner
                        </label>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors bg-gray-50">
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-80 mx-auto rounded-lg shadow-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview('');
                                            setImageFile(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Upload className="mx-auto mb-4 text-indigo-400" size={64} />
                                    <label className="cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
                                        Chọn Hình Ảnh
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-sm text-gray-500 mt-4">
                                        PNG, JPG, GIF (tối đa 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Trạng thái */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="w-6 h-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="is_active" className="text-base font-medium text-gray-700">
                                ✨ Kích hoạt banner ngay sau khi lưu
                            </label>
                        </div>
                    </div>

                    {/* Thông báo */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl text-center font-medium ${message.includes('✅')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {message}
                        </div>
                    )}

                    {/* Nút lưu */}
                    <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-2xl"
                    >
                        <Save size={24} />
                        Lưu Banner
                    </button>
                </div>
            </div>
        </div>
    );
}