'use client'

import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, X, Save } from 'lucide-react';

export default function BannerDetail() {
    const [banner, setBanner] = useState({
        id: 1,
        title: 'Flash Sale Cuối Năm - Giảm đến 50%',
        slug: 'flash-sale-cuoi-nam-giam-den-50',
        description: 'Chương trình khuyến mãi lớn nhất năm với ưu đãi lên đến 50% cho tất cả sản phẩm.',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
        mobileImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=800&fit=crop',
        position: 'homepage_hero',
        link: 'https://example.com/flash-sale',
        status: 'active',
        startDate: '2024-12-01',
        endDate: '2024-12-31',
    });

    const desktopFileInputRef = useRef(null);
    const mobileFileInputRef = useRef(null);

    const statusConfig = {
        active: { label: 'Đang hiển thị', color: 'bg-green-100 text-green-800' },
        inactive: { label: 'Đã tắt', color: 'bg-gray-100 text-gray-800' },
        scheduled: { label: 'Đã lên lịch', color: 'bg-blue-100 text-blue-800' },
    };

    const positionConfig = {
        homepage_hero: 'Trang chủ - Hero',
        homepage_bottom: 'Trang chủ - Dưới',
        sidebar: 'Thanh bên',
        popup: 'Popup'
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanner(prev => ({
                    ...prev,
                    [type === 'desktop' ? 'image' : 'mobileImage']: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (type) => {
        setBanner(prev => ({
            ...prev,
            [type === 'desktop' ? 'image' : 'mobileImage']: ''
        }));
    };

    const handleChange = (field, value) => {
        setBanner(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving banner:', banner);
        // Call API here
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại
                </button>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Chi tiết banner</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Save className="w-4 h-4" />
                            Lưu thay đổi
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Xóa
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left - Images */}
                <div className="space-y-6">
                    {/* Desktop Image */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Hình ảnh Desktop</h3>
                        <div className="space-y-4">
                            {banner.image ? (
                                <div className="relative">
                                    <img
                                        src={banner.image}
                                        alt="Desktop banner"
                                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage('desktop')}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
                                    <p className="text-gray-400">Chưa có hình ảnh</p>
                                </div>
                            )}
                            <input
                                ref={desktopFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'desktop')}
                                className="hidden"
                            />
                            <button
                                onClick={() => desktopFileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                            >
                                <Upload className="w-4 h-4" />
                                {banner.image ? 'Thay đổi hình ảnh' : 'Upload hình ảnh'}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Image */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Hình ảnh Mobile</h3>
                        <div className="space-y-4">
                            {banner.mobileImage ? (
                                <div className="relative max-w-xs mx-auto">
                                    <img
                                        src={banner.mobileImage}
                                        alt="Mobile banner"
                                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage('mobile')}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 max-w-xs mx-auto flex items-center justify-center">
                                    <p className="text-gray-400">Chưa có hình ảnh</p>
                                </div>
                            )}
                            <input
                                ref={mobileFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'mobile')}
                                className="hidden"
                            />
                            <button
                                onClick={() => mobileFileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                            >
                                <Upload className="w-4 h-4" />
                                {banner.mobileImage ? 'Thay đổi hình ảnh' : 'Upload hình ảnh'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right - Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Thông tin banner</h3>
                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={banner.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    value={banner.slug}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả
                                </label>
                                <textarea
                                    value={banner.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                />
                            </div>

                            {/* Link */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={banner.link}
                                    onChange={(e) => handleChange('link', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* Position */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vị trí hiển thị
                                </label>
                                <select
                                    value={banner.position}
                                    onChange={(e) => handleChange('position', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    {Object.entries(positionConfig).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    value={banner.status}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    {Object.entries(statusConfig).map(([key, config]) => (
                                        <option key={key} value={key}>{config.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày bắt đầu
                                    </label>
                                    <input
                                        type="date"
                                        value={banner.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày kết thúc
                                    </label>
                                    <input
                                        type="date"
                                        value={banner.endDate}
                                        onChange={(e) => handleChange('endDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}