'use client';

import { useState, useEffect } from "react";

export default function RegisterForm() {
    const [errors, setErrors] = useState<any>({});
    const [otp, setOtp] = useState("");
    const [timeDown, setTimeDown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleOtpChange = (e: any) => setOtp(e.target.value);

    const handleSendOtp = async () => {
        if (timeDown > 0) return;
        if (!form.name || !form.email || !form.password) {
            alert("nhập đầy đủ thông tin trước khi gửi otp")
            return;
        }

        setTimeDown(60);
        try {
            const res = await fetch('http://localhost:3000/user/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                alert("gửi OTP thất bại");
                setTimeDown(0);
            }
        } catch (error) {
            console.log(error)
            alert("lỗi gửi otp");
        }
    }

    useEffect(() => {
        if (timeDown <= 0) return;
        const timer = setInterval(() => setTimeDown((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeDown]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();
        const otp = formData.get("otp")?.toString().trim();

        const newErrors: any = {};
        if (!name) newErrors.name = "Tên không được để trống";
        if (!email) newErrors.email = "Email không được để trống";
        else if (!email.includes("@")) newErrors.email = "Email không hợp lệ";
        if (!password) newErrors.password = "Mật khẩu không được để trống";
        if (!otp) newErrors.otp = "OTP không được để trống";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const res = await fetch('http://localhost:3000/user/register/verify-otp', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, otp }),
                });

                const data = await res.json();
                if (res.ok) {
                    alert("Đăng ký thành công");
                    setForm({
                        name: "",
                        email: "",
                        password: "",
                    })
                    setOtp("");
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


    return (
        <div className="py-5 container main-content">
            <div className="w-full flex justify-center">
                <div className="max-w-[620px]">

                    <h2 className="!font-semibold !text-[24px] text-center mb-2 text-gray-800">
                        Tạo tài khoản
                    </h2>
                    <div className="h-1 w-12 bg-black mx-auto mb-4"></div>

                    <form onSubmit={handleSubmit} className="flex flex-col mt-5 p-6 mx-auto">

                        {/* Tên */}
                        <div className="mb-5">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Tên"
                                className="p-6 w-full bg-[#ededed] text-[#5c5c5c] focus:border-[#ededed] focus:outline focus:outline-[#ededed] focus:bg-white"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-5">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="p-6 w-full bg-[#ededed] text-[#5c5c5c] focus:border-[#ededed] focus:outline focus:outline-[#ededed] focus:bg-white"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Mật khẩu */}
                        <div className="mb-5">
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Mật khẩu"
                                className="p-6 w-full bg-[#ededed] text-[#5c5c5c] focus:outline-[#ededed] focus:bg-white"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* OTP */}
                        <div className="mb-5">
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    name="otp"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    placeholder="Nhập OTP"
                                    className="flex-1 p-4 bg-[#ededed] text-[#5c5c5c] focus:border-[#ededed] focus:outline focus:outline-[#ededed] focus:bg-white"
                                />
                                <button
                                    type="button"
                                    disabled={loading || timeDown > 0}
                                    onClick={handleSendOtp}
                                    className="w-40 bg-[#5c5c5c] text-white font-semibold p-4 flex items-center justify-center"
                                >
                                    {timeDown > 0 ? `${timeDown}s` : loading ? "Đang gửi..." : "Gửi OTP"}
                                </button>
                            </div>
                            {errors.otp && (
                                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                            )}
                        </div>


                        <button
                            type="submit"
                            className="p-6 mt-4 mb-4  text-white"
                            style={{ backgroundColor: '#795548' }}
                        >
                            ĐĂNG KÝ
                        </button>

                        <p className="">
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a href="#" className="text-blue-600 underline">Privacy Policy</a> and{" "}
                            <a href="#" className="text-blue-600 underline">Terms of Service</a> apply.
                        </p>
                    </form>
                </div>
            </div >
        </div >
    );
}
