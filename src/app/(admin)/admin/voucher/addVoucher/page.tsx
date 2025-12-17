'use client'

import React, { useState } from 'react';
import { ArrowLeft, Save, X, Calendar, Percent, DollarSign, Tag, FileText, ShoppingCart, Package } from 'lucide-react';

const AddVoucherForm = () => {
    const [formData, setFormData] = useState<any>({
        discount_name: '',
        description: '',
        discount_value: '',
        discount_type: '0',
        min_order_value: '',
        max_order_value: '',
        start_date: '',
        end_date: '',
        code: '',
        used_quantity: 0,
        is_active: '1'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
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

        if (formData.discount_type === '0' && (!formData.max_order_value || formData.max_order_value < 0)) {
            newErrors.max_order_value = 'Vui lòng nhập giá trị đơn hàng tối thiểu';
        }

        if (formData.discount_type === '0' && formData.used_quantity && formData.used_quantity <= 0) {
            newErrors.used_quantity = 'Số lượng sử dụng tối đa phải lớn hơn 0';
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

    const handleSubmit = async () => {
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
                is_active: parseInt(formData.is_active),
                used_quantity: formData.used_quantity || 0,
            };

            console.log('Submit data:', submitData);


            const response = await fetch('http://localhost:3000/api/voucher/addVoucher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                alert('Tạo voucher thành công!');
            } else {
                alert('Tạo voucher không thành công!');
            }



        } catch (error) {
            console.error('Error creating voucher:', error);
            alert('Có lỗi xảy ra khi tạo voucher!');
        }
    };

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc muốn hủy? Mọi thay đổi sẽ không được lưu.')) {
            window.history.back();
        }
    };

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
                    <h1 className="text-2xl font-bold text-gray-900">Tạo mã giảm giá mới</h1>
                    <p className="text-gray-600 mt-1">Điền thông tin để tạo voucher giảm giá</p>
                </div>

                {/* Form */}
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
                                <input
                                    type="text"
                                    name="discount_name"
                                    value={formData.discount_name}
                                    onChange={handleChange}
                                    placeholder="VD: Khuyến mãi mùa hè 2024"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.discount_name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.discount_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.discount_name}</p>
                                )}
                            </div>

                            {/* Voucher Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã voucher <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder="VD: SUMMER2024"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase ${errors.code ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.code && (
                                    <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    name="is_active"
                                    value={formData.is_active}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="1">Kích hoạt</option>
                                    <option value="0">Tắt</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Mô tả chi tiết về voucher..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                />
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
                                    Loại giảm giá <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.discount_type === '0'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
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
                                            <p className="text-xs text-gray-500 mt-1">Áp dụng cho tổng đơn hàng</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.discount_type === '1'
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 hover:border-gray-300'
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
                                            <p className="text-xs text-gray-500 mt-1">Áp dụng cho từng sản phẩm</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Discount Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giá trị giảm (%) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="discount_value"
                                        value={formData.discount_value}
                                        onChange={handleChange}
                                        placeholder="0"
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
                            </div>

                            {/* Conditional Fields for Order Discount */}
                            {formData.discount_type === '0' && (
                                <>
                                    {/* Max Discount Amount - chỉ hiện khi discount_type = 0 */}
                                    {formData.discount_type === '0' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Giảm tối đa (đ)
                                            </label>
                                            <input
                                                type="number"
                                                name="max_order_value"
                                                value={(formData.max_order_value)}
                                                onChange={handleChange}
                                                placeholder="Không giới hạn"
                                                min="0"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            {errors.max_order_value && (
                                                <p className="text-red-500 text-sm mt-1">{errors.max_order_value}</p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">Số tiền giảm tối đa khi áp dụng %</p>
                                        </div>
                                    )}

                                    {/* Min Order Value */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Đơn hàng tối thiểu (đ) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="min_order_value"
                                            value={formData.min_order_value}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.min_order_value ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.min_order_value && (
                                            <p className="text-red-500 text-sm mt-1">{errors.min_order_value}</p>
                                        )}
                                    </div>

                                    {/* Max Usage */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số lượng sử dụng tối đa
                                        </label>
                                        <input
                                            type="number"
                                            name="used_quantity"
                                            value={formData.used_quantity}
                                            onChange={handleChange}
                                            placeholder="Không giới hạn"
                                            min="0"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.max_order_value ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Để trống nếu không giới hạn</p>
                                        {errors.used_quantity && (
                                            <p className="text-red-500 text-sm mt-1">{errors.used_quantity}</p>
                                        )}
                                    </div>
                                </>
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
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày kết thúc <span className="text-red-500">*</span>
                                </label>
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
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
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
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Save className="w-4 h-4" />
                            Tạo voucher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVoucherForm;