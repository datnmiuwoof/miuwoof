"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import dvhcvn from "@/app/checkout/address/dvhcvn.json";
import { CreditCard, MapPin, User, Package, Phone } from 'lucide-react';

interface AddressProps {
    onChangeAddress: (data: { city?: number; address: string; district?: number; ward?: number; phone?: string; }) => void;

}

export default function AddressSelect({ onChangeAddress }: AddressProps) {
    const { userId, token, loading } = useAuth();
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");
    const [hasAddress, setHasAddress] = useState(false);


    const provinces = dvhcvn.data;
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!userId) return;
            try {
                const res = await fetch(`http://localhost:3000/api/address/${userId}`);
                const data = await res.json();
                const defaultAddress = data.find((addr: any) => addr.is_default);
                if (defaultAddress) {
                    const province = provinces.find(p => p.level1_id === String(defaultAddress.city));
                    const districtList = province?.level2s || [];
                    const district = districtList.find(d => d.level2_id === String(defaultAddress.district));
                    const wardList = district?.level3s || [];

                    setSelectedProvince(String(defaultAddress.city));
                    setDistricts(districtList);

                    setSelectedDistrict(String(defaultAddress.district));
                    setWards(wardList);

                    setSelectedWard(String(defaultAddress.ward));
                    setSpecificAddress(defaultAddress.address_line);

                    setHasAddress(true);

                    onChangeAddress({
                        city: defaultAddress.city,
                        district: defaultAddress.district,
                        ward: defaultAddress.ward,
                        address: defaultAddress.address_line,
                        phone: defaultAddress.phone,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAddress();
    }, [userId]);

    // Handle selection
    const handleProvinceChange = (provinceId: string) => {
        setSelectedProvince(provinceId);
        const province = provinces.find(p => p.level1_id === provinceId);
        const districtList = province?.level2s || [];
        setDistricts(districtList);

        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);

        onChangeAddress({ city: provinceId, district: undefined, ward: undefined });
    };

    const handleDistrictChange = (districtId: string) => {
        setSelectedDistrict(districtId);
        const district = districts.find(d => d.level2_id === districtId);
        const wardList = district?.level3s || [];
        setWards(wardList);

        setSelectedWard("");
        onChangeAddress({ district: districtId, ward: undefined });
    };

    const handleWardChange = (wardId: string) => {
        setSelectedWard(wardId);
        onChangeAddress({ ward: wardId });
    };

    const handleAddressInput = (addr: string) => {
        setSpecificAddress(addr);
        onChangeAddress({ address: addr });
    };


    return (
        <div className="!bg-white !rounded-2xl !shadow-lg !p-6">
            <div className="!flex !items-center !gap-2 !mb-6">
                <MapPin className="!w-6 !h-6 !text-green-600" />
                <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">Địa chỉ giao hàng</h2>
            </div>
            {!hasAddress ? (<div className="!space-y-4">

                <div className="!grid md:!grid-cols-3 !gap-4">
                    <div>
                        <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                            Tỉnh/Thành phố <span className="!text-red-500">*</span>
                        </label>
                        <select
                            value={selectedProvince || ""}
                            onChange={e => handleProvinceChange(e.target.value)}
                            className="!border !border-gray-300 !text-base !rounded !px-4 !py-3 !w-full !max-h-48 !overflow-y-auto"
                        >
                            <option value="">Chọn tỉnh/thành phố</option>
                            {provinces.map((p: any) => (
                                <option key={p.level1_id} value={p.level1_id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                            Huyện/Quận <span className="!text-red-500">*</span>
                        </label>
                        <select
                            value={selectedDistrict || ""}
                            onChange={e => handleDistrictChange(e.target.value)}
                            className="!border !border-gray-300 !text-base !rounded !px-4 !py-3 !w-full !max-h-48 !overflow-y-auto"
                            disabled={!districts.length}
                        >
                            <option value="">-- Chọn quận/huyện --</option>
                            {districts.map((d: any) => (
                                <option key={d.level2_id} value={d.level2_id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                            Phường/Xã <span className="!text-red-500">*</span>
                        </label>
                        <select
                            value={selectedWard || ""}
                            onChange={e => handleWardChange(e.target.value)}
                            className="!border !border-gray-300 !text-base !rounded !px-4 !py-3 !w-full !max-h-48 !overflow-y-auto"
                            disabled={!districts.length}
                        >
                            <option value="">-- Chọn phường/xã --</option>
                            {wards.map((w: any) => (
                                <option key={w.level3_id} value={w.level3_id}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div>
                    <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                        Địa chỉ cụ thể <span className="!text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={specificAddress || ""}
                        onChange={e => handleAddressInput(e.target.value)}
                        className="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-green-500 focus:!border-transparent !transition !outline-none !text-base"
                        placeholder="Số nhà, tên đường"
                    />
                </div>

            </div>) : (
                <div className="!bg-white !rounded-2xl !shadow-lg !p-6">
                    <div className="!flex !items-center !gap-2 !mb-6">
                        <MapPin className="!w-6 !h-6 !text-green-600" />
                        <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">Địa chỉ giao hàng</h2>
                    </div>

                    <div className="!text-base !text-gray-700">
                        <div className="">{specificAddress}</div>
                        {[wards.find(w => w.level3_id === selectedWard)?.name,
                        districts.find(d => d.level2_id === selectedDistrict)?.name,
                        provinces.find(p => p.level1_id === selectedProvince)?.name]
                            .filter(Boolean) // loại bỏ undefined / rỗng
                            .join(", ")
                        }
                        <button
                            className="!ml-4 !text-green-600 !underline"
                            onClick={() => setHasAddress(false)}
                        >
                            Đổi địa chỉ
                        </button>
                    </div>

                </div>

            )}



        </div >

    );
}
