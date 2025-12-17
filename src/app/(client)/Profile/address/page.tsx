"use client";

import { useEffect, useState } from "react";
import dvhcvn from "@/app/checkout/address/dvhcvn.json";
import { useRouter } from "next/navigation";

function formatAddress(address: any) {
    if (!address) return "";

    const province = dvhcvn.data.find(p => p.level1_id === address.city);
    const district = province?.level2s.find(d => d.level2_id === address.district);
    const ward = district?.level3s.find(w => w.level3_id === address.ward);

    return [
        address.address_line,
        ward?.name,
        district?.name,
        province?.name,
    ]
        .filter(Boolean)
        .join(", ");
}

export default function AddressPage() {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:3000/profile", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setAddresses(data.Addresses || []);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="!bg-white !rounded-2xl !shadow-sm !p-8">
                Đang tải địa chỉ...
            </div>
        );
    }

    return (
        <div className="!bg-white !rounded-2xl !shadow-sm !p-8">
            <h1 className="!text-3xl !font-bold !text-gray-900 !mb-8">
                Địa chỉ giao hàng
            </h1>

            {addresses.length === 0 && (
                <p className="!text-gray-500">Chưa có địa chỉ nào</p>
            )}

            <div className="!space-y-4">
                {addresses.map(address => (
                    <div
                        key={address.id}
                        className={`!border !rounded-xl !p-4 ${address.is_default
                            ? "!border-red-500 !bg-red-50"
                            : "!border-gray-200"
                            }`}
                    >
                        <div className="!flex !justify-between !items-start">
                            <div>
                                <p className="!font-semibold !text-gray-900">
                                    {address.name} – {address.phone}
                                </p>
                                <p className="!text-gray-600 !mt-1">
                                    {formatAddress(address)}
                                </p>

                                {address.is_default && (
                                    <span className="!inline-block !mt-2 !text-xs !text-red-600 !font-medium">
                                        Mặc định
                                    </span>
                                )}
                            </div>

                            <button className="!text-red-500 hover:!underline !text-sm">
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add new address */}
            <div className="!mt-8">
                <button onClick={() => router.push('/Profile/address/add')} className="!px-6 !py-3 !bg-red-500 !text-white !rounded-full hover:!bg-red-600 !border-0">
                    Thêm địa chỉ mới
                </button>
            </div>
        </div>
    );
}
