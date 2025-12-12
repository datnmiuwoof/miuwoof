"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {

    const router = useRouter();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [timeDown, setTimeDown] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (timeDown <= 0) return;
        const timer = setInterval(() => setTimeDown(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeDown]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        // if (errors[name]) {
        //     setErrors(prev => ({
        //         ...prev,
        //         [name]: ''
        //     }));
        // }
    };

    // const validateEmail = () => {
    //     const newErrors = {};

    //     if (!form.email) {
    //         newErrors.email = 'Vui lòng nhập email';
    //     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    //         newErrors.email = 'Email không hợp lệ';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    // const validateReset = () => {
    //     const newErrors = {};

    //     if (!form.otp) {
    //         newErrors.otp = 'Vui lòng nhập mã OTP';
    //     } else if (form.otp.length !== 6) {
    //         newErrors.otp = 'Mã OTP phải có 6 chữ số';
    //     }

    //     if (!form.newPassword) {
    //         newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    //     } else if (form.newPassword.length < 6) {
    //         newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    //     }

    //     if (!form.confirmPassword) {
    //         newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
    //     } else if (form.newPassword !== form.confirmPassword) {
    //         newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleSendOtp = async () => {
        if (timeDown > 0) return;
        if (!form.email) {
            alert("nhập đầy đủ thông tin trước khi gửi otp")
            return;
        }
        setLoading(true);
        setTimeDown(60);
        try {
            const res = await fetch('http://localhost:3000/user/forgot-password', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email })
            });



            if (!res.ok) {
                alert("gửi OTP thất bại");
                setTimeDown(0);
            } else (
                setStep(2),
                setLoading(false)
            )
        } catch (error) {
            console.log(error)
            alert("lỗi gửi otp");
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newPassword = formData.get("newPassword")?.toString().trim();
        const confirmPassword = formData.get("confirmPassword")?.toString().trim();
        const otp = formData.get("otp")?.toString().trim();
        const email = form.email;

        const newErrors: any = {};

        if (!newPassword) newErrors.newPassword = "password không được để trống";
        else if (newPassword.length < 5) newErrors.newPassword = "password phải trên 5 ký tự";

        if (!confirmPassword) newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
        else if (confirmPassword !== newPassword) newErrors.confirmPassword = "pass không trùng khớp";

        if (!otp) newErrors.otp = "OTP không được để trống";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const payload = {
                    email,
                    newPassword,
                    confirmPassword,
                    otp
                };

                const res = await fetch('http://localhost:3000/user/reset/verify-otp', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (res.ok) {
                    alert("Đổi mật khẩu thành công");
                    setForm({
                        email: "",
                        newPassword: "",
                        confirmPassword: "",
                        otp: ""
                    });
                    router.push("/");
                    setTimeDown(0);
                } else {
                    alert("Lỗi: " + data.message);
                }

            } catch (error) {
                console.log(error);
                alert("Không thể kết nối tới server!");
            }
        }
    };


    // const handleSubmit = () => {
    //     if (validateReset()) {
    //         setLoading(true);
    //         setTimeout(() => {
    //             setLoading(false);
    //             setShowSuccess(true);

    //             // Reset form sau 2 giây và quay về bước 1
    //             setTimeout(() => {
    //                 setShowSuccess(false);
    //                 setStep(1);
    //                 setForm({
    //                     email: '',
    //                     otp: '',
    //                     newPassword: '',
    //                     confirmPassword: ''
    //                 });
    //             }, 2000);
    //         }, 1500);
    //     }
    // };

    return (
        <div className="py-5 container mx-auto">
            <div className="w-full flex justify-center">
                <div className="max-w-[620px] w-full px-4">

                    <h2 className="font-semibold text-2xl text-center mb-2 text-gray-800">
                        Quên mật khẩu
                    </h2>
                    <div className="h-1 w-12 bg-black mx-auto mb-4"></div>

                    {/* {showSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.
                        </div>
                    )} */}

                    <div className="flex flex-col mt-5 p-6 mx-auto">

                        {step === 1 ? (
                            <>
                                {/* Bước 1: Nhập Email */}
                                <p className="text-gray-600 mb-6 text-center">
                                    Nhập email của bạn để nhận mã OTP đặt lại mật khẩu
                                </p>

                                <div className="mb-5">
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="p-6 w-full bg-gray-200 text-gray-600 focus:border-gray-200 focus:outline focus:outline-gray-200 focus:bg-white"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="p-6 mt-4 mb-4 text-white font-semibold"
                                    style={{ backgroundColor: '#795548' }}
                                >
                                    {loading ? 'ĐANG GỬI...' : 'GỬI MÃ OTP'}
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col">

                                <p className="text-gray-600 mb-6 text-center">
                                    Mã OTP đã được gửi đến email: <strong>{form.email}</strong>
                                </p>
                                {/* Email */}
                                <div className="mb-5">
                                    <input
                                        type="email"
                                        name="email"
                                        disabled
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="p-6 w-full bg-gray-200 text-gray-600 focus:border-gray-200 focus:outline focus:outline-gray-200 focus:bg-white"
                                    />
                                </div>


                                <div className="mb-5">
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            name="otp"
                                            value={form.otp}
                                            onChange={handleChange}
                                            placeholder="Nhập mã OTP"
                                            maxLength={6}
                                            className="flex-1 p-4 bg-gray-200 text-gray-600 
                    focus:border-gray-200 focus:outline focus:outline-gray-200 focus:bg-white"
                                        />

                                        <button
                                            type="button"
                                            disabled={loading || timeDown > 0}
                                            onClick={handleSendOtp}
                                            className="w-40 bg-gray-600 text-white font-semibold p-4 flex items-center justify-center disabled:opacity-50"
                                        >
                                            {timeDown > 0 ? `${timeDown}s` : loading ? "Đang gửi..." : "Gửi lại"}
                                        </button>
                                    </div>

                                    {errors.otp && (
                                        <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
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
                                        className="p-6 w-full bg-gray-200 text-gray-600 
                focus:border-gray-200 focus:outline focus:outline-gray-200 focus:bg-white"
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
                                        className="p-6 w-full bg-gray-200 text-gray-600 
                focus:outline-gray-200 focus:bg-white"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="p-6 mt-4 mb-4 text-white font-semibold"
                                    style={{ backgroundColor: '#795548' }}
                                >
                                    {loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT LẠI MẬT KHẨU'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setForm(prev => ({
                                            ...prev,
                                            otp: "",
                                            newPassword: "",
                                            confirmPassword: ""
                                        }));
                                        setErrors({});
                                    }}
                                    className="text-center text-gray-600 underline"
                                >
                                    Quay lại nhập email khác
                                </button>

                            </form>
                        )}

                        <p className="text-sm text-gray-600 mt-6">
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