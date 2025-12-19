'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Calendar, Percent, Tag, ShoppingCart, Package, AlertCircle, Box } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const EditVoucher = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        discount_name: '',
        description: '',
        code: '',
        // product_name: '',
        discount_type: 0, // 0 = order, 1 = product
        discount_value: '',
        min_order_value: '',
        used_quantity: 0,
        max_order_value: '',
        start_date: '',
        end_date: '',
        is_active: true
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

            if (data.voucher) {
                // Format dates for datetime-local input
                const formatDateForInput = (dateString) => {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16);
                };

                setFormData({
                    discount_name: data.voucher.discount_name || '',
                    description: data.voucher.description || '',
                    code: data.voucher.code || '',
                    // product_name: data.voucher.product_name || '',
                    discount_type: data.voucher.discount_type,
                    discount_value: data.voucher.discount_value || '',
                    used_quantity: data.voucher.used_quantity || '',
                    min_order_value: data.voucher.min_order_value || '',
                    max_order_value: data.voucher.max_order_value || '',
                    start_date: formatDateForInput(data.voucher.start_date),
                    end_date: formatDateForInput(data.voucher.end_date),
                    is_active: data.voucher.is_active
                });
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching voucher:', error);
            alert('Không thể tải thông tin voucher');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const isOrderDiscount = formData.discount_type === 0;
        const isProductDiscount = formData.discount_type === 1;

        // Common validations
        // if (!formData.discount_name.trim()) {
        //     newErrors.discount_name = 'Vui lòng nhập tên voucher';
        // }

        if (!formData.discount_value || parseFloat(formData.discount_value) <= 0) {
            newErrors.discount_value = 'Vui lòng nhập giá trị giảm giá hợp lệ';
        } else if (parseFloat(formData.discount_value) > 100) {
            newErrors.discount_value = 'Giá trị giảm không được vượt quá 100%';
        }

        // if (!formData.start_date) {
        //     newErrors.start_date = 'Vui lòng chọn ngày bắt đầu';
        // }

        // Order discount specific validations
        if (isOrderDiscount) {
            if (!formData.code || !formData.code.trim()) {
                newErrors.code = 'Vui lòng nhập mã voucher';
            }

            if (formData.min_order_value && parseFloat(formData.min_order_value) < 0) {
                newErrors.min_order_value = 'Giá trị đơn hàng tối thiểu không hợp lệ';
            }

            if (formData.used_quantity && parseFloat(formData.used_quantity) < 0) {
                newErrors.used_quantity = 'Giá trị giảm tối đa không hợp lệ';
            }

            if (formData.max_order_value && parseFloat(formData.max_order_value) < 0) {
                newErrors.max_order_value = 'Số lượt sử dụng không hợp lệ';
            }
        }

        // Product discount specific validations
        // if (isProductDiscount) {
        //     if (!formData.product_name || !formData.product_name.trim()) {
        //         newErrors.product_name = 'Vui lòng nhập tên sản phẩm';
        //     }
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Vui lòng kiểm tra lại thông tin!');
            return;
        }

        try {
            setSaving(true);

            // Prepare data based on discount type
            const submitData = {
                discount_name: formData.discount_name.trim(),
                description: formData.description.trim(),
                discount_type: formData.discount_type,
                discount_value: parseFloat(formData.discount_value),
                start_date: formData.start_date,
                is_active: formData.is_active
            };

            if (formData.discount_type === 0) {
                // Order discount fields
                submitData.code = formData.code.trim().toUpperCase();
                submitData.min_order_value = formData.min_order_value ? parseFloat(formData.min_order_value) : 0;
                submitData.max_order_value = formData.max_order_value ? parseFloat(formData.max_order_value) : 0;
                submitData.used_quantity = formData.used_quantity ? parseFloat(formData.used_quantity) : 0;
                submitData.end_date = formData.end_date || null;
            }
            // else {
            //     submitData.product_name = formData.product_name.trim();

            // }

            const response = await fetch(`http://localhost:3000/api/voucher/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cập nhật voucher thành công!');
                router.push(`/admin/voucher/${id}`);
            } else {
                alert(data.message || 'Có lỗi xảy ra khi cập nhật voucher');
            }

            setSaving(false);
        } catch (error) {
            console.error('Error updating voucher:', error);
            alert('Không thể cập nhật voucher');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    const isOrderDiscount = formData.discount_type === 0;
    const isProductDiscount = formData.discount_type === 1;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.push(`/admin/voucher/${id}`)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Chỉnh sửa Voucher
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Cập nhật thông tin voucher #{id}
                            </p>
                        </div>

                        {/* Voucher Type Badge */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                            {isOrderDiscount ? (
                                <>
                                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium text-blue-900">Giảm giá đơn hàng</span>
                                </>
                            ) : (
                                <>
                                    <Package className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-green-900">Giảm giá sản phẩm</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-blue-600" />
                            Thông tin cơ bản
                        </h2>

                        <div className="space-y-4">
                            {/* Voucher Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên voucher <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="discount_name"
                                    value={formData.discount_name}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.discount_name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="VD: Flash Sale Cuối Tuần"
                                />
                                {errors.discount_name && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.discount_name}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mô tả
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Mô tả chi tiết về voucher..."
                                />
                            </div>

                            {/* Voucher Code - Only for Order Discount */}
                            {isOrderDiscount && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mã voucher <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase ${errors.code ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="VD: WEEKEND20"
                                    />
                                    {errors.code && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.code}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Product Name - Only for Product Discount */}
                            {/* {isProductDiscount && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Box className="w-4 h-4" />
                                        Tên sản phẩm áp dụng <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.product_name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="VD: Áo Thun Cotton Premium"
                                    />
                                    {errors.product_name && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.product_name}
                                        </p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-500">
                                        Voucher sẽ tự động áp dụng giảm giá cho sản phẩm này
                                    </p>
                                </div>
                            )} */}
                        </div>
                    </div>

                    {/* Discount Settings Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Percent className="w-5 h-5 text-orange-600" />
                            Thiết lập giảm giá
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Discount Value */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giá trị giảm (%) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="discount_value"
                                        value={formData.discount_value}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.discount_value ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="VD: 20"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                                {errors.discount_value && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.discount_value}
                                    </p>
                                )}
                            </div>

                            {/* Order Discount Specific Fields */}
                            {isOrderDiscount && (
                                <>
                                    {/* Min Order Value */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Đơn hàng tối thiểu (đ)
                                        </label>
                                        <input
                                            type="number"
                                            name="min_order_value"
                                            value={formData.min_order_value}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="1000"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.min_order_value ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="0"
                                        />
                                        {errors.min_order_value && (
                                            <p className="mt-1 text-sm text-red-500">{errors.min_order_value}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Để trống hoặc 0 nếu không yêu cầu</p>
                                    </div>

                                    {/* Max Discount Amount */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Giảm tối đa (đ)
                                        </label>
                                        <input
                                            type="number"
                                            name="max_order_value"
                                            value={formData.max_order_value}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="1000"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.max_discount_amount ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="0"
                                        />
                                        {errors.max_order_value && (
                                            <p className="mt-1 text-sm text-red-500">{errors.max_order_value}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Để trống hoặc 0 nếu không giới hạn</p>
                                    </div>

                                    {/* Max Usage */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Số lượt sử dụng tối đa
                                        </label>
                                        <input
                                            type="number"
                                            name="used_quantity"
                                            value={formData.used_quantity}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="1"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.max_order_value ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="0"
                                        />
                                        {errors.used_quantity && (
                                            <p className="mt-1 text-sm text-red-500">{errors.used_quantity}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Để trống hoặc 0 nếu không giới hạn</p>
                                    </div>
                                </>
                            )}

                            {/* Product Discount Info */}
                            {isProductDiscount && (
                                <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm text-green-800">
                                        <strong>Lưu ý:</strong> Voucher giảm giá sản phẩm chỉ cần thiết lập % giảm giá.
                                        Giảm giá sẽ tự động áp dụng cho sản phẩm đã chọn.
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày bắt đầu <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.start_date ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>

                            {/* End Date - Only for Order Discount */}
                            {isOrderDiscount && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày kết thúc
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="end_date"
                                        value={formData.end_date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Để trống nếu không có ngày kết thúc</p>
                                </div>
                            )}

                            {/* Product Discount Note */}
                            {isProductDiscount && (
                                <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Lưu ý:</strong> Voucher giảm giá sản phẩm không có ngày kết thúc.
                                        Chỉ cần bật/tắt trạng thái để kiểm soát.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Trạng thái
                        </h2>

                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <span className="text-sm font-medium text-gray-700">
                                {formData.is_active ? 'Đang kích hoạt' : 'Đã tắt'}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow-md p-6">
                        <button
                            type="button"
                            onClick={() => router.push(`/voucher/view/${id}`)}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVoucher;