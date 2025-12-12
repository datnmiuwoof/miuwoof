"use client"

import React, { useState } from 'react';

export default function changePassword() {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.currentPassword) {
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        }

        if (!form.newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (form.newPassword.length < 6) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (form.newPassword !== form.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (form.currentPassword && form.newPassword && form.currentPassword === form.newPassword) {
            newErrors.newPassword = 'Mật khẩu mới phải khác mật khẩu hiện tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);

            const result = await fetch("http://localhost:3000/user/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const res = await result.json();

            if (result.ok) {
                setLoading(false);
                setShowSuccess(true);
                setForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                alert(res.message);
            }

        }
    };

    return (
        <div className="py-5 container mx-auto">
            <div className="w-full flex justify-center">
                <div className="max-w-[620px] w-full px-4">

                    <h2 className="font-semibold text-2xl text-center mb-2 text-gray-800">
                        Đổi mật khẩu
                    </h2>
                    <div className="h-1 w-12 bg-black mx-auto mb-4"></div>

                    {showSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            Đổi mật khẩu thành công!
                        </div>
                    )}

                    <div className="flex flex-col mt-5 p-6 mx-auto">

                        {/* Mật khẩu hiện tại */}
                        <div className="mb-5">
                            <input
                                type="password"
                                name="currentPassword"
                                value={form.currentPassword}
                                onChange={handleChange}
                                placeholder="Mật khẩu hiện tại"
                                className="p-6 w-full bg-gray-200 text-gray-600 focus:border-gray-200 focus:outline focus:outline-gray-200 focus:bg-white"
                            />
                            {errors.currentPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                            )}
                        </div>

                        {/* Mật khẩu mới */}
                        <div className="mb-5">
                            <input
                                type="password"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="Mật khẩu mới"
                                className="p-6 w-full bg-gray-200 text-gray-600 focus:border-gray-200 focus:outline focus:outline-gray-200 focus:bg-white"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                            )}
                        </div>

                        {/* Xác nhận mật khẩu mới */}
                        <div className="mb-5">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Xác nhận mật khẩu mới"
                                className="p-6 w-full bg-gray-200 text-gray-600 focus:outline-gray-200 focus:bg-white"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="p-6 mt-4 mb-4 text-white font-semibold"
                            style={{ backgroundColor: '#795548' }}
                        >
                            {loading ? 'ĐANG XỬ LÝ...' : 'ĐỔI MẬT KHẨU'}
                        </button>

                        <p className="text-sm text-gray-600">
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a href="#" className="text-blue-600 underline">Privacy Policy</a> and{" "}
                            <a href="#" className="text-blue-600 underline">Terms of Service</a> apply.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}