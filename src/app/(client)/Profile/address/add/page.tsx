"use client"
import { useState } from 'react';
import dvhcvn from '@/app/checkout/address/dvhcvn.json'

export default function AddressForm() {
    const provinces = dvhcvn.data;

    const [form, setForm] = useState({
        phone: '',
        address_line: '',
        is_default: false
    });

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        setSelectedDistrict('');
        setSelectedWard('');
        setWards([]);

        const province = provinces.find(p => p.level1_id === provinceId);
        setDistricts(province?.level2s || []);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setSelectedWard('');

        const district = districts.find(d => d.level2_id === districtId);
        setWards(district?.level3s || []);
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    const addressData = {
        ...form,
        city: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard
    };

    const handleSubmit = async () => {

        const result = await fetch(`http://localhost:3000/profile/add`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addressData)
        })

        if (result.ok) {
            const data = await result.json();
            console.log(data.message)
        }


    };

    return (
        <div className="!bg-white !rounded-2xl !shadow-sm !p-8 !mx-auto ">

            <h1 className="!text-3xl !font-bold !mb-8 !text-gray-900">
                Thêm địa chỉ mới
            </h1>

            <div className="!space-y-5">

                <input
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={e => handleChange("phone", e.target.value)}
                    className="!w-full !px-4 !py-3.5 !border !border-gray-200 !rounded-xl !text-[15px] focus:!outline-none focus:!border-green-500 placeholder:!text-gray-400"
                />

                {/* Section địa chỉ giao hàng */}
                <div className="!pt-4">
                    <div className="!flex !items-center !gap-2 !text-base !font-semibold !mb-4 !text-gray-900">
                        Địa chỉ giao hàng
                    </div>

                    {/* Grid 3 cột cho tỉnh/huyện/xã */}
                    <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4 !mb-4">
                        {/* Tỉnh/Thành phố */}
                        <div>
                            <label className="!block !text-[13px] !text-gray-600 !mb-2">
                                Tỉnh/Thành phố <span className="!text-red-500">*</span>
                            </label>
                            <select
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                className="!w-full !px-4 !py-3.5 !border !border-gray-200 !rounded-xl !text-[15px] focus:!outline-none focus:!border-green-500 !bg-white !appearance-none !cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 16px center'
                                }}
                            >
                                <option value="">Chọn Tỉnh/Thành phố</option>
                                {provinces.map(province => (
                                    <option key={province.level1_id} value={province.level1_id}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Huyện/Quận */}
                        <div>
                            <label className="!block !text-[13px] !text-gray-600 !mb-2">
                                Huyện/Quận <span className="!text-red-500">*</span>
                            </label>
                            <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                                className="!w-full !px-4 !py-3.5 !border !border-gray-200 !rounded-xl !text-[15px] focus:!outline-none focus:!border-green-500 !bg-white !appearance-none !cursor-pointer disabled:!bg-gray-50 disabled:!cursor-not-allowed"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 16px center'
                                }}
                            >
                                <option value="">Chọn Huyện/Quận</option>
                                {districts.map(district => (
                                    <option key={district.level2_id} value={district.level2_id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Phường/Xã */}
                        <div>
                            <label className="!block !text-[13px] !text-gray-600 !mb-2">
                                Phường/Xã <span className="!text-red-500">*</span>
                            </label>
                            <select
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict}
                                className="!w-full !px-4 !py-3.5 !border !border-gray-200 !rounded-xl !text-[15px] focus:!outline-none focus:!border-green-500 !bg-white !appearance-none !cursor-pointer disabled:!bg-gray-50 disabled:!cursor-not-allowed"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 16px center'
                                }}
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map(ward => (
                                    <option key={ward.level3_id} value={ward.level3_id}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Địa chỉ cụ thể trong section */}
                    <div>
                        <label className="!block !text-[13px] !text-gray-600 !mb-2">
                            Địa chỉ cụ thể <span className="!text-red-500">*</span>
                        </label>
                        <input
                            placeholder="VD: Số 123, đường ABC, khu phố 1"
                            value={form.address_line}
                            onChange={e => handleChange("address_line", e.target.value)}
                            className="!w-full !px-4 !py-3.5 !border !border-gray-200 !rounded-xl !text-[15px] focus:!outline-none focus:!border-green-500 placeholder:!text-gray-400"
                        />
                    </div>
                </div>

                <label className="!flex !items-center !gap-2 !cursor-pointer !pt-2">
                    <input
                        type="checkbox"
                        checked={form.is_default}
                        onChange={e => handleChange("is_default", e.target.checked)}
                        className="!w-[18px] !h-[18px] !rounded !accent-green-500 !cursor-pointer"
                    />
                    <span className="!text-[15px] !text-gray-700">Đặt làm địa chỉ mặc định</span>
                </label>

                <div className="!flex !gap-4 !pt-4">
                    <button
                        onClick={handleSubmit}
                        className="!px-8 !py-3 !bg-[#ee4d2d] hover:!bg-[#d73211] !text-white !rounded-full !border-0 !text-[15px] !font-medium !transition-colors !cursor-pointer"
                    >
                        Lưu địa chỉ
                    </button>

                    <button
                        onClick={() => console.log('Hủy')}
                        className="!px-8 !py-3 !bg-gray-100 hover:!bg-gray-200 !text-gray-700 !rounded-full !border-0 !text-[15px] !font-medium !transition-colors !cursor-pointer"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}