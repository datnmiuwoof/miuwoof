"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dvhcvn from "@/app/checkout/address/dvhcvn.json";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShoppingBag,
    Heart,
    Clock,
    Shield,
    Edit,
    Ban,
    CheckCircle,
    ArrowLeft,
    Package,
    DollarSign
} from "lucide-react";


export default function UserDetailPage() {

    const router = useRouter();
    const { id } = useParams()
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [dataActiveTab, setDataActiveTab] = useState([]);
    const [allData, setAllData] = useState();
    const [page, setPage] = useState(1);


    function getFullAddress(address: any, dvhcvn: any) {
        const province = dvhcvn.data.find((p: any) => p.level1_id == address.city);
        const district = province?.level2s.find((d: any) => d.level2_id == address.district);
        const ward = district?.level3s.find((w: any) => w.level3_id == address.ward);

        return {
            line: address.address_line,
            ward: ward?.name ?? "",
            district: district?.name ?? "",
            province: province?.name ?? "",
            full: `${address.address_line}`,
        };
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                credentials: "include"
            });
            const json = await res.json();
            setUser(json.data);
            setAllData(json.status)
            setLoading(false);
            console.log(json)

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTabData();
    }, [activeTab, page])

    const fetchTabData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/status/${id}?activeTab=${activeTab}&page=${page}`, {
                credentials: "include"
            });

            const result = await res.json();
            setDataActiveTab(result.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleBlock = async () => {
        try {
            const result = await fetch(`http://localhost:3000/api/users/block/${user.id}`,
                {
                    method: "PUT",
                    credentials: "include",
                })

            const res = await result.json();
            alert(res.message);
            router.push("/admin/user")

        } catch (error) {
            console.log(error)
        }
    }

    // const statusConfig: any = {
    //     active: { label: "Hoạt động", color: "bg-green-100 text-green-700", icon: CheckCircle },
    //     inactive: { label: "Không hoạt động", color: "bg-gray-100 text-gray-700", icon: Ban }
    // };

    const orderStatusConfig: any = {
        completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
        confirmed: { label: "chờ shipper", color: "bg-green-100 text-green-500" },
        pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
        shipping: { label: "Đang giao", color: "bg-blue-100 text-blue-700" },
        cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
        refund: { label: "Đã hủy", color: "bg-red-100 text-red-500" }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Quay lại danh sách
                </button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Chi tiết người dùng</h1>
                        <p className="text-gray-600 mt-1">Thông tin và lịch sử mua hàng</p>
                    </div>
                    <div className="flex gap-2">
                        {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            <Edit className="w-4 h-4" />
                            Chỉnh sửa
                        </button> */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            onClick={handleBlock}
                        >
                            <Ban className="w-4 h-4" />
                            Vô hiệu hóa
                        </button>
                    </div>
                </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {user.name.charAt(0)}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                            {/* <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${statusConfig[user.status].color}`}>
                                {React.createElement(statusConfig[user.status].icon, { className: "w-4 h-4" })}
                                {statusConfig[user.status].label}
                            </span> */}
                            <span className="px-3 py-1 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">
                                {user.role === 'admin' ? 'Quản trị viên' : user.role === 'manager' ? 'Quản lý' : 'Người dùng'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-5 h-5" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-5 h-5" />
                                <span>{user?.Addresses?.[0]?.phone || "..."}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-5 h-5" />
                                <span>Tham gia: {user.createdAt}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Tổng đơn hàng</p>
                            <h3 className="text-2xl font-bold text-gray-800">{allData.total_order}</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <ShoppingBag className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Tổng chi tiêu</p>
                            <h3 className="text-xl font-bold text-gray-800">
                                {allData.total_amount ? (allData.total_amount).toLocaleString() : 0}đ
                            </h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Yêu thích</p>
                            {/* <h3 className="text-2xl font-bold text-gray-800">{user.stats.totalWishlist}</h3> */}
                            <h3 className="text-2xl font-bold text-gray-800">5</h3>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <Heart className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>


            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-6 py-4 font-medium transition-colors ${activeTab === "overview"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Tổng quan
                    </button>
                    <button
                        onClick={() => setActiveTab("orderHistory")}
                        className={`px-6 py-4 font-medium transition-colors ${activeTab === "orderHistory"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Lịch sử đơn hàng
                        ({allData.total_order})
                    </button>
                    <button
                        onClick={() => setActiveTab("wishlist")}
                        className={`px-6 py-4 font-medium transition-colors ${activeTab === "wishlist"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Danh sách yêu thích
                        {/* ({user.stats.totalWishlist}) */}
                        (15)
                    </button>
                    <button
                        onClick={() => setActiveTab("addresses")}
                        className={`px-6 py-4 font-medium transition-colors ${activeTab === "addresses"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Địa chỉ ({user.Addresses.length})
                    </button>
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {/* Recent Orders */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Đơn hàng gần đây</h3>
                                <div className="space-y-3">
                                    {Array.isArray(dataActiveTab) && dataActiveTab.map((order: any) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-800">ORD-{order.id}</p>
                                                <p className="text-sm text-gray-500">{order.createdAt}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-800 mb-1">
                                                    {(order.total_amount).toLocaleString()}đ
                                                </p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${orderStatusConfig[order.order_status?.toLowerCase()?.trim()]?.color || 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {orderStatusConfig[order.order_status?.toLowerCase()?.trim()]?.label || order.order_status || 'Unknown'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Wishlist */}
                            {/* <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sản phẩm yêu thích</h3>
                                <div className="space-y-3">
                                    {user.wishlist.slice(0, 3).map((item: any) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{item.name}</p>
                                                    <p className="text-sm text-gray-500">{item.addedAt}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-800">
                                                {(item.price / 1000).toFixed(0)}K
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === "orderHistory" && (
                        <div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã đơn</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày đặt</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Số SP</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tổng tiền</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {dataActiveTab?.orders?.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-blue-600 font-semibold">ORD-{order.id}</td>
                                            <td className="px-4 py-3 text-gray-700">{order.createdAt}</td>
                                            <td className="px-4 py-3 text-gray-700">
                                                x {order.OrderDetails?.reduce((sum: number, item: any) => sum + item.quantity, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 font-semibold">
                                                {order.total_amount?.toLocaleString("vi-VN")}đ
                                            </td>
                                            <td className="px-4 py-3">
                                                {orderStatusConfig[order.order_status] ? (
                                                    <span className={`text-xs px-2 py-1 rounded-full ${orderStatusConfig[order.order_status?.toLowerCase().trim()].color}`}>
                                                        {orderStatusConfig[order.order_status?.toLowerCase().trim()].label}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Unknown</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <a href={`/admin/order/${order.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                                    Xem
                                                </a>
                                            </td>
                                        </tr>


                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end items-center mt-2 space-x-2">
                                <button disabled={page <= 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >Prev</button>
                                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">{page} / {dataActiveTab.totalPages}</span>
                                <button
                                    disabled={page >= dataActiveTab.totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >Next</button>
                            </div>

                        </div>
                    )}

                    {/* Wishlist Tab */}
                    {activeTab === "wishlist" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* {user.wishlist.map((item: any) => (
                                <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                        <Package className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">{item.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-blue-600">
                                            {item.price.toLocaleString("vi-VN")}đ
                                        </p>
                                        <p className="text-sm text-gray-500">{item.addedAt}</p>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === "addresses" && (

                        <div className="space-y-4">
                            {dataActiveTab?.addresses?.length > 0 ? (
                                dataActiveTab.addresses.map((addr: any) => {
                                    const formatted = getFullAddress(addr, dvhcvn);
                                    return (
                                        <div key={addr.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-gray-600" />
                                                </div>
                                                {addr?.is_default && (
                                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold">
                                                        Mặc định
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-700 mb-2">{formatted?.full || "Chưa có địa chỉ"}</p>

                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4" />
                                                <span className="text-sm">{addr?.phone || "..."}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 italic">Chưa có địa chỉ nào.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}