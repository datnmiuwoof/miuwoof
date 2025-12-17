"use client";

import React, { useEffect, useState } from 'react';
import dvhcvn from "@/app/checkout/address/dvhcvn.json";
import { useRouter } from 'next/navigation';

function getFullAddress(address: any, dvhcvn: any) {
    const province = dvhcvn.data.find((p: any) => p.level1_id === address.city);
    const district = province?.level2s.find((d: any) => d.level2_id === address.district);
    const ward = district?.level3s.find((w: any) => w.level3_id === address.ward);

    return {
        // line: address.address_line,
        // ward: ward?.name ?? "",
        // district: district?.name ?? "",
        province: province?.name ?? "",
        full: `${ward?.name ?? ""}, ${district?.name ?? ""}, ${province?.name ?? ""}`,
    };
}

export default function Profile() {

    const router = useRouter();
    const [profileData, setProfileData] = useState({
        fullName: '',
        address: '',
        country: 'Vietnam',
        province: '',
        email: '',
        phone: '',
    });


    const [address, setAddress] = useState({});
    const formattedAddress = getFullAddress(address, dvhcvn);

    useEffect(() => {
        dataProfile();
    }, [])

    const dataProfile = async () => {
        const res = await fetch(`http://localhost:3000/profile`, { credentials: "include" });

        const result = await res.json();
        setAddress(result.Addresses?.[0])
        setProfileData({
            fullName: result.name,
            address: '',
            country: 'Vietnam',
            province: result.Addresses?.[0].city,
            email: result.email,
            phone: result.Addresses?.[0]?.phone,
        })
    }

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = () => {

        // const result = await fetch(`http://localhost:3000/profile/update` {

        // })
        console.log('Profile Data:', profileData);
    };

    console.log(dataProfile)

    return (
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

                    {/* Address */}
                    <div>
                        <label className="!block !text-gray-700 !font-medium !mb-2">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            value={formattedAddress?.full || ""}
                            disabled
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Chưa cập nhật"
                            className="!w-full !px-4 !py-3 !cursor-not-allowed !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent placeholder:!text-gray-400"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="!block !text-gray-700 !font-medium !mb-2">
                            Quốc gia
                        </label>
                        <input
                            type="text"
                            disabled
                            value={profileData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="!w-full !px-4 !py-3 !cursor-not-allowed !bg-gray-50 !border !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:!border-transparent"
                        />
                    </div>

                    {/* Province */}
                    <div>
                        <label className="!block !text-gray-700 !font-medium !mb-2">
                            Tỉnh thành
                        </label>
                        <input
                            type="text"
                            value={formattedAddress.province}
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
    );
}
