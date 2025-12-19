'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function BannerDetail() {

    const { id } = useParams();
    const [banner, setBanner] = useState({
        id: '',
        title: '',
        image: '',
        is_active: 1,
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        loadBanner();
    }, []);

    const loadBanner = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/banners/${id}`, { credentials: 'include' });
            const res = await response.json();

            if (response.ok) {
                setBanner({
                    id: res.data.id,
                    title: res.data.title,
                    image: res.data.image,
                    is_active: res.data.is_active,
                });
            }
        } catch (error) {
            setMessage('❌ Không thể tải banner: ' + error.message);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setBanner((prev) => ({ ...prev, image: "" }));
        setImageFile(null);
    };

    const handleChange = (field, value) => {
        setBanner(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!banner.title) {
            setMessage("❌ Vui lòng nhập tiêu đề!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("title", banner.title);
            formData.append("is_active", String(banner.is_active));
            if (imageFile) formData.append("image", imageFile);

            const response = await fetch(
                `http://localhost:3000/api/banners/${banner.id}`,
                {
                    method: "PUT",
                    body: formData,
                    credentials: 'include',
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ " + data.message);
                setImageFile(null);
                router.push('/admin/banner')
            } else {
                setMessage("❌ " + data.message);
            }
        } catch (error: any) {
            setMessage("❌ Có lỗi xảy ra: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa banner này?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/banners/${banner.id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Xóa banner thành công!');
                setTimeout(() => {
                    window.history.back();
                }, 1500);
            } else {
                setMessage('❌ ' + data.message);
            }
        } catch (error) {
            setMessage('❌ Có lỗi xảy ra: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(banner)

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại
                </button>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Chi tiết banner</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Lưu thay đổi
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg font-medium ${message.includes('✅')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left - Image */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold">Hình ảnh Banner</h3>

                    {banner.image || imageFile ? (
                        <div className="relative">
                            <img
                                src={imageFile ? URL.createObjectURL(imageFile) : banner.image}
                                alt="Banner"
                                className="w-full h-48 object-cover rounded-lg border"
                            />
                            {!loading && (
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            {imageFile && (
                                <p className="text-green-600 mt-1 text-sm">
                                    ✨ Ảnh mới: {imageFile.name}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400">
                            Chưa có hình ảnh
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 border text-blue-600 rounded hover:bg-blue-50 ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        <Upload className="w-4 h-4" />
                        {banner.image || imageFile ? "Thay đổi hình ảnh" : "Upload hình ảnh"}
                    </button>
                </div>

                {/* Right - Info */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Thông tin banner</h3>
                    <div className="space-y-4">
                        {/* ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ID
                            </label>
                            <input
                                type="text"
                                value={banner.id}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tiêu đề <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={banner.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Nhập tiêu đề banner..."
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái
                            </label>
                            <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={banner.is_active === 1}
                                    onChange={(e) => handleChange('is_active', e.target.checked ? 1 : 0)}
                                    disabled={loading}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                    Kích hoạt banner (hiển thị trên website)
                                </label>
                            </div>
                        </div>

                        {/* Created At & Updated At (Read-only) */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium">Ngày tạo:</span>{' '}
                                    {banner.createdAt ? new Date(banner.createdAt).toLocaleString('vi-VN') : '-'}
                                </p>
                                <p>
                                    <span className="font-medium">Cập nhật lần cuối:</span>{' '}
                                    {banner.updatedAt ? new Date(banner.updatedAt).toLocaleString('vi-VN') : '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}