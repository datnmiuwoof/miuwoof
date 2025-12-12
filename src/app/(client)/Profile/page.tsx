"use client";

import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, Heart } from 'lucide-react';

export default function Profile() {
    const [profileData, setProfileData] = useState({
        fullName: 'Huỳnh Vy',
        gender: 'female',
        address: '',
        country: 'Vietnam',
        province: '',
        email: 'huynhngocthuyvy1205@gmail.com',
        phone: '',
        birthDate: '2005-04-08'
    });

    const [activeMenu, setActiveMenu] = useState('profile');

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = () => {
        console.log('Profile Data:', profileData);
    };

    const getInitials = (name) => {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return parts[0][0] + parts[parts.length - 1][0];
        }
        return name.substring(0, 2);
    };

    return (
        <div className="!min-h-screen !bg-gray-50 !p-6">
            <div className="main-content !mx-auto">
                <div className="!grid !grid-cols-12 !gap-6">
                    {/* Sidebar */}
                    <div className="!col-span-3">
                        <div className="!bg-white !rounded-2xl !shadow-sm !p-6">
                            {/* User Info */}
                            <div className="!flex !items-center !gap-4 !mb-8">
                                <div className="!w-16 !h-16 !rounded-full !bg-pink-100 !flex !items-center !justify-center">
                                    <span className="!text-pink-600 !text-xl !font-bold">
                                        {getInitials(profileData.fullName).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="!font-semibold !text-gray-900 !text-lg">
                                        {profileData.fullName}
                                    </h3>
                                    <p className="!text-gray-500 !text-sm">
                                        {profileData.email}
                                    </p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <nav className="!space-y-2 !mb-8">
                                <button
                                    onClick={() => setActiveMenu('profile')}
                                    className={`!w-full !flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !font-medium !transition-all !border-0 ${activeMenu === 'profile'
                                        ? '!bg-red-500 !text-white !shadow-md'
                                        : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
                                        }`}
                                >
                                    <User className="!w-5 !h-5" />
                                    <span>Thông tin tài khoản</span>
                                </button>

                                <button
                                    onClick={() => setActiveMenu('orders')}
                                    className={`!w-full !flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !font-medium !transition-all !border-0 ${activeMenu === 'orders'
                                        ? '!bg-red-500 !text-white !shadow-md'
                                        : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
                                        }`}
                                >
                                    <Package className="!w-5 !h-5" />
                                    <span>Đơn hàng của bạn</span>
                                </button>

                                <button
                                    onClick={() => setActiveMenu('address')}
                                    className={`!w-full !flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !font-medium !transition-all !border-0 ${activeMenu === 'address'
                                        ? '!bg-red-500 !text-white !shadow-md'
                                        : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
                                        }`}
                                >
                                    <MapPin className="!w-5 !h-5" />
                                    <span>Địa chỉ giao hàng</span>
                                </button>

                                <button
                                    onClick={() => setActiveMenu('logout')}
                                    className={`!w-full !flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !font-medium !transition-all !border-0 ${activeMenu === 'logout'
                                        ? '!bg-red-500 !text-white !shadow-md'
                                        : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
                                        }`}
                                >
                                    <LogOut className="!w-5 !h-5" />
                                    <span>Đăng xuất</span>
                                </button>
                            </nav>

                            {/* Bottom Section */}
                            <div className="!pt-6 !border-t !border-gray-200">
                                <button
                                    onClick={() => setActiveMenu('favorites')}
                                    className={`!w-full !flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !font-medium !transition-all !border-0 ${activeMenu === 'favorites'
                                        ? '!bg-red-500 !text-white !shadow-md'
                                        : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
                                        }`}
                                >
                                    <Heart className="!w-5 !h-5" />
                                    <span>Sản phẩm yêu thích</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="!col-span-9">
                        <div className="!bg-white !rounded-2xl !shadow-sm !p-8">
                            <h1 className="!text-3xl !font-bold !text-gray-900 !mb-8">
                                Thông tin tài khoản
                            </h1>

                            <div className="!space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className="!w-full !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-3">
                                        Giới tính
                                    </label>
                                    <div className="!flex !gap-8">
                                        <label className="!flex !items-center !gap-2 !cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={profileData.gender === 'male'}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className="!w-5 !h-5 !text-red-500 !border-gray-300 focus:!ring-red-500"
                                            />
                                            <span className="!text-gray-700">Nam</span>
                                        </label>
                                        <label className="!flex !items-center !gap-2 !cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={profileData.gender === 'female'}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className="!w-5 !h-5 !text-red-500 !border-gray-300 focus:!ring-red-500"
                                            />
                                            <span className="!text-gray-700">Nữ</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        placeholder="Chưa cập nhật"
                                        className="!w-full !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent placeholder:!text-gray-400"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Quốc gia
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="!w-full !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent"
                                    />
                                </div>

                                {/* Province */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Tỉnh thành
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.province}
                                        onChange={(e) => handleInputChange('province', e.target.value)}
                                        placeholder="Chưa cập nhật"
                                        className="!w-full !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent placeholder:!text-gray-400"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        readOnly
                                        className="!w-full !px-4 !py-3 !bg-gray-100 !border !border-gray-200 !rounded-xl !text-gray-600 !cursor-not-allowed"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="!w-full !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent"
                                    />
                                </div>

                                {/* Birth Date */}
                                <div>
                                    <label className="!block !text-gray-700 !font-medium !mb-2">
                                        Ngày sinh
                                    </label>
                                    <input
                                        type="date"
                                        value={profileData.birthDate}
                                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                        className="!w-full !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent"
                                    />
                                </div>

                                {/* Update Button */}
                                <div className="!flex !justify-center !pt-4">
                                    <button
                                        onClick={handleUpdate}
                                        className="!px-12 !py-3 !bg-red-500 !text-white !font-semibold !rounded-full hover:!bg-red-600 !transition-colors !shadow-md hover:!shadow-lg !border-0"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}