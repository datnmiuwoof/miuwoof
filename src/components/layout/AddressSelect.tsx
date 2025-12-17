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
    const [addresses, setAddresses] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);



    const provinces = dvhcvn.data;
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!userId) return;
            try {
                const res = await fetch(`http://localhost:3000/api/address/`, { credentials: "include" });
                const data = await res.json();
                setAddresses(data);
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

    const handleSelectAddress = async (selectedAddr: any) => {
        try {
            // Gọi API để set địa chỉ này làm mặc định
            const res = await fetch(`http://localhost:3000/api/address/${selectedAddr.id}/set-default`, {
                method: 'PATCH', // hoặc PUT tùy backend
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Cập nhật mặc định thất bại');

            // Cập nhật state local: set tất cả is_default = false, rồi set cái được chọn = true
            const updatedAddresses = addresses.map(a => ({
                ...a,
                is_default: a.id === selectedAddr.id
            }));

            setAddresses(updatedAddresses);

            // Cập nhật các field form giống như khi load lần đầu
            const province = provinces.find(p => p.level1_id === String(selectedAddr.city));
            const districtList = province?.level2s || [];
            const district = districtList.find(d => d.level2_id === String(selectedAddr.district));
            const wardList = district?.level3s || [];

            setSelectedProvince(String(selectedAddr.city));
            setDistricts(districtList);
            setSelectedDistrict(String(selectedAddr.district));
            setWards(wardList);
            setSelectedWard(String(selectedAddr.ward));
            setSpecificAddress(selectedAddr.address_line);

            setHasAddress(true);

            // Thông báo cho component cha (nếu cần)
            onChangeAddress({
                city: selectedAddr.city,
                district: selectedAddr.district,
                ward: selectedAddr.ward,
                address: selectedAddr.address_line,
                phone: selectedAddr.phone,
            });

            // Đóng modal
            setShowModal(false);

        } catch (error) {
            console.error('Lỗi khi chọn địa chỉ:', error);
            // Có thể toast lỗi cho người dùng
            alert('Không thể chọn địa chỉ, vui lòng thử lại!');
        }
    };

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
    console.log(addresses)

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
                            onClick={() => setShowModal(true)}
                        >
                            Đổi địa chỉ
                        </button>
                    </div>

                </div>

            )}

            {showModal && (
                <div className="!fixed !inset-0 !bg-black/50 !z-50 !flex !items-center !justify-center !p-4">
                    <div className="!bg-white !rounded-2xl !w-full !max-w-lg !p-6 !shadow-2xl">
                        <div className="!flex !items-center !justify-between !mb-6">
                            <h3 className="!text-xl !font-bold !text-gray-800">📍 Chọn địa chỉ giao hàng</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="!text-gray-400 hover:!text-gray-600 !transition-colors !text-2xl !leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <div
                            className="!space-y-3 !max-h-96 !overflow-y-auto !pr-2"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#22c55e #f1f1f1'
                            }}
                        >
                            {addresses.map(addr => (
                                <div
                                    key={addr.id}
                                    className="!border-2 !border-gray-200 !rounded-xl !p-4 !cursor-pointer hover:!border-green-500 hover:!bg-green-50 !transition-all !duration-200 !relative"
                                    onClick={() => {
                                        handleSelectAddress(addr),
                                            setShowModal(false)
                                    }
                                    }



                                >
                                    {addr.is_default && (
                                        <span className="!absolute !top-3 !right-3 !bg-green-500 !text-white !text-xs !font-semibold !px-2 !py-1 !rounded-full">
                                            ⭐ Mặc định
                                        </span>
                                    )}
                                    <div className="!font-semibold !text-gray-800 !mb-2 !pr-20">
                                        {addr.address_line}
                                    </div>
                                    <div className="!text-sm !text-gray-600 !flex !items-center !gap-1">
                                        <span>📌</span>
                                        <span>{addr.ward}, {addr.district}, {addr.city}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="!mt-6 !w-full !bg-gradient-to-r !from-green-500 !to-green-600 hover:!from-green-600 hover:!to-green-700 !text-white !font-semibold !py-3 !px-4 !rounded-xl !transition-all !duration-200 !shadow-lg hover:!shadow-xl !flex !items-center !justify-center !gap-2"
                            onClick={() => {
                                setShowModal(false);
                                setHasAddress(false);
                                setSelectedProvince('');
                                setSelectedDistrict('');
                                setSelectedWard('');
                                setSpecificAddress('');
                            }}
                        >
                            <span className="!text-xl">+</span>
                            <span>Thêm địa chỉ mới</span>
                        </button>
                    </div>
                </div>
            )}

        </div >

    );
}
