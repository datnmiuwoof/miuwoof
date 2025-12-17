'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, Calendar, Percent, Tag, ShoppingCart, Package, Edit2, Eye } from 'lucide-react';
import { useParams } from 'next/navigation';

const ViewEditVoucher = (mode = 'view') => {
    const [isEditMode, setIsEditMode] = useState(mode === 'edit');
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        discount_name: '',
        description: '',
        discount_value: '',
        discount_type: '0',
        min_order_value: '',
        max_order_value: '',
        max_discount_amount: '',
        start_date: '',
        end_date: '',
        code: '',
        is_active: '1',
        used_quantity: 0
    });

    const [errors, setErrors] = useState({});

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

            console.log(data)

            // Mock data for demo
            const mockData = {
                id: 1,
                discount_name: 'Khuyến Mãi Tết 2024',
                description: 'Giảm giá đặc biệt dịp Tết Nguyên Đán',
                discount_value: 20,
                discount_type: 0,
                min_order_value: 500000,
                max_order_value: 1000,
                max_discount_amount: 100000,
                start_date: '2024-01-01T00:00',
                end_date: '2024-02-15T23:59',
                code: 'NEWYEAR2024',
                is_active: 1,
                used_quantity: 342,
                created_at: '2023-12-15T10:30:00',
                updated_at: '2024-01-10T14:20:00'
            };

            setFormData({
                discount_name: mockData.discount_name,
                description: mockData.description || '',
                discount_value: mockData.discount_value.toString(),
                discount_type: mockData.discount_type.toString(),
                min_order_value: mockData.min_order_value?.toString() || '',
                max_order_value: mockData.max_order_value?.toString() || '',
                max_discount_amount: mockData.max_discount_amount?.toString() || '',
                start_date: mockData.start_date,
                end_date: mockData.end_date,
                code: mockData.code,
                is_active: mockData.is_active.toString(),
                used_quantity: mockData.used_quantity
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching voucher:', error);
            alert('Không thể tải thông tin voucher');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.discount_name.trim()) {
            newErrors.discount_name = 'Vui lòng nhập tên voucher';
        }

        if (!formData.code.trim()) {
            newErrors.code = 'Vui lòng nhập mã voucher';
        }

        if (!formData.discount_value || formData.discount_value <= 0) {
            newErrors.discount_value = 'Vui lòng nhập giá trị giảm giá hợp lệ';
        }

        if (formData.discount_type === '0' && (!formData.min_order_value || formData.min_order_value < 0)) {
            newErrors.min_order_value = 'Vui lòng nhập giá trị đơn hàng tối thiểu';
        }

        if (!formData.start_date) {
            newErrors.start_date = 'Vui lòng chọn ngày bắt đầu';
        }

        if (!formData.end_date) {
            newErrors.end_date = 'Vui lòng chọn ngày kết thúc';
        }

        if (formData.start_date && formData.end_date && new Date(formData.start_date) > new Date(formData.end_date)) {
            newErrors.end_date = 'Ngày kết thúc phải sau ngày bắt đầu';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const submitData = {
                ...formData,
                discount_value: parseFloat(formData.discount_value),
                discount_type: parseInt(formData.discount_type),
                min_order_value: formData.discount_type === '0' ? parseFloat(formData.min_order_value) : 0,
                max_order_value: formData.discount_type === '0' && formData.max_order_value ? parseFloat(formData.max_order_value) : null,
                max_discount_amount: formData.discount_type === '0' && formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : null,
                is_active: parseInt(formData.is_active)
            };

            console.log('Update data:', submitData);

            // TODO: Call API here
            // const response = await fetch(`http://localhost:3000/api/voucher/${voucherId}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include',
            //     body: JSON.stringify(submitData)
            // });

            alert('Cập nhật voucher thành công!');
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating voucher:', error);
            alert('Có lỗi xảy ra khi cập nhật voucher!');
        }
    };

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc muốn hủy? Mọi thay đổi sẽ không được lưu.')) {
            fetchVoucherData(); // Reload original data
            setIsEditMode(false);
        }
    };

    const formatCurrency = (value) => {
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditMode ? 'Chỉnh sửa voucher' : 'Chi tiết voucher'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {isEditMode ? 'Cập nhật thông tin voucher' : 'Xem thông tin chi tiết voucher'}
                            </p>
                        </div>

                        {!isEditMode && (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Edit2 className="w-4 h-4" />
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                </div>

                {/* Form/View */}
                <div className="space-y-6">
                    {/* Basic Information Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5" />
                            Thông tin cơ bản
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Voucher Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên voucher <span className="text-red-500">*</span>
                                </label>
                                {isEditMode ? (
                                    <>
                                        <input
                                            type="text"
                                            name="discount_name"
                                            value={formData.discount_name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.discount_name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.discount_name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.discount_name}</p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-gray-900 font-medium">{formData.discount_name}</p>
                                )}
                            </div>

                            {/* Voucher Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã voucher <span className="text-red-500">*</span>
                                </label>
                                {isEditMode ? (
                                    <>
                                        <input
                                            type="text"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase ${errors.code ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.code && (
                                            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-blue-600 font-bold text-lg">{formData.code}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                {isEditMode ? (
                                    <select
                                        name="is_active"
                                        value={formData.is_active}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="1">Kích hoạt</option>
                                        <option value="0">Tắt</option>
                                    </select>
                                ) : (
                                    <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${formData.is_active === '1'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {formData.is_active === '1' ? 'Đang hoạt động' : 'Đã tắt'}
                                    </span>
                                )}
                            </div>

                            {/* Used Quantity - View only */}
                            {!isEditMode && formData.discount_type === '0' && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Đã sử dụng
                                    </label>
                                    <p className="text-gray-900 font-medium">
                                        {formData.used_quantity} / {formData.max_order_value || '∞'} lượt
                                    </p>
                                </div>
                            )}

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả
                                </label>
                                {isEditMode ? (
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    />
                                ) : (
                                    <p className="text-gray-700">{formData.description || '—'}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Discount Settings Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Percent className="w-5 h-5" />
                            Thiết lập giảm giá
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Discount Type */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loại giảm giá
                                </label>
                                {isEditMode ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.discount_type === '0'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="discount_type"
                                                value="0"
                                                checked={formData.discount_type === '0'}
                                                onChange={handleChange}
                                                className="w-4 h-4"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                                                    <span className="font-medium">Giảm giá đơn hàng</span>
                                                </div>
                                            </div>
                                        </label>

                                        <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.discount_type === '1'
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="discount_type"
                                                value="1"
                                                checked={formData.discount_type === '1'}
                                                onChange={handleChange}
                                                className="w-4 h-4"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Package className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium">Giảm giá sản phẩm</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {formData.discount_type === '0' ? (
                                            <>
                                                <ShoppingCart className="w-5 h-5 text-blue-600" />
                                                <span className="font-medium">Giảm giá đơn hàng</span>
                                            </>
                                        ) : (
                                            <>
                                                <Package className="w-5 h-5 text-green-600" />
                                                <span className="font-medium">Giảm giá sản phẩm</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Discount Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giá trị giảm (%) <span className="text-red-500">*</span>
                                </label>
                                {isEditMode ? (
                                    <>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="discount_value"
                                                value={formData.discount_value}
                                                onChange={handleChange}
                                                min="0"
                                                max="100"
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.discount_value ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                        {errors.discount_value && (
                                            <p className="text-red-500 text-sm mt-1">{errors.discount_value}</p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-orange-600 font-bold text-xl">{formData.discount_value}%</p>
                                )}
                            </div>

                            {/* Max Discount Amount */}
                            {formData.discount_type === '0' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giảm tối đa (đ)
                                    </label>
                                    {isEditMode ? (
                                        <>
                                            <input
                                                type="number"
                                                name="max_discount_amount"
                                                value={formData.max_discount_amount}
                                                onChange={handleChange}
                                                placeholder="Không giới hạn"
                                                min="0"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Để trống nếu không giới hạn</p>
                                        </>
                                    ) : (
                                        <p className="text-gray-900 font-medium">
                                            {formData.max_discount_amount
                                                ? formatCurrency(formData.max_discount_amount) + 'đ'
                                                : 'Không giới hạn'}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Min Order Value */}
                            {formData.discount_type === '0' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Đơn hàng tối thiểu (đ) <span className="text-red-500">*</span>
                                    </label>
                                    {isEditMode ? (
                                        <>
                                            <input
                                                type="number"
                                                name="min_order_value"
                                                value={formData.min_order_value}
                                                onChange={handleChange}
                                                min="0"
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.min_order_value ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.min_order_value && (
                                                <p className="text-red-500 text-sm mt-1">{errors.min_order_value}</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-gray-900 font-medium">
                                            {formatCurrency(formData.min_order_value)}đ
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Max Usage */}
                            {formData.discount_type === '0' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số lượng sử dụng tối đa
                                    </label>
                                    {isEditMode ? (
                                        <>
                                            <input
                                                type="number"
                                                name="max_order_value"
                                                value={formData.max_order_value}
                                                onChange={handleChange}
                                                placeholder="Không giới hạn"
                                                min="0"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Để trống nếu không giới hạn</p>
                                        </>
                                    ) : (
                                        <p className="text-gray-900 font-medium">
                                            {formData.max_order_value || 'Không giới hạn'}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Time Period Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Thời gian áp dụng
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày bắt đầu <span className="text-red-500">*</span>
                                </label>
                                {isEditMode ? (
                                    <>
                                        <input
                                            type="datetime-local"
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.start_date ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.start_date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-gray-900 font-medium">{formatDate(formData.start_date)}</p>
                                )}
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày kết thúc <span className="text-red-500">*</span>
                                </label>
                                {isEditMode ? (
                                    <>
                                        <input
                                            type="datetime-local"
                                            name="end_date"
                                            value={formData.end_date}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.end_date ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.end_date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-gray-900 font-medium">{formatDate(formData.end_date)}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditMode && (
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                <X className="w-4 h-4" />
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Save className="w-4 h-4" />
                                Lưu thay đổi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewEditVoucher;