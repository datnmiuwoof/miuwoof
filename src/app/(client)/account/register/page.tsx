'use client';

import { useState } from "react";

export default function RegisterForm() {
    const [errors, setErrors] = useState<any>({});
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        const newErrors: any = {};

        // Validate
        if (!name) newErrors.name = "Tên không được để trống";
        if (!password) newErrors.password = 'mật khẩu không được để trống';
        if (!email) newErrors.email = "Email không được để trống";
        else if (!email.includes("@")) newErrors.email = "Email không hợp lệ";

        setErrors(newErrors);

        // Nếu không có lỗi
        if (Object.keys(newErrors).length === 0) {
            try {
                const res = await fetch('http://localhost:3000/user/register', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    }),
                });

                if (res.ok) {
                    alert("đăng nhập thành công")
                    setForm({
                        name: "",
                        email: "",
                        password: "",
                    })
                }
            } catch (error) {
                console.log(error)
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
            </div>
        </div>
    );
}
