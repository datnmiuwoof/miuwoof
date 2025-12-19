'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Percent, Tag, ShoppingCart, Package, Edit2, AlertCircle, Clock, TrendingUp, Box } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const ViewVoucher = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [voucher, setVoucher] = useState(null);

    useEffect(() => {
        fetchVoucherData();
    }, [id]);

    const fetchVoucherData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/voucher/${id}`, {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.voucher) {
                setVoucher(data.voucher);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching voucher:', error);
            alert('Không thể tải thông tin voucher');
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        if (!value || value === '0' || value === 0) return '0';
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusInfo = () => {
        if (!voucher) return { text: 'Không xác định', color: 'gray' };

        if (!voucher.is_active) {
            return { text: 'Đã tắt', color: 'gray' };
        }

        const now = new Date();
        const startDate = voucher.start_date ? new Date(voucher.start_date) : null;
        const endDate = voucher.end_date ? new Date(voucher.end_date) : null;

        if (startDate && now < startDate) {
            return { text: 'Chưa bắt đầu', color: 'yellow' };
        }

        // Only check end date for order discount (type 0)
        if (voucher.discount_type === 0 && endDate && now > endDate) {
            return { text: 'Đã hết hạn', color: 'red' };
        }

        // Check usage limit for order discount
        if (voucher.discount_type === 0 && voucher.max_order_value && parseFloat(voucher.max_order_value) > 0) {
            if (voucher.used_quantity >= parseFloat(voucher.max_order_value)) {
                return { text: 'Đã hết lượt', color: 'red' };
            }
        }

        return { text: 'Đang hoạt động', color: 'green' };
    };

    const getUsagePercentage = () => {
        if (!voucher || voucher.discount_type !== 0) return 0;
        const maxUsage = parseFloat(voucher.max_order_value);
        if (!maxUsage || maxUsage === 0) return 0;
        return Math.min(100, (voucher.used_quantity / maxUsage) * 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    if (!voucher) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-red-600">Không tìm thấy voucher</div>
            </div>
        );
    }

    const isOrderDiscount = voucher.discount_type === 0;
    const isProductDiscount = voucher.discount_type === 1;
    const statusInfo = getStatusInfo();
    const usagePercentage = getUsagePercentage();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.push('/admin/voucher')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {voucher.discount_name}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Chi tiết thông tin voucher
                            </p>
                        </div>

                        <button
                            onClick={() => router.push(`/admin/voucher/edit/${id}`)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <Edit2 className="w-4 h-4" />
                            Chỉnh sửa
                        </button>
                    </div>
                </div>

                {/* Status Banner */}
                <div className={`mb-6 rounded-lg p-4 flex items-center justify-between border-2 ${statusInfo.color === 'green' ? 'bg-green-50 border-green-200' :
                    statusInfo.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                        statusInfo.color === 'red' ? 'bg-red-50 border-red-200' :
                            'bg-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center gap-3">
                        <AlertCircle className={`w-6 h-6 ${statusInfo.color === 'green' ? 'text-green-600' :
                            statusInfo.color === 'yellow' ? 'text-yellow-600' :
                                statusInfo.color === 'red' ? 'text-red-600' :
                                    'text-gray-600'
                            }`} />
                        <div>
                            <p className={`font-semibold text-lg ${statusInfo.color === 'green' ? 'text-green-900' :
                                statusInfo.color === 'yellow' ? 'text-yellow-900' :
                                    statusInfo.color === 'red' ? 'text-red-900' :
                                        'text-gray-900'
                                }`}>
                                {statusInfo.text}
                            </p>
                            <p className={`text-sm ${statusInfo.color === 'green' ? 'text-green-700' :
                                statusInfo.color === 'yellow' ? 'text-yellow-700' :
                                    statusInfo.color === 'red' ? 'text-red-700' :
                                        'text-gray-700'
                                }`}>
                                {isOrderDiscount ? 'Voucher giảm giá đơn hàng' : 'Voucher giảm giá sản phẩm'}
                            </p>
                        </div>
                    </div>

                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${statusInfo.color === 'green' ? 'bg-green-200 text-green-900' :
                        statusInfo.color === 'yellow' ? 'bg-yellow-200 text-yellow-900' :
                            statusInfo.color === 'red' ? 'bg-red-200 text-red-900' :
                                'bg-gray-200 text-gray-900'
                        }`}>
                        Giảm {voucher.discount_value}%
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-blue-600" />
                                Thông tin cơ bản
                            </h2>

                            <div className="space-y-4">
                                {/* Voucher Code - Only for order discount */}
                                {isOrderDiscount && voucher.code && (
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            Mã voucher
                                        </label>
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-bold text-blue-700 tracking-wider">
                                                {voucher.code}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(voucher.code);
                                                    alert('Đã copy mã voucher!');
                                                }}
                                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Product Name - Only for product discount */}
                                {isProductDiscount && voucher.product_name && (
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                        <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                                            <Box className="w-4 h-4" />
                                            Sản phẩm áp dụng
                                        </label>
                                        <p className="text-xl font-bold text-green-700">
                                            {voucher.product_name}
                                        </p>
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Mô tả
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 rounded-lg p-3">
                                        {voucher.description || 'Không có mô tả'}
                                    </p>
                                </div>

                                {/* Discount Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Loại voucher
                                    </label>
                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                                        {isOrderDiscount ? (
                                            <>
                                                <ShoppingCart className="w-5 h-5 text-blue-600" />
                                                <span className="font-medium text-gray-900">Giảm giá đơn hàng</span>
                                                <span className="text-sm text-gray-500 ml-2">(Áp dụng khi thanh toán)</span>
                                            </>
                                        ) : (
                                            <>
                                                <Package className="w-5 h-5 text-green-600" />
                                                <span className="font-medium text-gray-900">Giảm giá sản phẩm</span>
                                                <span className="text-sm text-gray-500 ml-2">(Áp dụng cho sản phẩm cụ thể)</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Discount Settings Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Percent className="w-5 h-5 text-orange-600" />
                                Thiết lập giảm giá
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Discount Value */}
                                <div className="col-span-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Giá trị giảm
                                    </label>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {voucher.discount_value}%
                                    </p>
                                </div>

                                {/* Order discount specific fields */}
                                {isOrderDiscount && (
                                    <>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Đơn hàng tối thiểu
                                            </label>
                                            <p className="text-lg font-bold text-gray-900">
                                                {voucher.min_order_value ? formatCurrency(voucher.min_order_value) + 'đ' : 'Không yêu cầu'}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Giảm tối đa
                                            </label>
                                            <p className="text-lg font-bold text-gray-900">
                                                {voucher.max_discount_amount && parseFloat(voucher.max_discount_amount) > 0
                                                    ? formatCurrency(voucher.max_discount_amount) + 'đ'
                                                    : 'Không giới hạn'}
                                            </p>
                                        </div>
                                    </>
                                )}

                                {/* Product discount info */}
                                {isProductDiscount && (
                                    <div className="col-span-2 bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-sm text-green-800">
                                            <strong>Lưu ý:</strong> Voucher sẽ tự động áp dụng giảm {voucher.discount_value}%
                                            cho sản phẩm "{voucher.product_name || 'đã chọn'}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Time Period Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                Thời gian áp dụng
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-green-600 mt-1" />
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Ngày bắt đầu
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatDate(voucher.start_date)}
                                        </p>
                                    </div>
                                </div>

                                {isOrderDiscount && (
                                    <div className="flex items-start gap-4">
                                        <Clock className="w-5 h-5 text-red-600 mt-1" />
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Ngày kết thúc
                                            </label>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {voucher.end_date ? formatDate(voucher.end_date) : 'Không giới hạn'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {isProductDiscount && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="text-sm text-blue-800">
                                            <strong>Lưu ý:</strong> Voucher giảm giá sản phẩm không có ngày kết thúc,
                                            chỉ cần kích hoạt để áp dụng
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Info */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Trạng thái
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Kích hoạt</span>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${voucher.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {voucher.is_active ? 'Bật' : 'Tắt'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Usage Stats - Only for order discount */}
                        {isOrderDiscount && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                    Thống kê sử dụng
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Đã sử dụng</span>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {voucher.used_quantity || 0} / {
                                                    voucher.max_order_value && parseFloat(voucher.max_order_value) > 0
                                                        ? parseFloat(voucher.max_order_value)
                                                        : '∞'
                                                }
                                            </span>
                                        </div>

                                        {voucher.max_order_value && parseFloat(voucher.max_order_value) > 0 && (
                                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${usagePercentage >= 100 ? 'bg-red-500' :
                                                        usagePercentage >= 80 ? 'bg-orange-500' :
                                                            'bg-blue-500'
                                                        }`}
                                                    style={{ width: `${usagePercentage}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <label className="block text-xs text-gray-600 mb-1">
                                            Số lượt còn lại
                                        </label>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {voucher.max_order_value && parseFloat(voucher.max_order_value) > 0
                                                ? Math.max(0, parseFloat(voucher.max_order_value) - (voucher.used_quantity || 0))
                                                : '∞'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Product Discount Info */}
                        {isProductDiscount && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-green-600" />
                                    Thông tin sản phẩm
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <p className="text-sm text-green-800 mb-2">
                                            Voucher này tự động giảm <strong>{voucher.discount_value}%</strong>
                                            cho sản phẩm
                                        </p>
                                        <p className="font-semibold text-green-900">
                                            {voucher.product_name || 'Chưa có tên sản phẩm'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Metadata Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Thông tin khác
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-600">ID voucher:</span>
                                    <span className="ml-2 font-mono text-gray-900">#{voucher.id}</span>
                                </div>
                                {voucher.createdAt && (
                                    <div>
                                        <span className="text-gray-600">Ngày tạo:</span>
                                        <p className="mt-1 text-gray-900">{formatDate(voucher.createdAt)}</p>
                                    </div>
                                )}
                                {voucher.updatedAt && (
                                    <div>
                                        <span className="text-gray-600">Cập nhật lần cuối:</span>
                                        <p className="mt-1 text-gray-900">{formatDate(voucher.updatedAt)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewVoucher;